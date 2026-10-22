import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../lib/store';
import { featuredProjects, profileConfig } from '../../data/portfolioData';
import { 
  Search, 
  Compass, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Mail, 
  Home, 
  Sun, 
  Moon, 
  Laptop, 
  Users, 
  Radio, 
  Copy, 
  Check, 
  ExternalLink,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../SocialIcons';

export default function CommandPalette() {
  const { 
    isCommandPaletteOpen, 
    closeCommandPalette, 
    toggleCommandPalette, 
    setActiveRoute,
    setTheme,
    togglePresence,
    presenceEnabled,
    toggleAudio,
    isPlayingAudio,
    openProjectModal
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Global Keyboard Shortcut (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  // Command Definitions
  const commands = [
    // Navigation
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Home // Orbit View',
      description: 'Central cinematic project orbit and hero overview',
      icon: Home,
      action: () => setActiveRoute('/')
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About // Identity & Telemetry',
      description: 'Tactile identity card, live telemetry, and vinyl turntable',
      icon: Compass,
      action: () => setActiveRoute('/about')
    },
    {
      id: 'nav-lab',
      category: 'Navigation',
      title: 'Lab // Interactive Experiments',
      description: 'Nine interactive experiments including Live Cursors and Vocal Orb',
      icon: Sparkles,
      action: () => setActiveRoute('/lab')
    },
    {
      id: 'nav-writing',
      category: 'Navigation',
      title: 'Writing // Interactive Notebook',
      description: 'Tactile publication notebook and deep engineering essays',
      icon: BookOpen,
      action: () => setActiveRoute('/writing')
    },
    {
      id: 'nav-studio',
      category: 'Navigation',
      title: 'Studio // Hanging Badge & Services',
      description: 'Lanyard badge, specialized engineering services, and case studies',
      icon: Layers,
      action: () => setActiveRoute('/studio')
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact // Paper Letter & Ticket',
      description: 'Direct inquiry letter with validated delivery integration',
      icon: Mail,
      action: () => setActiveRoute('/contact')
    },

    // Projects Jump
    ...featuredProjects.map((project) => ({
      id: `project-${project.id}`,
      category: 'Projects',
      title: `Project: ${project.title}`,
      description: project.tagline,
      icon: Cpu,
      action: () => {
        openProjectModal(project);
        setActiveRoute('/');
      }
    })),

    // System Tools
    {
      id: 'tool-theme-dark',
      category: 'Theme',
      title: 'Theme: Dark Charcoal',
      description: 'Switch interface to dark charcoal studio mode',
      icon: Moon,
      action: () => setTheme('dark')
    },
    {
      id: 'tool-theme-light',
      category: 'Theme',
      title: 'Theme: Light Paper',
      description: 'Switch interface to tactile warm paper mode',
      icon: Sun,
      action: () => setTheme('light')
    },
    {
      id: 'tool-theme-system',
      category: 'Theme',
      title: 'Theme: Follow Operating System',
      description: 'Automatically follow your system color scheme',
      icon: Laptop,
      action: () => setTheme('system')
    },
    {
      id: 'tool-presence-toggle',
      category: 'Realtime',
      title: presenceEnabled ? 'Presence: Mute Live Cursors' : 'Presence: Enable Live Cursors',
      description: presenceEnabled ? 'Hide cursor broadcasting' : 'Participate in shared multi-client cursors',
      icon: Users,
      action: () => togglePresence()
    },
    {
      id: 'tool-audio-toggle',
      category: 'Audio',
      title: isPlayingAudio ? 'Audio: Pause Turntable' : 'Audio: Play Studio Session',
      description: 'Toggle analog workspace audio synthesizer',
      icon: Radio,
      action: () => toggleAudio()
    },

    // External / Clipboard
    {
      id: 'action-copy-email',
      category: 'Actions',
      title: copiedEmail ? 'Email Copied!' : 'Copy Verified Email',
      description: profileConfig.email,
      icon: copiedEmail ? Check : Copy,
      action: () => {
        navigator.clipboard?.writeText(profileConfig.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    },
    {
      id: 'action-github',
      category: 'External',
      title: 'GitHub Profile',
      description: profileConfig.githubUrl,
      icon: GithubIcon,
      action: () => window.open(profileConfig.githubUrl, '_blank')
    },
    {
      id: 'action-linkedin',
      category: 'External',
      title: 'LinkedIn Profile',
      description: profileConfig.linkedinUrl,
      icon: LinkedinIcon,
      action: () => window.open(profileConfig.linkedinUrl, '_blank')
    },
    {
      id: 'action-signbridge',
      category: 'External',
      title: 'SignBridge Startup Portal',
      description: profileConfig.companyUrl,
      icon: ExternalLink,
      action: () => window.open(profileConfig.companyUrl, '_blank')
    }
  ];

  // Filter commands by search query
  const filteredCommands = commands.filter((cmd) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Handle Keyboard Navigation within Dialog
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeCommandPalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        if (filteredCommands[selectedIndex].id !== 'action-copy-email') {
          closeCommandPalette();
        }
      }
    }
  };

  // Keep active element in view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCommandPalette}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette Dialog Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl rounded-xl bg-card border border-strong shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-subtle bg-surface">
              <Search className="w-4 h-4 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or jump to page..."
                className="w-full bg-transparent text-sm font-mono text-primary placeholder:text-muted focus:outline-none"
                aria-autocomplete="list"
                aria-controls="command-list"
              />
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-card text-muted border border-subtle">
                ESC to close
              </span>
            </div>

            {/* Scrollable Command List */}
            <div 
              id="command-list"
              ref={listRef}
              role="listbox"
              className="overflow-y-auto p-2 divide-y divide-subtle/30"
            >
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-muted">
                  No matching commands found.
                </div>
              ) : (
                filteredCommands.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        item.action();
                        if (item.id !== 'action-copy-email') closeCommandPalette();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                        isSelected ? 'bg-surface text-primary border border-subtle shadow-xs' : 'text-secondary hover:bg-surface/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-1.5 rounded-md border ${isSelected ? 'bg-card border-medium text-iris-400' : 'bg-surface border-subtle text-muted'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-medium truncate">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1 rounded bg-surface text-muted border border-subtle">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <ArrowRight className="w-3.5 h-3.5 text-muted ml-2 shrink-0" />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Accessibility Keyboard Footer */}
            <div className="px-4 py-2 border-t border-subtle bg-surface text-[11px] font-mono text-muted flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1 py-0.5 rounded bg-card border border-subtle">↑↓</kbd> Navigate</span>
                <span><kbd className="px-1 py-0.5 rounded bg-card border border-subtle">↵</kbd> Select</span>
                <span><kbd className="px-1 py-0.5 rounded bg-card border border-subtle">ESC</kbd> Close</span>
              </div>
              <div className="text-[10px] text-muted">
                SURYA V M // COMMAND OS
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
