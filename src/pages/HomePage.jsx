import React from 'react';
import Section01Hero from '../components/story/Section01Hero';
import Section02About from '../components/story/Section02About';
import Section03Journey from '../components/story/Section03Journey';
import Section04SignBridge from '../components/story/Section04SignBridge';
import Section05Projects from '../components/story/Section05Projects';
import Section06Skills from '../components/story/Section06Skills';
import Section07Achievements from '../components/story/Section07Achievements';
import Section08Vision from '../components/story/Section08Vision';
import Section09Contact from '../components/story/Section09Contact';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-[#fafaf8] text-stone-900 selection:bg-blue-600 selection:text-white">
      {/* Section 01 — Hero */}
      <Section01Hero />

      {/* Section 02 — About Me */}
      <Section02About />

      {/* Section 03 — My Journey */}
      <Section03Journey />

      {/* Section 04 — SignBridge (Venture Studio Feature) */}
      <Section04SignBridge />

      {/* Section 05 — Featured Projects (EcoClamp, FarmCargo, SENTINEL, Merry Berry, Portfolio) */}
      <Section05Projects />

      {/* Section 06 — Technical Skills */}
      <Section06Skills />

      {/* Section 07 — Education and Achievements */}
      <Section07Achievements />

      {/* Section 08 — Future Vision */}
      <Section08Vision />

      {/* Section 09 — Contact & Compact Footer */}
      <Section09Contact />
    </div>
  );
}
