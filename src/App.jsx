import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Works from './components/Works';
import HowIBuild from './components/HowIBuild';
import CurrentFocus from './components/CurrentFocus';
import StartupSection from './components/StartupSection';
import Journey from './components/Journey';
import CodeTerminal from './components/CodeTerminal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-100 selection:text-iris-900 relative">
      {/* Desktop Custom Interactive Cursor */}
      <CustomCursor />

      {/* Floating Minimal Glass Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Experience — Cinematic Video Intro */}
        <Hero />

        {/* 2. Who I Am — Narrative & Statistics */}
        <About />

        {/* 3. Technical Arsenal — Interactive Categorized Skills */}
        <Skills />

        {/* 4. Selected Works — 6 Production Projects & Case Studies */}
        <Works />

        {/* 5. How I Build — From Idea to Product (7 Stages) */}
        <HowIBuild />

        {/* 6. What I'm Building — Software, AI, IoT Convergence */}
        <CurrentFocus />

        {/* 7. Startup Section — Building Beyond Code & SignBridge */}
        <StartupSection />

        {/* 8. Journey — Modern Vertical Milestone Timeline */}
        <Journey />

        {/* 9. Built With Code — Terminal & Technologies */}
        <CodeTerminal />

        {/* 10. Contact — Have an idea? Backend Form */}
        <Contact />
      </main>

      {/* 11. Minimal White Footer */}
      <Footer />
    </div>
  );
}
