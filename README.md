# SURYA V M — Personal Portfolio & Founder Platform

> **Software Developer • Full-Stack Developer • AI/IoT Builder • Startup Founder**  
> Modern 2026 Developer Portfolio & Startup Founder Personal Brand

---

## 🌟 Overview

A custom-designed personal portfolio and startup ecosystem engineered for **Surya V M**. Built with an editorial aesthetic (predominantly crisp white background with refined iris/violet-purple accents), cinematic video hero intro, live telemetry dashboards, interactive case-study deep dives, and an Express API backend.

---

## 🚀 Key Highlights & Architectural Features

1. **Cinematic Hero Video Introduction**:
   - Seamlessly plays the developer introduction video (`hero-developer.mp4`) with subtle white/iris gradients.
   - Synchronized reactive personal introduction overlay (*"Hi, I'm Surya V M — Software Developer • AI/IoT Builder • Startup Founder"*) that animates as the developer turns toward the laptop.
   - Preserves unobstructed visibility of the developer's face.

2. **Floating Minimal Navigation**:
   - Glassmorphic floating navbar with active section detection and iris underline highlights.
   - Mobile-responsive fullscreen overlay menu with smooth animations.

3. **Narrative & Engineering Methodology (About & How I Build)**:
   - Authentic narrative highlighting Surya's builder philosophy: *concept → architecture → development → deployment*.
   - Interactive 6-stage engineering pipeline: **IDEA → DESIGN → BUILD → TEST → DEPLOY → IMPROVE**.
   - 7-stage detailed product roadmap: **Discover, Design, Build, Integrate, Test, Deploy, Improve**.

4. **Technical Arsenal (Interactive Skills)**:
   - 6 Categorized competency clusters: **Frontend, Backend, Database & Cloud, AI / ML, IoT & Embedded, Tools**.
   - Category filtering pills and hover micro-interactions with iris border glows.

5. **Selected Works (Interactive Architecture Dashboards & Case Studies)**:
   - **EcoClamp IoT**: Non-invasive machine monitoring with simulated live CT current, 3-axis MPU6050 vibration, and temperature telemetry.
   - **AgriFlow**: Predictive agricultural procurement operations and supply forecasting platform.
   - **SignBridge**: Central startup venture and product incubator ([signbridge.click](https://signbridge.click/)).
   - **BeltSentinel**: Industrial conveyor-belt health & joint-failure prediction HMI.
   - **Synthetix HR**: Explainable resume intelligence assistant with bias mitigation and prompt injection audits.
   - **Sentinel**: Low Earth orbit space-debris and conjunction risk visualization.
   - **Full Technical Case Studies**: Click any project to open an in-depth modal covering **Problem → Idea → Architecture → Technology → Implementation → Results → Future Scope**.

6. **Convergence & Startup Spotlight**:
   - **What I'm Building**: Interactive cards connecting Software, AI, and IoT with animated pulse lines.
   - **Building Beyond Code**: Dedicated SignBridge founder showcase (*Founder & CEO — SignBridge*).
   - **Building My Journey**: Modern milestone timeline highlighting real 2026 initiatives without generic corporate claims.

7. **Built With Code & Interactive Terminal**:
   - Animated terminal displaying build status, telemetry stream connections, and system health.
   - Core technology stack badges and GitHub CTA.

8. **Contact System & Backend Gateway**:
   - Interactive contact form with honeypot spam protection, validation, and confetti celebration.
   - **Node.js Express API**: Endpoint `POST /api/contact` on port 5000 with rate limiting and JSON validation.
   - **Python FastAPI Reference**: Companion microservice (`server/python_service_reference.py`) for AI & IoT telemetry scoring.

9. **Custom Interactive Cursor**:
   - Desktop-only smooth spring cursor with responsive iris ring on interactive elements. Automatically disabled on mobile/touch screens.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion, HTML5, CSS3 |
| **Backend** | Node.js, Express.js, Python (FastAPI reference) |
| **Database & Cloud** | PostgreSQL, Supabase, MongoDB architecture |
| **Edge & Hardware** | ESP32, SCT-013 CT Sensors, MPU6050, DS18B20, FreeRTOS |
| **Design Language** | Editorial White (75–85%), Iris Purple (`#7c3aed`, 10–15%), Dark Slate (`#0f172a`, 5–10%) |

---

## 💻 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend API Server
```bash
npm run server
# Runs Node.js Express server on http://localhost:5000
```

### 3. Start the Frontend Dev Server
```bash
npm run dev
# Runs Vite dev server on http://localhost:3000
```

### 4. Build for Production
```bash
npm run build
# Generates optimized client bundle in dist/
```

---

## 📬 Contact API Endpoint

- **URL**: `/api/contact`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Excited to collaborate on AIoT platforms.",
    "honeypot": ""
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Message received successfully! Surya will get back to you shortly.",
    "data": {
      "receivedAt": "2026-10-09T07:00:00.000Z",
      "name": "Jane Doe"
    }
  }
  ```

---

## 📄 License & Attribution
Designed & built by **Surya V M**.
All intellectual property and platform architecture owned by Surya V M.
