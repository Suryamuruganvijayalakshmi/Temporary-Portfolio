import React, { useEffect, useRef, useState } from 'react';
import { playClickSound, playHoverSound } from '../lib/soundFx';

/**
 * CustomCursor - Exact Signature Cursor from SignBridge (signbridge.click)
 * Features:
 * - 20-node silky smooth chained physics trailing line (0.44 damping factor)
 * - Tapered width from 4.2px to 0.8px with fading alpha gradient
 * - Luminous glow & dual-tone neon trail (electric blue / signbridge orange / lumina cyan)
 * - Precision pointer dot with crisp outer ring, hover expansion, and click compression
 * - Micro-burst spark particles on pointer click
 * - Native caret preservation over inputs/textareas
 * - Top-layer popover support to float over dialogs without z-index clipping
 */
export default function CustomCursor() {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch-only devices for optimal mobile UX
    const isTouch = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse coordinates
    const mouse = { x: -100, y: -100, active: false };
    let isHovered = false;
    let isClicking = false;
    let isOverInput = false;

    // Smooth tapered fluid trail (20 silky chain nodes)
    const TRAIL_COUNT = 20;
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }));

    // Click micro-sparks array
    const sparks = [];

    // Signature palette colors (SignBridge electric blue / lumina cyan / energetic orange)
    const brandPrimary = '#2563eb';    // Electric Royal Blue
    const brandCyan = '#06b6d4';       // Cyan Lumina
    const brandOrange = '#ea580c';     // Energetic SignBridge Orange
    const brandGlow = 'rgba(37, 99, 235, 0.45)';

    const onPointerMove = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (mouse.x < 0) {
        mouse.x = clientX;
        mouse.y = clientY;
        trail.forEach((p) => {
          p.x = clientX;
          p.y = clientY;
        });
      }

      if (mouse.x > 0) {
        const dist = Math.hypot(clientX - mouse.x, clientY - mouse.y);
        // Spawn subtle luminous stardust on swift motion
        if (dist > 16 && Math.random() < 0.35) {
          sparks.push({
            x: clientX + (Math.random() - 0.5) * 6,
            y: clientY + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 0.9,
            vy: (Math.random() - 0.5) * 0.9,
            life: 0.8,
            decay: 0.04,
            size: 2.0,
            color: Math.random() > 0.5 ? brandCyan : brandOrange,
          });
        }
      }

      mouse.x = clientX;
      mouse.y = clientY;
      mouse.active = true;
      setIsVisible(true);

      const target = e.target;
      isOverInput = !!(target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable));

      const interactive = !!(
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.getAttribute('role') === 'button' ||
          target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, .interactive-hover'))
      );

      isHovered = interactive;
    };

    const onPointerDown = (e) => {
      isClicking = true;
      playClickSound();
      // Spawn 7 tactile micro-sparks on click
      const sparkCount = 7;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
        const speed = 1.6 + Math.random() * 2.2;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.05 + Math.random() * 0.04,
          size: 2.2 + Math.random() * 1.5,
          color: i % 2 === 0 ? brandOrange : brandCyan,
        });
      }
    };

    const onPointerUp = () => {
      isClicking = false;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      setIsVisible(false);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    // Smooth render loop
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Render sparks regardless of input hover
      if (sparks.length > 0) {
        ctx.save();
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.94;
          s.vy *= 0.94;
          s.life -= s.decay;

          if (s.life <= 0) {
            sparks.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = Math.max(0, s.life * 0.9);
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 6;
          ctx.fill();
        }
        ctx.restore();
      }

      // Hide custom cursor pointer if hovering real text input/textarea to preserve native caret
      if (mouse.x > 0 && mouse.active && !isOverInput) {
        // 1. Update trail nodes (silky spring physics: 0.44 chase factor)
        trail[0].x = mouse.x;
        trail[0].y = mouse.y;

        for (let i = 1; i < TRAIL_COUNT; i++) {
          const prev = trail[i - 1];
          const curr = trail[i];
          curr.x += (prev.x - curr.x) * 0.44;
          curr.y += (prev.y - curr.y) * 0.44;
        }

        // 2. Draw Smooth Fluid Trailing Line
        if (trail.length >= 3) {
          ctx.save();
          for (let i = 0; i < trail.length - 1; i++) {
            const p0 = trail[i];
            const p1 = trail[i + 1];
            const progress = i / (trail.length - 1);
            const alpha = (1 - progress) * 0.85;
            const lineWidth = Math.max(0.8, (1 - progress) * 4.2);

            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);

            // Vibrant gradient: Electric Blue at pointer -> Cyan/Orange lumina at tail
            ctx.strokeStyle = i < 6 ? brandPrimary : (i < 12 ? brandCyan : brandOrange);
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = alpha;
            ctx.shadowColor = brandGlow;
            ctx.shadowBlur = 8;
            ctx.stroke();
          }
          ctx.restore();
        }

        // 3. Draw Precision Pointer Dot with Crisp Outline and Halo
        ctx.save();
        ctx.beginPath();
        const dotRadius = isClicking ? 2.8 : (isHovered ? 5.5 : 3.8);
        ctx.arc(mouse.x, mouse.y, dotRadius, 0, Math.PI * 2);

        // Core fill with glowing aura
        ctx.fillStyle = isHovered ? brandOrange : brandPrimary;
        ctx.shadowColor = isHovered ? brandOrange : brandPrimary;
        ctx.shadowBlur = isHovered ? 14 : 9;
        ctx.fill();

        // Crisp pure white ring for razor-sharp definition against both light and dark backgrounds
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onPointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Top-layer popover support so cursor stays above all modal dialogs
  useEffect(() => {
    if (canvasRef.current && canvasRef.current.showPopover) {
      try {
        canvasRef.current.showPopover();
      } catch (e) {
        // Fallback for browsers without popover API
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neat-cursor-canvas hidden md:block pointer-events-none fixed top-0 left-0 w-screen h-screen z-[999999] overflow-hidden bg-transparent border-0 m-0 p-0"
      popover="manual"
      aria-hidden="true"
    />
  );
}
