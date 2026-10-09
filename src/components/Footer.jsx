import React from 'react';
import { ExternalLink, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 py-16 text-slate-700 font-sans relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-100">
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                SURYA V M
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Software Developer • AI/IoT Builder • Founder
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram</span>
            </a>

            <a
              href="https://signbridge.click/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors flex items-center gap-1"
            >
              <span>SignBridge</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors ml-auto sm:ml-2"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits with animated dot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-4">
          <div className="flex items-center gap-2">
            <span>Designed & built by Surya V M</span>
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block animate-pulse" />
          </div>

          <div>
            © 2026 Surya V M • All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
