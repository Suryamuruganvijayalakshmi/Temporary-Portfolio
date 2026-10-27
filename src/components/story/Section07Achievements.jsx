import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { AnimatedContent } from '../animations/InteractionEffects';
import { SpotlightCard } from '../animations/SpotlightCard';
import { DecryptedText } from '../animations/DecryptedText';
import { BorderBeam } from '../animations/BorderBeam';

const educationDetails = {
  degree: 'B.E. Computer Science and Engineering (AI & ML)',
  institution: 'M. Kumarasamy College of Engineering (MKCE)',
  timeline: '2025 — 2029',
  location: 'Tamil Nadu, India',
  focusAreas: [
    'Artificial Intelligence & Deep Learning',
    'Machine Learning Mathematical Foundations',
    'Microcontroller Embedded Systems & IoT',
    'Data Structures, Algorithms & Software Architecture',
  ],
};

const certifications = [
  {
    title: 'HackerRank Frontend Developer (React)',
    issuer: 'HackerRank',
    year: '2026',
    status: 'Verified Certification',
    desc: 'Demonstrated mastery of React components, state architecture, performance optimization, and concurrent patterns.',
  },
  {
    title: 'Claude Code 101 Certification',
    issuer: 'Anthropic Certification Program',
    year: '2026',
    status: 'Verified Certificate',
    desc: 'Advanced agentic workflows, prompt engineering, and autonomous software development toolchains.',
  },
  {
    title: 'Kalam Awards',
    issuer: 'National Innovation Forum',
    year: '2026',
    status: 'Project Participation',
    desc: 'Recognized for technological innovation and engineering hardware-software prototypes solving tangible problems.',
  },
  {
    title: 'Tata Crucible',
    issuer: 'Tata Group',
    year: '2025 — 2026',
    status: 'Campus Ambassador',
    desc: 'Represented campus initiatives, technical discourse, and business intelligence competitions.',
  },
];

const publishedBooks = [
  {
    title: 'The AI Wake-Up Call',
    type: 'Published Book',
    year: '2026',
    desc: 'An analytical exploration of artificial intelligence, foundational shifts in autonomous software, and ethical technological acceleration.',
  },
  {
    title: 'The Celestial Odyssey of NASA Through Time and Space',
    type: 'Published Book',
    year: '2026',
    desc: 'A comprehensive chronicle of space exploration milestones, orbital mechanics, and human deep-space discovery systems.',
  },
];

export default function Section07Achievements() {
  return (
    <section
      id="achievements"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-white border-t border-stone-200/80 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 border-b border-stone-200/80 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
              Section 07 // Credentials
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-sans">
              <DecryptedText text="Education & Honors" speed={30} maxIterations={10} />
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 max-w-xs">
            VERIFIED ACADEMIC FOUNDATIONS · CERTIFICATIONS · AUTHORSHIPS
          </p>
        </div>

        {/* Education Hero Card with SpotlightCard */}
        <AnimatedContent delay={0.05} yOffset={20}>
          <SpotlightCard
            spotlightColor="rgba(0, 102, 255, 0.12)"
            borderColor="rgba(0, 102, 255, 0.45)"
            className="p-8 sm:p-10 mb-16 hover:-translate-y-1 transition-transform relative overflow-hidden"
          >
            <BorderBeam size={280} duration={10} borderWidth={2} colorFrom="#2563eb" colorTo="#818cf8" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>FORMAL EDUCATION</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight font-sans">
                  {educationDetails.degree}
                </h3>

                <p className="text-base sm:text-lg text-stone-700 font-medium">
                  {educationDetails.institution}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
                  <span>CLASS OF {educationDetails.timeline}</span>
                  <span>·</span>
                  <span>{educationDetails.location}</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-2.5">
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  CONCENTRATIONS:
                </span>
                {educationDetails.focusAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2.5 text-xs text-stone-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>

            </div>
          </SpotlightCard>
        </AnimatedContent>

        {/* Certifications & Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Certifications & Competitions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-stone-900 font-sans tracking-tight uppercase">
                Certifications &amp; Recognitions
              </h3>
            </div>

            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <AnimatedContent key={cert.title} delay={idx * 0.08} yOffset={14}>
                  <SpotlightCard
                    spotlightColor="rgba(0, 102, 255, 0.1)"
                    borderColor="rgba(0, 102, 255, 0.35)"
                    className="p-5 hover:-translate-y-1 transition-transform"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base tracking-tight font-sans">
                        {cert.title}
                      </h4>
                      <span className="font-mono text-xs font-semibold text-blue-600 shrink-0 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {cert.year}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-stone-500 mb-2">
                      {cert.issuer} · {cert.status}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {cert.desc}
                    </p>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>

          {/* Right Column: Published Books */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <h3 className="text-base font-bold text-stone-900 font-sans tracking-tight uppercase">
                Published Books
              </h3>
            </div>

            <div className="space-y-3">
              {publishedBooks.map((book, idx) => (
                <AnimatedContent key={book.title} delay={idx * 0.1} yOffset={14}>
                  <SpotlightCard
                    spotlightColor="rgba(245, 158, 11, 0.12)"
                    borderColor="rgba(245, 158, 11, 0.35)"
                    className="p-5 hover:-translate-y-1 transition-transform"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BookmarkCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {book.type}
                      </span>
                    </div>

                    <h4 className="font-bold text-stone-900 text-base tracking-tight font-sans mb-1.5">
                      {book.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {book.desc}
                    </p>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
