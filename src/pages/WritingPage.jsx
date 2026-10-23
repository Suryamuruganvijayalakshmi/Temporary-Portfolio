import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { editableArticles, profileConfig } from '../data/portfolioData';
import FolderFloat from '../components/FolderFloat';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  Bookmark,
  Share2,
  FileText,
  Sparkles
} from 'lucide-react';

export default function WritingPage() {
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);
  const [readingArticle, setReadingArticle] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const readerScrollRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentArticle = editableArticles[selectedArticleIndex] || editableArticles[0];

  // Items for FolderFloat - Paper notes and chapters that float out of the folder
  const folderItems = [
    { label: '01. Practical AIoT & Edge Baselines', value: 'practical-aiot-edge-baselines' },
    { label: '02. Predictive Agri-Procurement', value: 'predictive-agri-procurement' },
    { label: '03. The Founder-Engineer Playbook', value: 'founder-engineer-playbook' },
    { label: 'SCT-013 Split-Core Sensing Notes', value: 'practical-aiot-edge-baselines' },
    { label: 'Harvest Window Lookahead Matrix', value: 'predictive-agri-procurement' },
    { label: 'TinyML Anomaly Autoencoders', value: 'practical-aiot-edge-baselines' }
  ];

  const handleSelectNote = (value, index) => {
    const matched = editableArticles.find(a => a.id === value) || editableArticles[index % editableArticles.length];
    if (matched) {
      const idx = editableArticles.findIndex(a => a.id === matched.id);
      if (idx !== -1) setSelectedArticleIndex(idx);
      setReadingArticle(matched);
    }
  };

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
      <div className="space-y-3 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-iris-500" />
          <span>ARCHIVAL FOLDER // ESSAYS &amp; TECHNICAL BLUEPRINTS</span>
        </div>
        <h1 className="editorial-title text-4xl sm:text-5xl font-extrabold text-primary">
          Writing &amp; Drafts
        </h1>
        <p className="text-base sm:text-lg text-secondary font-sans leading-relaxed">
          Hover or click the archival folder below to release floating manuscript notes with zero-gravity physics. Select any note to read the full essay.
        </p>
      </div>

      {/* ============================================================
          INTERACTIVE FOLDER FLOAT (React Bits Component)
          Replaces the static book with papers floating out of the folder
          ============================================================ */}
      <div className="relative flex flex-col items-center justify-center pt-32 sm:pt-36 pb-14 overflow-visible">
        {/* Subtle Halftone Background Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] pointer-events-none opacity-30 dark:opacity-20 select-none">
          <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_120s_linear_infinite]">
            <circle cx="200" cy="200" r="185" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" className="text-stone-400 dark:text-stone-600" />
            <circle cx="200" cy="200" r="170" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 6" className="text-stone-500 dark:text-stone-500" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" className="text-stone-400 dark:text-stone-700" />
            <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" className="text-stone-400 dark:text-stone-800" />
          </svg>
        </div>

        {/* The React Bits FolderFloat Component */}
        <div className="relative z-10 flex flex-col items-center">
          <FolderFloat
            items={folderItems}
            label="Surya V M Manuscripts"
            sublabel="6 floating notes • Click note to read"
            trigger={isMobile ? 'click' : 'hover'}
            closeOnSelect={false}
            physics={true}
            drift={0.35}
            onSelect={handleSelectNote}
            folderColor="#27272a"
            frontColor="#3f3f46"
            paperColor="#f4f4f5"
            itemColor="#fafafa"
            itemTextColor="#18181b"
            labelColor="#ffffff"
            width={isMobile ? 195 : 260}
            height={isMobile ? 135 : 165}
            radius={16}
            spread={isMobile ? 115 : 360}
            lift={isMobile ? 16 : 24}
            tilt={6}
            flapAngle={38}
            restAngle={16}
            openDuration={550}
            stagger={45}
            bounce={0.25}
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-xs text-muted text-center mt-8 px-4">
            <span className="rubber-stamp">ARCHIVE::ACTIVE</span>
            <span className="text-[11px] sm:text-xs">
              {isMobile ? 'TAP FOLDER TO OPEN · TAP NOTE TO READ' : 'HOVER TO OPEN FOLDER · DRAG PAPERS · CLICK TO READ'}
            </span>
          </div>
        </div>
      </div>


      {/* ============================================================
          FULL ARTICLE READER SLIDE-OVER / MODAL
          ============================================================ */}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Reading Document Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-card rounded-2xl border-2 border-strong shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Reading Progress Indicator Bar */}
              <div className="h-1 bg-surface w-full">
                <div 
                  className="h-full bg-iris-500 transition-all duration-150"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>

              {/* Reader Header */}
              <div className="p-4 sm:p-6 border-b border-subtle flex items-center justify-between font-mono text-xs bg-surface/50">
                <div className="flex items-center gap-3">
                  <span className="rubber-stamp">{readingArticle.number}</span>
                  <span className="text-muted hidden sm:inline">{readingArticle.category}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-muted flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    {readingArticle.readTime}
                  </span>
                  <button
                    onClick={() => setReadingArticle(null)}
                    className="p-1.5 rounded-lg hover:bg-card border border-subtle text-muted hover:text-primary transition-colors"
                    aria-label="Close reader"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Reader Body */}
              <div 
                ref={readerScrollRef}
                onScroll={handleReaderScroll}
                className="p-6 sm:p-12 overflow-y-auto space-y-8 font-sans"
              >
                {/* Article Header Meta */}
                <div className="space-y-4 border-b border-subtle pb-6">
                  <div className="font-mono text-xs text-muted flex items-center gap-2">
                    <span>{readingArticle.date}</span>
                    <span>•</span>
                    <span>AUTHOR: {profileConfig.name}</span>
                    <span>•</span>
                    <span className="text-emerald-500">VERIFIED ARCHIVE</span>
                  </div>
                  <h1 className="editorial-title text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
                    {readingArticle.title}
                  </h1>
                </div>

                {/* Article Body Sections */}
                <div className="space-y-8 text-secondary text-sm sm:text-base leading-relaxed">
                  {readingArticle.content?.map((sec, sIdx) => (
                    <section key={sec.sectionId || sIdx} className="space-y-4">
                      {sec.heading && (
                        <h2 className="font-mono text-lg sm:text-xl font-bold text-primary border-l-4 border-iris-500 pl-3">
                          {sec.heading}
                        </h2>
                      )}
                      {sec.paragraphs?.map((p, pIdx) => (
                        <p key={pIdx} className="leading-relaxed font-sans text-secondary">
                          {p}
                        </p>
                      ))}
                    </section>
                  ))}
                </div>

                {/* Article Sign-Off & Verification Stamp */}
                <div className="pt-8 border-t border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-muted">
                  <div className="space-y-1">
                    <div className="text-primary font-bold">WRITTEN BY SURYA V M</div>
                    <div className="text-[11px] text-muted">TAMIL NADU, INDIA // SIGNBRIDGE RESEARCH</div>
                  </div>
                  <span className="rubber-stamp">ARCHIVE::VERIFIED</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
