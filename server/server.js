import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory rate limiting map for basic spam protection
const ipRequests = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

const rateLimiter = (req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const userRecord = ipRequests.get(clientIp) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > userRecord.resetTime) {
    userRecord.count = 0;
    userRecord.resetTime = now + RATE_LIMIT_WINDOW_MS;
  }

  userRecord.count += 1;
  ipRequests.set(clientIp, userRecord);

  if (userRecord.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before sending another message.'
    });
  }

  next();
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Surya V M Portfolio API Gateway',
    timestamp: new Date().toISOString()
  });
});

// POST /api/contact
app.post('/api/contact', rateLimiter, (req, res) => {
  const { name, email, message, honeypot } = req.body;

  // 1. Honeypot check (anti-spam bot trap)
  if (honeypot && honeypot.trim() !== '') {
    // Silently accept without logging or processing
    return res.status(200).json({
      success: true,
      message: 'Message received successfully.'
    });
  }

  // 2. Validate Name
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid name (at least 2 characters).'
    });
  }

  // 3. Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.'
    });
  }

  // 4. Validate Message
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Please write a message with at least 10 characters.'
    });
  }

  // In production, forward to SMTP / Resend / Webhook or Database
  console.log('--- NEW CONTACT INQUIRY RECEIVED ---');
  console.log(`From: ${name.trim()} <${email.trim()}>`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Message: ${message.trim()}`);
  console.log('------------------------------------');

  return res.status(200).json({
    success: true,
    message: 'Message received successfully! Surya will get back to you shortly.',
    data: {
      receivedAt: new Date().toISOString(),
      name: name.trim()
    }
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio Express API running on http://localhost:${PORT}`);
});
