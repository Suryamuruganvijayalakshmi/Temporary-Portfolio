/**
 * Cloudflare Worker with Static Assets
 * Handles /api/contact endpoint and proxies all other requests to static assets (dist/)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Handle CORS preflight
    if (request.method === 'OPTIONS' && url.pathname === '/api/contact') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Accept',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    // 2. Handle Contact Form Submission API
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        let body;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ success: false, error: 'Invalid JSON payload.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const { name, email, message, purpose, signature, honeypot } = body || {};

        // Bot honeypot trap
        if (honeypot && honeypot.trim() !== '') {
          return new Response(JSON.stringify({ success: true, message: 'Message acknowledged.' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Validation
        if (!name || typeof name !== 'string' || name.trim().length < 2) {
          return new Response(JSON.stringify({ success: false, error: 'Please enter a valid name (at least 2 characters).' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim())) {
          return new Response(JSON.stringify({ success: false, error: 'Please enter a valid email address.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        if (!message || typeof message !== 'string' || message.trim().length < 5) {
          return new Response(JSON.stringify({ success: false, error: 'Please write a message with at least 5 characters.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const ticketId = `SVM-${Math.floor(1000 + Math.random() * 9000)}`;

        // Optional Supabase logging if configured
        const supabaseUrl = env?.VITE_SUPABASE_URL || env?.SUPABASE_URL;
        const supabaseKey = env?.VITE_SUPABASE_ANON_KEY || env?.SUPABASE_ANON_KEY;
        if (supabaseUrl && supabaseKey) {
          try {
            await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
              method: 'POST',
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({
                name: name.trim(),
                email: email.trim(),
                purpose: purpose || 'General Inquiry',
                message: message.trim(),
                signature: signature || name.trim(),
                ticket_id: ticketId,
                created_at: new Date().toISOString()
              })
            });
          } catch (e) {
            console.warn('[Supabase Sync]:', e);
          }
        }

        return new Response(JSON.stringify({
          success: true,
          message: 'Inquiry received successfully! Surya will respond shortly.',
          ticketId
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message || 'Server error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 3. Fallback to Static Assets (HTML/CSS/JS/Images from dist/)
    const assetBinding = env.STATIC_ASSETS || env.ASSETS;
    if (assetBinding) {
      return assetBinding.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};
