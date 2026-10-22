# SURYA V M — Award-Caliber Personal Portfolio

> **Developer • Technology Innovator • Founder**  
> Canonical Domain: [https://surya.signbridge.click](https://surya.signbridge.click)  
> Startup: [SignBridge](https://signbridge.click) | GitHub: [@Suryamuruganvijayalakshmi](https://github.com/Suryamuruganvijayalakshmi) | Location: Tamil Nadu, India

---

## 🌟 Overview

A production-ready, experimental portfolio website for **Surya V M**, inspired by an archival physical desk composition:
- **Design Metaphor**: Layered physical desk, printed photographs, postcards, paper clips, postal cancellation marks, and an analog vinyl turntable.
- **Color & Texture Palette**: Default warm off-white paper surface (`#f7f6f2`), fine halftone grain, subtle paper noise, high-contrast monochrome editorial typography, oversized project titles, and tiny monospace telemetry.
- **Persistent Global Header**: Double-circle `(S)` monogram route indicator, live telemetry strip (`UT:: Time`, `FPS:: 60`, `ONLINE:: Count`, `LCP:: Measurement`, `PRESENCE:: State`, `Availability`), clean pill navigation (`About | Lab | Writing | Studio | Contact`), dedicated `⌘K` command palette, notification trigger, and light/dark theme toggle.
- **Presence & Realtime**: Bottom-left visitor toast notification for realtime joins, floating assistant button with quick navigation flyout, and multi-tab live presence broadcast.

---

## 🚀 Key Pages & Architecture

### 1. Home (`/`)
- Matches the reference editorial layout:
  - Large featured project photograph on the left.
  - Project index (`Nº01 / 06`), bold editorial title, category, year, and `View project` pill in the center.
  - Square project logo card on the right with soft drop shadow.
  - 4 surrounding tilted cards (vintage b/w photograph with paper pin, landscape photo, signature card, and colorful badge).
  - Dotted constellation pattern near central content.
  - GSAP ScrollTrigger timeline and wheel-driven scroll transitions between all 6 featured projects.
  - Keyboard navigation (Left/Right arrows) and indicator pills (`01`–`06`).

### 2. About (`/about`)
- Physical desk composition with 3 primary objects:
  - **Object A (Identity Postcard)**: Protruding metallic paper clip, perforated stamp with portrait, circular postmark, cancellation waves, social links (X, Instagram, GitHub, Web), `About me` expandable biography.
  - **Object B (Telemetry Panel)**: Overlapping dark charcoal card with `TELEMETRY::LIVE`, live pulse dot, local time, Tamil Nadu coordinates, visitor counter, and a 60-week grayscale GitHub contribution heatmap.
  - **Object C (Vinyl Turntable)**: Detailed dark vinyl grooves with smooth CSS spin, silver tone arm, `RADIO::LIVE` indicator, Web Audio API analog synth sound generator toggled on user click.
  - Pinned vertical filing tabs on the right edge: `FILE::WRITING` and `FILE::LAB`.

### 3. Studio (`/studio`)
- **3D-Inspired Lanyard Badge**: Suspended badge with realistic spring-based swinging motion, physics-based drag with momentum, `(S)` monogram, name, role, and surrounding halftone ring.
- **6 Studio Services**: Detailed capabilities across Web Development, Interactive Frontend, Full-Stack Applications, IoT & Embedded Prototypes, AI-Enabled Software, and Technical Product Development.
- **Unified Case Studies**: Access to all 6 projects synchronized with Home.

### 4. Writing (`/writing`)
- **Tactile 3D Notebook**: Light-gray paper cover, `WRITING::Nº01`, visible stacked paper edges, paper notch cut along the right edge, and a revolving dotted halftone ring.
- **Page Flipping**: Swipe, drag with momentum, or use keyboard arrow keys to cycle through drafts.
- **Interactive Reader Modal**: Top reading progress bar, sticky Table of Contents, formatted technical content, references & external links, credits attribution, and signature closing.
- **3 Sample Drafts**:
  1. *Architecting Non-Invasive AIoT: From Current Transformers to Cloud Telemetry*
  2. *Designing Editorial Web Experiences in an Era of Identical Frameworks*
  3. *Predictive Agritech Logistics: Solving the Peak Harvest Intake Bottleneck*

### 5. Lab (`/lab`)
- **View Modes**: `WHEEL` (curved experiment names with huge active typography & preview panel), `LIST` (editorial catalog), and `GRID` (3x3 interactive cards).
- **Nine Working Experiments**:
  1. *Dynamic Scroll*: Scroll kinematics, velocity slider, damping simulation.
  2. *Rotating Gallery*: 3D CSS transform carousel responding to rotation controls.
  3. *Paste-Up*: Layered tactile draggable cards with z-index bring-to-front.
  4. *Vocal Orb*: Audio-reactive visualizer with explicit permission gesture, Web Audio fallback, and zero audio recording.
  5. *Live Cursors*: Multi-user cursor synchronization and presence broadcast.
  6. *Dial*: Tactile rotary potentiometer with detent angle readout.
  7. *Polka Dots*: Canvas halftone matrix repelling dynamically from cursor.
  8. *Heart*: Parametric cardioid curve pulse with amplitude surging.
  9. *Three.js Scene*: GPU-optimized procedural orbital node simulation.

### 6. Contact (`/contact`)
- **Paper Letter on Desk**: Warm off-white paper texture, animated torn-paper top edge, monogram, name, role, email, location, greeting, ruled message textarea, signature field, and `Send It` button.
- **Physical Checkboxes**: `[✓] New Business`, `[✓] Collaboration`, `[✓] Just a hello`.
- **Paper-Clipped PRESS Ticket Stub**: Barcode, Job, Received, Reply By, Status, and File Under.
- **Submission Pipeline**: Formspree / API endpoint integration with honeypot spam protection, zero simulated delivery, and transparent mailto fallback.

---

## 📂 Synchronized Project Collection

All 6 projects are driven by a single shared data source (`src/data/portfolioData.js`):
1. **SIGNBRIDGE** ([https://signbridge.click](https://signbridge.click)) — Startup venture and technology communication platform.
2. **ECOCLAMP** ([https://ecoclamp.vercel.app](https://ecoclamp.vercel.app)) — AIoT smart resource conservation and industrial energy intelligence platform.
3. **FARMCARGO** — Predictive agricultural procurement operations and logistics intake platform.
4. **SENTINEL** — Autonomous orbital safety, satellite rescue, and debris mitigation simulation.
5. **MERRY BERRY ICE CREAM CAFE** — Concept cafe web experience with cinematic visuals and product storytelling.
6. **AI-BASED SECURE eSIM VISA OVERSTAY DETECTION AND ALERT SYSTEM** — Telecom roaming metadata and zero-knowledge privacy alert concept.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **State Management**: Zustand (`src/lib/store.js`)
- **Smooth Scroll**: Lenis Scroll
- **Animations**: GSAP ScrollTrigger & Framer Motion
- **Icons**: Lucide React + Custom SVG Brand Badges
- **Audio Engine**: Web Audio API Procedural Synthesizer
- **Confetti**: Canvas Confetti

---

## 💻 Local Development & Build

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
# Vite runs on http://localhost:3000 (or http://localhost:3001)
```

### Production Build
```bash
npm run build
# Outputs optimized production assets to dist/
```

### Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment Configuration

- **Canonical URL**: `https://surya.signbridge.click`
- **Sitemap**: `public/sitemap.xml`
- **Robots**: `public/robots.txt`
- **Favicon**: `public/favicon.svg`
- **Environment**: Documented in `.env.example`
