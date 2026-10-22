// Cloudflare Pages Function: /api/contact
// Handles contact inquiries on Cloudflare Edge Runtime without requiring external Node server

export async function onRequestPost(context) {
  const { request } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const data = await request.json();
    const { name, email, message, honeypot } = data || {};

    // 1. Honeypot check (anti-bot trap)
    if (honeypot && honeypot.trim() !== '') {
      return new Response(
        JSON.stringify({ success: true, message: 'Message received successfully.' }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 2. Validate Name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid name (at least 2 characters).' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 3. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 4. Validate Message
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please write a message with at least 10 characters.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Log to Cloudflare Workers Logs
    console.log(`[Contact Inquiry] From: ${name.trim()} <${email.trim()}> at ${new Date().toISOString()}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message received successfully! Surya will respond to you promptly.',
        data: {
          receivedAt: new Date().toISOString(),
          name: name.trim()
        }
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid request payload.' }),
      { status: 400, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
