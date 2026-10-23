import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { profileConfig } from '../data/portfolioData';
import { submitContactToSupabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  Send, 
  Check, 
  AlertCircle, 
  Paperclip, 
  Mail, 
  MapPin, 
  Calendar, 
  ExternalLink,
  Loader2,
  CheckSquare,
  Square
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    purpose: 'New Business', // 'New Business' | 'Collaboration' | 'Just a hello'
    source: '',
    message: '',
    name: '',
    email: '',
    signature: '',
    honeypot: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    ticketNumber: 'SVM-TKT-08'
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (status.error) setStatus((prev) => ({ ...prev, error: null }));
  };

  const handlePurposeSelect = (purpose) => {
    setFormData((prev) => ({ ...prev, purpose }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation checks
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus((prev) => ({ ...prev, error: 'Please enter your name (at least 2 characters).' }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus((prev) => ({ ...prev, error: 'Please enter a valid email address.' }));
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus((prev) => ({ ...prev, error: 'Please enter a message of at least 10 characters.' }));
      return;
    }

    // 2. Honeypot check for automated bot spam
    if (formData.honeypot) {
      setStatus({ submitting: false, success: true, error: null, ticketNumber: 'TKT-BOT' });
      return;
    }

    setStatus((prev) => ({ ...prev, submitting: true, error: null }));

    // 3. Real submission integration (Supabase prioritized, with honest API fallback)
    try {
      if (isSupabaseConfigured) {
        const ticketId = `SVM-${Math.floor(1000 + Math.random() * 9000)}`;
        const supabaseRes = await submitContactToSupabase({
          name: formData.name,
          email: formData.email,
          purpose: formData.purpose,
          source: formData.source,
          message: formData.message,
          signature: formData.signature,
          ticketId
        });

        if (supabaseRes.success) {
          setStatus({
            submitting: false,
            success: true,
            error: null,
            ticketNumber: ticketId
          });
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch (e) {}
          return;
        } else {
          console.error('[Supabase Error]:', supabaseRes.error);
          setStatus({
            submitting: false,
            success: false,
            error: `Supabase: ${supabaseRes.error}. Please ensure the INSERT policy is enabled in your Supabase SQL Editor.`,
            ticketNumber: 'SVM-DB-ERR'
          });
          return;
        }
      }

      const formspreeId = import.meta.env?.VITE_FORMSPREE_ID;
      const apiUrl = formspreeId ? `https://formspree.io/f/${formspreeId}` : (import.meta.env?.VITE_CONTACT_API_URL || '/api/contact');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          purpose: formData.purpose,
          source: formData.source,
          message: formData.message,
          signature: formData.signature,
          date: new Date().toISOString()
        })
      });

      if (response.ok) {
        let ticketId = `SVM-${Math.floor(1000 + Math.random() * 9000)}`;
        try {
          const resData = await response.json();
          if (resData?.ticketId) ticketId = resData.ticketId;
        } catch (e) {}

        setStatus({
          submitting: false,
          success: true,
          error: null,
          ticketNumber: ticketId
        });
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (e) {}
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: `Endpoint returned status ${response.status}. You can also send directly via verified email below.`,
          ticketNumber: 'SVM-ERR'
        });
      }
    } catch (err) {
      // Honest offline/unconfigured error state
      setStatus({
        submitting: false,
        success: false,
        error: `Remote dispatch server is currently offline or unconfigured. Please send your letter directly via email link below.`,
        ticketNumber: 'SVM-OFFLINE'
      });
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="relative w-full pt-24 sm:pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-iris-500" />
          <span>CONTACT DISPATCH // POSTAL INQUIRY</span>
        </div>
        <h1 className="editorial-title text-4xl sm:text-5xl font-extrabold text-primary">
          Send a Letter
        </h1>
        <p className="text-base sm:text-lg text-secondary font-sans leading-relaxed">
          Tactile ruled letter interface with verified submission pipeline, ticket tracking stub, and honest delivery feedback.
        </p>
      </div>

      {/* Main Letter & Ticket Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Paper Letter Form with Warm Off-White Tone and Torn Paper Edge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-8 bg-[#faf8f5] dark:bg-card text-stone-900 dark:text-stone-100 rounded-2xl border-2 border-strong p-8 sm:p-12 shadow-2xl relative space-y-8 overflow-hidden"
        >
          {/* Animated Torn-Paper Top Edge */}
          <div className="absolute -top-1 left-0 right-0 h-4 overflow-hidden pointer-events-none">
            <svg 
              viewBox="0 0 1200 24" 
              preserveAspectRatio="none" 
              className="w-full h-full text-stone-200 dark:text-stone-800 fill-current opacity-80"
            >
              <path d="M0,0 L30,12 L60,2 L90,14 L120,4 L150,16 L180,3 L210,13 L240,5 L270,18 L300,2 L330,15 L360,6 L390,14 L420,3 L450,17 L480,4 L510,15 L540,5 L570,18 L600,4 L630,16 L660,3 L690,14 L720,5 L750,17 L780,2 L810,15 L840,4 L870,16 L900,3 L930,14 L960,6 L990,18 L1020,4 L1050,15 L1080,2 L1110,16 L1140,5 L1170,14 L1200,0 L1200,24 L0,24 Z" />
            </svg>
          </div>

          {/* Letter Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-300 dark:border-subtle pb-6 font-mono text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-stone-900 text-white dark:bg-iris-600 flex items-center justify-center font-bold text-xs shadow-xs">
                  S
                </div>
                <div>
                  <span className="font-bold text-base text-stone-900 dark:text-primary tracking-tight">
                    {profileConfig.name}
                  </span>
                  <div className="text-[11px] text-stone-600 dark:text-secondary">{profileConfig.title}</div>
                </div>
              </div>
              <div className="text-[11px] text-stone-500 dark:text-muted pt-1 flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                <span>{profileConfig.email}</span>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1 text-stone-600 dark:text-muted">
              <div className="flex items-center gap-1 sm:justify-end">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{profileConfig.location}</span>
              </div>
              <div className="flex items-center gap-1 sm:justify-end">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>DATE: {currentDate}</span>
              </div>
              <span className="rubber-stamp mt-1 inline-block">AIRMAIL DISPATCH</span>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field for bot protection */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Greeting & Checkboxes */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-stone-900 dark:text-primary font-bold block text-sm">
                DEAR SURYA,
              </span>
              
              <div className="flex flex-wrap gap-3 pt-1">
                {['New Business', 'Collaboration', 'Just a hello'].map((item) => {
                  const isChecked = formData.purpose === item;
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handlePurposeSelect(item)}
                      className={`px-3.5 py-1.5 rounded-full border transition-all text-xs font-mono select-none flex items-center gap-2 ${
                        isChecked
                          ? 'bg-stone-900 text-white dark:bg-primary dark:text-canvas font-bold border-stone-900 dark:border-transparent shadow-xs'
                          : 'bg-white/80 dark:bg-surface text-stone-700 dark:text-secondary border-stone-300 dark:border-subtle hover:border-stone-500'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-3.5 h-3.5 text-iris-400" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-stone-400" />
                      )}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Source Field */}
            <div className="space-y-1 font-mono text-xs">
              <label htmlFor="source" className="text-stone-600 dark:text-muted block">
                FROM :: yourwebsite.com or organization
              </label>
              <input
                id="source"
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="e.g. acme-robotics.io or Stanford University"
                className="w-full p-2.5 rounded-lg bg-white dark:bg-surface border border-stone-300 dark:border-subtle text-stone-900 dark:text-primary placeholder:text-stone-400 dark:placeholder:text-muted/60 font-mono text-xs focus:outline-none focus:border-stone-800 dark:focus:border-iris-400"
              />
            </div>

            {/* Ruled Message Textarea */}
            <div className="space-y-1 font-mono text-xs">
              <label htmlFor="message" className="text-stone-900 dark:text-primary font-bold block">
                WHAT ARE WE MAKING? (MESSAGE) *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your initiative, prototype requirements, or inquiry..."
                style={{
                  lineHeight: '28px',
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(180, 180, 180, 0.25) 28px)'
                }}
                className="w-full p-3.5 rounded-lg bg-white dark:bg-surface border border-stone-300 dark:border-subtle text-stone-900 dark:text-primary placeholder:text-stone-400 dark:placeholder:text-muted/60 font-sans text-sm focus:outline-none focus:border-stone-800 dark:focus:border-iris-400"
              />
            </div>

            {/* Your Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1">
                <label htmlFor="name" className="text-stone-600 dark:text-muted block">
                  YOUR NAME *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Eleanor Vance"
                  className="w-full p-2.5 rounded-lg bg-white dark:bg-surface border border-stone-300 dark:border-subtle text-stone-900 dark:text-primary placeholder:text-stone-400 dark:placeholder:text-muted/60 font-mono text-xs focus:outline-none focus:border-stone-800 dark:focus:border-iris-400"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-stone-600 dark:text-muted block">
                  YOUR EMAIL *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. eleanor@vance.io"
                  className="w-full p-2.5 rounded-lg bg-white dark:bg-surface border border-stone-300 dark:border-subtle text-stone-900 dark:text-primary placeholder:text-stone-400 dark:placeholder:text-muted/60 font-mono text-xs focus:outline-none focus:border-stone-800 dark:focus:border-iris-400"
                />
              </div>
            </div>

            {/* Signature-style Closing */}
            <div className="space-y-1 font-mono text-xs">
              <label htmlFor="signature" className="text-stone-600 dark:text-muted block">
                SIGNATURE-STYLE CLOSING (OPTIONAL)
              </label>
              <input
                id="signature"
                type="text"
                name="signature"
                value={formData.signature}
                onChange={handleChange}
                placeholder="Digital initials / stamp"
                className="w-full p-2.5 rounded-lg bg-white dark:bg-surface border border-stone-300 dark:border-subtle text-stone-900 dark:text-primary placeholder:text-stone-400 dark:placeholder:text-muted/60 font-mono text-xs italic focus:outline-none"
              />
            </div>

            {/* Error Message */}
            {status.error && (
              <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span>{status.error}</span>
                  <div>
                    <a
                      href={`mailto:${profileConfig.email}?subject=${encodeURIComponent(`[Portfolio] ${formData.purpose}`)}&body=${encodeURIComponent(formData.message)}`}
                      className="underline font-bold hover:opacity-80"
                    >
                      Click here to send letter directly via email ↗
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {status.success && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <div>
                    <span className="font-bold text-sm block">LETTER DISPATCHED</span>
                    <span className="text-[11px] text-muted">Ticket {status.ticketNumber} logged into queue.</span>
                  </div>
                </div>
                <span className="rubber-stamp border-emerald-500 text-emerald-500 bg-emerald-500/10">
                  CONFIRMED
                </span>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-4 border-t border-stone-300 dark:border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status.submitting}
                className="px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-primary dark:text-canvas font-mono text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md disabled:opacity-50 select-none cursor-pointer"
              >
                {status.submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Dispatch...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send It</span>
                  </>
                )}
              </button>

              <span className="font-mono text-[10px] text-stone-500 dark:text-muted tracking-wider">
                ONE REPLY, NO NEWSLETTER · {formData.signature ? 'SIGNED' : 'NOT YET SIGNED'}
              </span>
            </div>
          </form>
        </motion.div>

        {/* Paper-Clipped PRESS Ticket Stub with Barcode */}
        <div className="lg:col-span-4 space-y-6">
          <div className="ticket-stub p-6 shadow-xl space-y-4 font-mono text-xs relative">
            {/* Paperclip Protruding Graphic */}
            <div className="absolute -top-3 left-6">
              <Paperclip className="w-6 h-6 text-stone-500 dark:text-iris-400 rotate-45 drop-shadow-md" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-subtle pb-3 pt-1">
              <div className="flex items-center gap-2 pl-4">
                <span className="font-bold text-primary">PRESS TICKET STUB</span>
              </div>
              <span className="text-[10px] text-muted">SVM-POST-2026</span>
            </div>

            {/* Required Fields: Job, Received, Reply By, Status, File Under */}
            <div className="space-y-2.5 text-secondary">
              <div className="flex justify-between">
                <span className="text-muted">JOB:</span>
                <span className="text-primary font-medium">{formData.purpose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">RECEIVED:</span>
                <span className="text-primary font-medium">{currentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">REPLY BY:</span>
                <span className="text-primary font-medium">Within 24–48 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">STATUS:</span>
                <span className={`font-semibold ${status.success ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {status.success ? 'DISPATCHED' : 'AWAITING DISPATCH'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">FILE UNDER:</span>
                <span className="text-primary font-medium">SVM_COMMUNICATIONS</span>
              </div>
            </div>

            {/* Perforated Divider */}
            <div className="ticket-perforation my-4" />

            {/* Barcode & Ticket Identifier */}
            <div className="space-y-2 text-center">
              <div className="font-mono text-lg font-bold tracking-widest text-primary select-none">
                ||| | |||| | ||||| || |
              </div>
              <span className="text-[10px] text-muted block">
                TICKET NO: {status.ticketNumber}
              </span>
            </div>
          </div>

          {/* Direct Verification Callout */}
          <div className="p-5 rounded-2xl bg-surface border border-subtle font-mono text-xs space-y-2 text-secondary">
            <span className="text-primary font-bold block">Direct Verification</span>
            <p className="font-sans text-xs text-muted leading-relaxed">
              If remote servers are unreachable, you can always reach Surya V M directly via verified email:
            </p>
            <a
              href={`mailto:${profileConfig.email}`}
              className="text-iris-400 hover:text-primary transition-colors flex items-center gap-1 font-mono pt-1"
            >
              <span>{profileConfig.email}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
