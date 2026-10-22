import { create } from 'zustand';

// Animal & adjective pseudonym generator for presence
const ADJECTIVES = ['quiet', 'swift', 'bright', 'calm', 'keen', 'subtle', 'agile', 'lucid', 'steady', 'gentle'];
const ANIMALS = ['otter', 'fox', 'heron', 'falcon', 'lynx', 'badger', 'crane', 'osprey', 'beaver', 'wolf'];

const generatePseudonym = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `${adj} ${animal}`;
};

// Initial theme resolution: default to 'light' matching reference screenshots
const getInitialTheme = () => {
  if (typeof window === 'undefined') return { theme: 'light', resolvedTheme: 'light' };
  try {
    const saved = localStorage.getItem('surya-theme');
    if (saved === 'dark' || saved === 'light') {
      return { theme: saved, resolvedTheme: saved };
    }
    if (saved === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return { theme: 'system', resolvedTheme: prefersDark ? 'dark' : 'light' };
    }
    // Default light mode matches reference screenshots
    return { theme: 'light', resolvedTheme: 'light' };
  } catch (e) {
    return { theme: 'light', resolvedTheme: 'light' };
  }
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

  // Theme Management
  theme: initialThemeData.theme, // 'system' | 'dark' | 'light'
  resolvedTheme: initialThemeData.resolvedTheme, // 'dark' | 'light'
  setTheme: (newTheme) => {
    let resolved = 'dark';
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      resolved = prefersDark ? 'dark' : 'light';
    } else {
      resolved = newTheme;
    }

    try {
      localStorage.setItem('surya-theme', newTheme);
      if (resolved === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {}

    set({ theme: newTheme, resolvedTheme: resolved });
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
      listeningTrack: nextState ? 'ANALOG DESK // SURYA V M' : 'PAUSED // VINYL IDLE'
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
  setLabViewMode: (mode) => set({ labViewMode: mode }),

  // Floating Navigator
  isAssistantOpen: false,
  toggleAssistant: () => set((state) => ({ isAssistantOpen: !state.isAssistantOpen })),
  closeAssistant: () => set({ isAssistantOpen: false })
}));
