import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { editableArticles, profileConfig } from '../data/portfolioData';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  Bookmark,
  Share2
} from 'lucide-react';

export default function WritingPage() {
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);
  const [readingArticle, setReadingArticle] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const readerScrollRef = useRef(null);

  const currentArticle = editableArticles[selectedArticleIndex] || editableArticles[0];

  const handleNext = () => {
    setSelectedArticleIndex((prev) => (prev + 1) % editableArticles.length);
  };

  const handlePrev = () => {
    setSelectedArticleIndex((prev) => (prev - 1 + editableArticles.length) % editableArticles.length);
  };

  // Keyboard controls for browsing articles & closing reader
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (readingArticle) {
        if (e.key === 'Escape') setReadingArticle(null);
        return;
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readingArticle]);

  // Track scroll progress inside the active reader modal
  const handleReaderScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100));
    setReadingProgress(progress);
  };

  return (
    <div className="relative w-full pt-24 sm:pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-iris-500" />
          <span>TACTILE NOTEBOOK // ESSAYS & BLUEPRINTS</span>
        </div>
        <h1 className="editorial-title text-4xl sm:text-5xl font-extrabold text-primary">
          Writing & Drafts
        </h1>
        <p className="text-base sm:text-lg text-secondary font-sans leading-relaxed">
          Technical essays, hardware engineering reflections, and architectural blueprints written from practical venture experience.
        </p>
      </div>

      {/* Centered Tactile Notebook with Halftone Ring */}
      <div className="relative flex flex-col items-center justify-center pt-8 pb-12 overflow-visible">
        {/* Dotted Halftone Ring around the Notebook */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] pointer-events-none opacity-40 dark:opacity-20 select-none">
          <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_120s_linear_infinite]">
            <circle cx="200" cy="200" r="185" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" className="text-stone-400 dark:text-stone-600" />
            <circle cx="200" cy="200" r="170" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 6" className="text-stone-500 dark:text-stone-500" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" className="text-stone-400 dark:text-stone-700" />
            <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" className="text-stone-400 dark:text-stone-800" />
          </svg>
        </div>

        {/* Notebook Body with 3D Layering */}
        <div className="relative w-full max-w-2xl perspective-1000">
          {/* Stacked physical paper pages underneath */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-stone-200 dark:bg-stone-800 border border-strong/40 shadow-lg" />
          <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-stone-100 dark:bg-stone-850 border border-strong/30" />
          <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-strong/20" />

          {/* Top Notebook Cover with Paper Notch & Drag / Swipe gestures */}
          <motion.div
            key={currentArticle.id}
            initial={{ opacity: 0, rotateY: -8, scale: 0.98 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) handleNext();
              else if (info.offset.x > 60) handlePrev();
            }}
            onClick={() => setReadingArticle(currentArticle)}
            className="relative bg-card rounded-2xl border-2 border-strong p-8 sm:p-12 shadow-2xl cursor-pointer group hover:border-iris-500/40 transition-all select-none overflow-hidden"
          >
            {/* Subtle Paper Notch / Tab along right edge */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-14 bg-surface border-l-2 border-y-2 border-strong/40 rounded-l-md flex items-center justify-center shadow-inner">
              <div className="w-0.5 h-6 bg-muted/40 rounded-full" />
            </div>

            {/* Notebook Spine Accent on left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-stone-400/30 dark:from-stone-700/50 to-transparent border-r border-strong/20 rounded-l-2xl" />

            {/* Notch & Top Meta */}
            <div className="flex items-center justify-between border-b border-subtle pb-6 mb-8 font-mono text-xs text-muted pl-2">
              <div className="flex items-center gap-3">
                <span className="rubber-stamp font-bold">
                  WRITING::{currentArticle.number}
                </span>
                <span className="text-secondary font-medium">{currentArticle.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="technical-label">{currentArticle.status}</span>
                <span>{currentArticle.date}</span>
              </div>
            </div>

            {/* Giant Article Number & Title */}
            <div className="space-y-4 my-8 pl-2">
              <span className="font-mono text-6xl sm:text-7xl font-extrabold text-iris-500/20 group-hover:text-iris-500/30 transition-colors block tracking-tighter">
                {currentArticle.number}
              </span>
              <h2 className="editorial-title text-2xl sm:text-4xl font-bold text-primary group-hover:text-iris-400 transition-colors leading-tight">
                {currentArticle.title}
              </h2>
            </div>

            {/* Reader trigger footer */}
            <div className="pt-8 border-t border-subtle flex items-center justify-between font-mono text-xs text-secondary pl-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-muted" />
                <span>{currentArticle.readTime}</span>
                <span className="text-muted hidden sm:inline">• Click or swipe to open</span>
              </div>
              <div className="flex items-center gap-1.5 text-primary font-bold group-hover:translate-x-1 transition-transform">
                <span>Open Notebook</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stepper & Keyboard Guide Controls */}
        <div className="flex flex-col items-center gap-3 mt-8 font-mono text-xs">
          <div className="flex items-center gap-4 text-secondary">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-lg bg-surface hover:bg-card border border-subtle text-primary transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-iris-400 shadow-xs"
              aria-label="Previous article"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREV</span>
            </button>

            <span className="text-muted font-bold tracking-wider">
              {selectedArticleIndex + 1} OF {editableArticles.length} NOTEBOOKS
            </span>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-surface hover:bg-card border border-subtle text-primary transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-iris-400 shadow-xs"
              aria-label="Next article"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="text-[11px] text-muted">
            Tip: Use ← / → arrow keys or drag horizontally to flip notebooks
          </span>
        </div>
      </div>

      {/* Full Article Reader Slide-Over / Dialog with Reading Progress */}
      <AnimatePresence>
        {readingArticle && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={readingArticle.title}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingArticle(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Reader Modal Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              ref={readerScrollRef}
              onScroll={handleReaderScroll}
              className="relative w-full max-w-4xl max-h-[92vh] bg-card rounded-2xl border-2 border-strong shadow-2xl overflow-y-auto z-10 p-6 sm:p-12 font-sans"
            >
              {/* Reading Progress Bar pinned to top of dialog */}
              <div className="sticky top-0 -mt-6 -mx-6 sm:-mt-12 sm:-mx-12 h-1.5 bg-subtle z-20 overflow-hidden">
                <div 
                  className="h-full bg-iris-500 transition-all duration-150"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-surface hover:bg-surface/80 border border-subtle text-primary transition-colors focus-visible:ring-2 focus-visible:ring-iris-400"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Reader Header */}
              <div className="space-y-4 border-b border-subtle pb-8 mb-8 pt-2">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="rubber-stamp">WRITING::{readingArticle.number}</span>
                  <span className="technical-label">{readingArticle.category}</span>
                  <span className="text-muted">{readingArticle.date}</span>
                  <span className="text-muted">• {readingArticle.readTime}</span>
                </div>
                <h2 className="editorial-title text-2xl sm:text-4xl font-extrabold text-primary">
                  {readingArticle.title}
                </h2>
                <div className="text-xs font-mono text-muted flex items-center gap-2">
                  <span>AUTHOR: {readingArticle.credits?.author || profileConfig.name}</span>
                  <span>•</span>
                  <span>{readingArticle.credits?.publication || profileConfig.company}</span>
                </div>
              </div>

              {/* Layout with Sticky Table of Contents & Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Sticky TOC */}
                <div className="md:col-span-4 sticky top-6 bg-surface p-4 rounded-xl border border-subtle font-mono text-xs space-y-3">
                  <span className="font-bold text-primary block border-b border-subtle pb-2">
                    TABLE OF CONTENTS
                  </span>
                  <ul className="space-y-2 text-muted">
                    {readingArticle.toc?.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={() => setActiveSectionId(item.id)}
                          className={`hover:text-primary transition-colors block ${
                            activeSectionId === item.id ? 'text-iris-400 font-semibold' : ''
                          }`}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* External Links on side */}
                  {readingArticle.externalLinks && readingArticle.externalLinks.length > 0 && (
                    <div className="pt-3 border-t border-subtle space-y-2">
                      <span className="font-bold text-primary block text-[11px]">
                        REFERENCES & LINKS
                      </span>
                      {readingArticle.externalLinks.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-iris-400 hover:text-primary transition-colors text-[11px]"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="md:col-span-8 space-y-8 text-secondary font-sans leading-relaxed text-sm sm:text-base">
                  {readingArticle.content?.map((sec) => (
                    <div key={sec.sectionId} id={sec.sectionId} className="space-y-3 scroll-mt-12">
                      <h3 className="editorial-title text-xl font-bold text-primary border-b border-subtle/50 pb-2">
                        {sec.heading}
                      </h3>
                      {sec.paragraphs?.map((p, pIdx) => (
                        <p key={pIdx}>
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}

                  {/* Credits Section */}
                  <div className="p-4 rounded-xl bg-surface border border-subtle font-mono text-xs space-y-2 text-muted">
                    <span className="font-bold text-primary block">CREDITS & ATTRIBUTION</span>
                    <p className="font-sans text-xs text-secondary leading-relaxed">
                      Written by <strong className="text-primary">{readingArticle.credits?.author || profileConfig.name}</strong> ({readingArticle.credits?.role || profileConfig.title}). Published in {readingArticle.credits?.publication || 'SignBridge Technical Notes'}.
                    </p>
                  </div>

                  {/* Closing Signature */}
                  <div className="pt-8 border-t border-subtle font-mono text-xs text-muted flex items-center justify-between">
                    <div>
                      <span>END OF DRAFT // SIGNED</span>
                      <div className="text-primary font-bold mt-1 text-sm font-sans tracking-tight">
                        {profileConfig.name}
                      </div>
                      <span className="text-[10px] text-muted">Tamil Nadu, India</span>
                    </div>
                    <div className="text-right">
                      <span className="rubber-stamp">ARCHIVAL COPY</span>
                      <div className="text-[11px] text-muted mt-1">{profileConfig.portfolioUrl}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
