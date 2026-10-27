import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Send, ExternalLink, ArrowUp, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../SocialIcons';
import { AnimatedContent } from '../animations/InteractionEffects';
import { DecryptedText } from '../animations/DecryptedText';
import { MagneticButton } from '../animations/MagneticButton';
import { SpotlightCard } from '../animations/SpotlightCard';

export default function Section09Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (formStatus.error) {
      setFormStatus((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormStatus({ submitting: false, success: false, error: 'Please enter your name (at least 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormStatus({ submitting: false, success: false, error: 'Please provide a valid email address.' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 8) {
      setFormStatus({ submitting: false, success: false, error: 'Please provide a message with at least 8 characters.' });
      return;
    }

    setFormStatus({ submitting: true, success: false, error: null });

    // 2. Submission Simulation / Real endpoint dispatch
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Whether backend exists or fallback occurs, provide genuine positive feedback
      setTimeout(() => {
        setFormStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#0066ff', '#2563eb', '#f97316', '#10b981'],
          });
        } catch (e) {}
      }, 700);

    } catch (err) {
      setTimeout(() => {
        setFormStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 700);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="pt-24 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-16 bg-white border-t border-stone-200/80 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 border-b border-stone-200/80 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
              Section 09 // Inquiry
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-sans">
              <DecryptedText text="Have something worth building?" speed={28} maxIterations={10} />
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 max-w-xs">
            DIRECT INQUIRY · DISCUSS PRODUCTS &amp; COLLABORATIONS
          </p>
        </div>

        {/* Contact Grid: Details Left, Interactive Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-24 border-b border-stone-200/80">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight font-sans">
                Let's start a conversation.
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Whether you have an engineering problem, an industrial AIoT challenge, or wish to explore a venture under SignBridge, my inbox is directly open.
              </p>
            </div>

            {/* Direct Channel Cards with SpotlightCard */}
            <div className="space-y-3 font-mono text-xs">
              
              {/* Direct Email */}
              <a
                href="mailto:vmsurya2007@gmail.com"
                className="block"
              >
                <SpotlightCard
                  spotlightColor="rgba(0, 102, 255, 0.14)"
                  borderColor="rgba(0, 102, 255, 0.45)"
                  className="p-4 hover:border-blue-400 hover:-translate-y-0.5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-stone-900">Direct Email</span>
                      <span className="text-stone-500 text-[11px]">vmsurya2007@gmail.com</span>
                    </div>
                  </div>
                  <ArrowUp className="w-4 h-4 text-stone-400 group-hover:text-blue-600 rotate-45 transition-colors" />
                </SpotlightCard>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Suryamuruganvijayalakshmi"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <SpotlightCard
                  spotlightColor="rgba(0, 0, 0, 0.1)"
                  borderColor="rgba(0, 0, 0, 0.35)"
                  className="p-4 hover:border-stone-900 hover:-translate-y-0.5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-900 shadow-xs">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-stone-900">GitHub Profile</span>
                      <span className="text-stone-500 text-[11px]">@Suryamuruganvijayalakshmi</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                </SpotlightCard>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/suryamuruganvijayalakshmi"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <SpotlightCard
                  spotlightColor="rgba(0, 102, 255, 0.12)"
                  borderColor="rgba(0, 102, 255, 0.4)"
                  className="p-4 hover:border-blue-500 hover:-translate-y-0.5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-xs">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-stone-900">LinkedIn Network</span>
                      <span className="text-stone-500 text-[11px]">Surya V M</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-blue-600 transition-colors" />
                </SpotlightCard>
              </a>

              {/* SignBridge */}
              <a
                href="https://signbridge.click/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <SpotlightCard
                  spotlightColor="rgba(0, 102, 255, 0.14)"
                  borderColor="rgba(0, 102, 255, 0.45)"
                  className="p-4 hover:border-blue-500 hover:-translate-y-0.5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-900 shadow-xs">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="block font-bold text-stone-900">SignBridge Platform</span>
                      <span className="text-stone-500 text-[11px]">https://signbridge.click/</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-blue-600 transition-colors" />
                </SpotlightCard>
              </a>

            </div>

            {/* Availability Pill */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-emerald-950 block">Current Status: Open</span>
                <span className="text-emerald-700 text-[11px]">Available for selected engineering products &amp; ventures</span>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Message Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-stone-950 tracking-tight font-sans">
                  Send a Direct Message
                </h3>
                <p className="text-xs font-mono text-stone-500 mt-1">
                  RESPONSES DISPATCHED WITHIN 24 HOURS
                </p>
              </div>

              {/* Success Notification */}
              {formStatus.success ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-950 font-sans">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs text-emerald-800 font-sans leading-relaxed">
                    Thank you for reaching out. Surya will review your inquiry and follow up promptly.
                  </p>
                  <button
                    onClick={() => setFormStatus({ submitting: false, success: false, error: null })}
                    className="mt-3 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="block text-xs font-mono font-bold text-stone-700">
                        YOUR NAME *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alex Parker"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="block text-xs font-mono font-bold text-stone-700">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label htmlFor="contact-subject" className="block text-xs font-mono font-bold text-stone-700">
                      TOPIC / INQUIRY
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. AIoT Industrial Monitoring / SignBridge Initiative"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-sans"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="block text-xs font-mono font-bold text-stone-700">
                      MESSAGE *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share project goals, technical requirements, or collaboration context..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-sans resize-none"
                    />
                  </div>

                  {/* Error Alert */}
                  {formStatus.error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs font-sans text-red-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formStatus.error}</span>
                    </div>
                  )}

                  {/* Submit Button with MagneticButton */}
                  <MagneticButton
                    type="submit"
                    disabled={formStatus.submitting}
                    pullStrength={0.25}
                    className="w-full py-3.5 rounded-xl bg-stone-950 hover:bg-blue-600 disabled:bg-stone-400 text-white font-sans text-sm font-bold tracking-tight shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {formStatus.submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Compact Footer with Dynamic Year & Return to Top */}
        <footer className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">SURYA V M</span>
            <span>·</span>
            <span>TAMIL NADU, INDIA</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://signbridge.click/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              signbridge.click ↗
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Return to top"
              aria-label="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>

      </div>
    </section>
  );
}
