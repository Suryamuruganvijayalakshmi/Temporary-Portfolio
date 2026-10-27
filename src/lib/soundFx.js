/**
 * Web Audio API Synth Feedback Engine (inspired by SignBridge)
 * Creates elegant, crisp micro-sounds on hover and click without external audio assets.
 */

let audioCtx = null;
let soundEnabled = true;

export const isSoundEnabled = () => soundEnabled;

export const toggleSound = () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    playChime(660, 'sine', 0.14);
  }
  return soundEnabled;
};

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playChime = (freq = 540, type = 'sine', duration = 0.12, volume = 0.035) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Smooth envelope attack and decay
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio context graceful fallback
  }
};

export const playHoverSound = () => {
  playChime(780, 'sine', 0.06, 0.015);
};

export const playClickSound = () => {
  playChime(440, 'triangle', 0.12, 0.04);
};

export const playSuccessSound = () => {
  if (!soundEnabled) return;
  try {
    playChime(523.25, 'sine', 0.1, 0.03); // C5
    setTimeout(() => playChime(659.25, 'sine', 0.12, 0.03), 70); // E5
    setTimeout(() => playChime(783.99, 'sine', 0.18, 0.035), 140); // G5
  } catch (e) {}
};
