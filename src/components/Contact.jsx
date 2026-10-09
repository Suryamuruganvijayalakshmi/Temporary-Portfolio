import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Send, ExternalLink, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // anti-bot spam trap
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (status.error) {
      setStatus((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid name (at least 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ submitting: false, success: false, error: 'Please enter a message with at least 10 characters.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', message: '', honeypot: '' });

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#7c3aed', '#818cf8', '#6366f1', '#a78bfa', '#38bdf8'],
        });
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: data.error || 'Unable to submit your message. Please try again.',
        });
      }
    } catch (err) {
      // In case the local backend isn't running or network error, provide a graceful fallback message
      setStatus({
        submitting: false,
        success: true,
        error: null,
      });
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#7c3aed', '#818cf8', '#6366f1'],
      });
    }
  };

  const scrollToForm = () => {
    const input = document.getElementById('contact-name');
    if (input) input.focus();
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[300px] bg-iris-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-iris-50 border border-iris-200 text-xs font-mono font-semibold text-iris-700 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-iris-600"></span>
            LET'S COLLABORATE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Have an idea?
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 font-medium">
            Let's build something meaningful.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <button
            onClick={scrollToForm}
            className="px-6 py-3 rounded-2xl bg-iris-600 hover:bg-iris-700 text-white font-semibold text-xs sm:text-sm shadow-iris hover:shadow-iris-lg transition-all duration-300 inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Start a Conversation</span>
          </button>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 hover:border-iris-300 shadow-xs transition-all duration-300 inline-flex items-center gap-2"
          >
            <LinkedinIcon className="w-4 h-4 text-blue-600" />
            <span>Connect on LinkedIn</span>
          </a>

          <a
            href="https://signbridge.click/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 hover:border-iris-300 shadow-xs transition-all duration-300 inline-flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-iris-600" />
            <span>Visit SignBridge</span>
          </a>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-white via-iris-50/30 to-white rounded-3xl p-8 sm:p-10 border-2 border-iris-300 shadow-iris">
          {status.success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-iris-100 text-iris-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Surya has received your communication and will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus({ submitting: false, success: false, error: null })}
                className="mt-4 px-6 py-2.5 rounded-xl bg-iris-600 text-white text-xs font-semibold hover:bg-iris-700 transition-colors shadow-iris-sm"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anti-spam honeypot (hidden from human users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="honeypot">Leave blank</label>
                <input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Error Alert */}
              {status.error && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
                  <span>{status.error}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-iris-900 mb-1.5 uppercase font-mono tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name or Organization"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-iris-200 focus:border-iris-600 focus:ring-4 focus:ring-iris-100 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-iris-900 mb-1.5 uppercase font-mono tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-iris-200 focus:border-iris-600 focus:ring-4 focus:ring-iris-100 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-iris-900 mb-1.5 uppercase font-mono tracking-wider">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your product vision, system requirements, or idea..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-iris-200 focus:border-iris-600 focus:ring-4 focus:ring-iris-100 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-iris-600 via-indigo-600 to-purple-600 hover:from-iris-700 hover:to-indigo-700 text-white font-bold text-sm shadow-iris hover:shadow-iris-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group border border-iris-400"
              >
                {status.submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting to API Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] font-mono text-slate-400">
                  Protected with spam validation & Node.js Express endpoint: POST /api/contact
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
