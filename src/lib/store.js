import { create } from 'zustand';

// Animal & adjective pseudonym generator for presence
const ADJECTIVES = ['quiet', 'swift', 'bright', 'calm', 'keen', 'subtle', 'agile', 'lucid', 'steady', 'gentle'];
const ANIMALS = ['otter', 'fox', 'heron', 'falcon', 'lynx', 'badger', 'crane', 'osprey', 'beaver', 'wolf'];

const generatePseudonym = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `${adj} ${animal}`;
};

// Permanent Dark Theme Enforcement
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('surya-theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
    } catch (e) {}
  }
  return { theme: 'dark', resolvedTheme: 'dark' };
};

const initialThemeData = getInitialTheme();

export const useStore = create((set, get) => ({
  // Navigation & Routing
  activeRoute: typeof window !== 'undefined' ? (window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/$/, '')) : '/',
  setActiveRoute: (route) => {
    const cleanRoute = route === '' ? '/' : route;
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== cleanRoute) {
        window.history.pushState({}, '', cleanRoute);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    set({ activeRoute: cleanRoute });
  },

  // Theme Management (Locked to Dark)
  theme: 'dark',
  resolvedTheme: 'dark',
  setTheme: () => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('surya-theme', 'dark');
    }
    set({ theme: 'dark', resolvedTheme: 'dark' });
  },

  // Command Palette
  isCommandPaletteOpen: false,
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),

  // Telemetry
  fps: 60,
  lcp: '1.18s',
  currentTime: '--:--:--',
  onlineCount: 1, // Honest local session count
  presenceStatus: 'STANDALONE // LOCAL',
  availability: 'NOV 2026 // OPEN FOR PROJECTS',
  setTelemetry: (key, value) => set({ [key]: value }),

  // Realtime Presence
  presenceEnabled: true,
  togglePresence: () => set((state) => ({ 
    presenceEnabled: !state.presenceEnabled,
    presenceStatus: !state.presenceEnabled ? 'STANDALONE // LOCAL' : 'PRESENCE MUTED'
  })),
  myPseudonym: generatePseudonym(),
  remoteCursors: [],

  // Audio / Listening Track
  isPlayingAudio: false,
  listeningTrack: 'LOCAL PLAYLIST // VINYL READY',
  toggleAudio: () => set((state) => {
    const nextState = !state.isPlayingAudio;
    return {
      isPlayingAudio: nextState,
      listeningTrack: nextState ? 'Portfolio Harmony // Sounddelicious' : 'PAUSED // VINYL IDLE'
    };
  }),

  // Modals & Panels
  activeProjectModal: null,
  openProjectModal: (project) => set({ activeProjectModal: project }),
  closeProjectModal: () => set({ activeProjectModal: null }),

  activeArticle: null,
  openArticleReader: (article) => set({ activeArticle: article }),
  closeArticleReader: () => set({ activeArticle: null }),

  // Lab Playground State
  labIndex: 0,
  labViewMode: 'list', // 'list' | 'wheel' | 'grid'
  setLabIndex: (index) => set({ labIndex: index }),
  setLabViewMode: (mode) => set({ labViewMode: mode })
}));
