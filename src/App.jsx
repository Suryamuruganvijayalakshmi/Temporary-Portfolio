import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './lib/store';
import RootLayout from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LabPage from './pages/LabPage';
import WritingPage from './pages/WritingPage';
import StudioPage from './pages/StudioPage';
import ContactPage from './pages/ContactPage';

const routeTitles = {
  '/': 'Surya V M — Developer, Technology Innovator, Founder',
  '/about': 'About Surya V M — Identity & Telemetry',
  '/lab': 'Lab Playground (9 Experiments) — Surya V M',
  '/writing': 'Writing & Blueprints — Surya V M',
  '/studio': 'Studio & Engineering Services — Surya V M',
  '/contact': 'Contact Surya V M — Direct Inquiry Letter'
};

export default function App() {
  const activeRoute = useStore((state) => state.activeRoute);

  // Sync document title with active route
  useEffect(() => {
    const title = routeTitles[activeRoute] || routeTitles['/'];
    document.title = title;
  }, [activeRoute]);

  const renderPage = () => {
    switch (activeRoute) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/lab':
        return <LabPage />;
      case '/writing':
        return <WritingPage />;
      case '/studio':
        return <StudioPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <RootLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoute}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </RootLayout>
  );
}

