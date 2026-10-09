export const projects = [
  {
    id: "ecoclamp-iot",
    number: "01",
    title: "EcoClamp IoT",
    category: "AIoT • Industrial Monitoring • Predictive Maintenance",
    tagline: "Non-invasive machine energy & anomaly intelligence",
    description: "An AIoT industrial machine-monitoring system designed to monitor machine energy behavior and identify abnormal operating conditions before catastrophic equipment failures occur.",
    technologies: [
      "ESP32",
      "CT Current Sensor",
      "MPU6050",
      "Temperature Sensor",
      "React",
      "Node.js",
      "Supabase",
      "AI/ML",
      "TinyML"
    ],
    features: [
      "Non-invasive machine monitoring without halting factory lines",
      "Real-time CT current and harmonic load tracking",
      "MPU6050 3-axis vibration FFT frequency analysis",
      "Thermal boundary & temperature spike detection",
      "Machine-specific adaptive baseline learning",
      "Edge-assisted anomaly detection algorithms",
      "Composite Machine Health Score (0–100%)",
      "Predictive maintenance early-warning alerts",
      "Energy conservation and idle power leakage insights"
    ],
    caseStudy: {
      problem: "Industrial electric motors and manufacturing machines frequently suffer from unexpected downtime caused by bearing wear, shaft misalignment, and thermal overload. Traditional vibration analysis tools are expensive, invasive, and require manual inspections.",
      idea: "Develop a plug-and-play, non-invasive clamp sensor pod (EcoClamp) powered by ESP32 that captures electrical current signatures, 3-axis vibration, and surface temperature, running edge baseline learning and streaming telemetry to a cloud dashboard for automated anomaly detection.",
      architecture: "Edge Sensor Pod (ESP32 + SCT-013 CT Sensor + MPU6050 I2C + DS18B20 Temp) → Secure MQTT/HTTPS Telemetry → Node.js Ingestion Gateway → Supabase Database & Timescale DB → Automated Baseline Scoring Pipeline → React Real-Time Dashboard.",
      technology: "ESP32 microcontrollers programmed in C++/FreeRTOS, SCT-013 current transformers, MPU6050 accelerometer/gyroscope, DS18B20 digital temperature sensors, Node.js streaming microservices, Supabase PostgreSQL, React 19 interactive telemetry UI with live canvas charts.",
      implementation: "Created high-frequency ADC sampling routines on ESP32 Core 1 while handling network telemetry on Core 0. Implemented moving-window RMS and peak-to-peak vibration algorithms. Built a cloud microservice that compares live metrics against machine-specific historical baselines to flag statistical deviations.",
      results: "Capable of detecting early rotor unbalance and anomalous current spikes up to 48 hours prior to mechanical threshold limits, allowing proactive maintenance scheduling and reducing unplanned factory downtime.",
      futureScope: "Deploying quantized TinyML autoencoders directly onto the ESP32 firmware for zero-latency offline inference in remote industrial zones without reliable internet connectivity."
    }
  },
  {
    id: "agriflow",
    number: "02",
    title: "AgriFlow",
    category: "AI • Agriculture • Predictive Procurement",
    tagline: "Predictive agricultural procurement operations platform",
    description: "AgriFlow is a predictive agricultural procurement operations platform designed to improve planning, supply visibility and procurement coordination between farming regions and distribution hubs.",
    technologies: [
      "React",
      "Node.js",
      "Python",
      "AI/ML",
      "PostgreSQL",
      "Supabase",
      "REST APIs"
    ],
    features: [
      "Dynamic procurement planning and capacity allocation",
      "Time-series harvest supply forecasting using ML models",
      "Regional farmer supply visibility and lot tracking",
      "Procurement-centre logistics coordination",
      "Demand vs. supply mismatch analysis",
      "Actionable operational insights for supply chain managers",
      "Predictive planning across multiple crop seasons"
    ],
    caseStudy: {
      problem: "Agricultural procurement often suffers from severe supply volatility, lack of advance visibility into crop yields, and bottlenecked procurement collection centers, resulting in crop spoilage and chaotic transport scheduling.",
      idea: "Move beyond standard static farmer registration by creating an end-to-end predictive procurement operations hub that forecasts harvest volumes weeks in advance and optimizes center-level receiving schedules.",
      architecture: "Mobile/Web Farmer & Field Officer Portals → Python Analytics Service (Scikit-Learn/Prophet forecasting models) → Node.js API Layer → Supabase PostgreSQL with Row Level Security → Centralized Procurement Operations Dashboard.",
      technology: "Frontend built with React and Tailwind for high-density logistics monitoring. Backend powered by Node.js and Python for forecasting calculations. Supabase PostgreSQL for relational consistency and audit logging.",
      implementation: "Designed predictive algorithms integrating historical yield data, weather patterns, and localized planting dates to generate dynamic supply forecasts. Created interactive capacity calendars for procurement centers to smooth out peak intake volumes.",
      results: "Enhanced supply visibility, giving procurement coordinators up to 14 days of advance foresight into regional harvest influxes to pre-allocate logistics trucks and warehouse space.",
      futureScope: "Integrating satellite crop health index (NDVI) feeds and cold-chain IoT temperature tracking for perishables in transit."
    }
  },
  {
    id: "signbridge",
    number: "03",
    title: "SignBridge",
    category: "Software • Product Development • Startup",
    tagline: "Platform for practical communication & software products",
    description: "SignBridge is my startup and technology-building platform focused on creating practical communication, accessibility, and high-impact software products.",
    link: "https://signbridge.click/",
    isStartup: true,
    technologies: [
      "Full-Stack Web",
      "React",
      "Node.js",
      "AI Models",
      "Cloud Architecture",
      "Responsive UI",
      "Product Strategy"
    ],
    features: [
      "Central startup & product ecosystem",
      "Mission-driven digital accessibility technology",
      "Ultra-responsive modern web application architecture",
      "Seamless integration between AI services and user workflows",
      "Continuous iteration based on real user feedback",
      "Scalable cloud deployment on modern infrastructure",
      "Flagship venture: https://signbridge.click"
    ],
    caseStudy: {
      problem: "Communication barriers and accessibility hurdles prevent individuals and organizations from interacting seamlessly. Many existing software tools are either overly academic, clunky, or unaffordable for everyday users.",
      idea: "Build SignBridge as an agile startup venture dedicated to engineering pragmatic, intuitive software and communication tools that solve real human friction points.",
      architecture: "Microservices-ready cloud infrastructure designed for low latency, secure user data handling, and scalable web delivery across devices.",
      technology: "React modern frontend, Node.js and Python microservices, modern cloud hosting, JWT authentication, and automated continuous delivery pipelines.",
      implementation: "Bootstrapped from concept to production deployment. Led architectural design, frontend development, UX workflows, backend APIs, and product roadmapping under the SignBridge brand.",
      results: "Live at signbridge.click, serving as the launchpad and parent ecosystem for innovative software products and continuous experimentation.",
      futureScope: "Expanding the SignBridge suite to encompass next-generation real-time multi-modal communication and smart assistive interfaces."
    }
  },
  {
    id: "beltsentinel",
    number: "04",
    title: "BeltSentinel",
    category: "Industrial AI • Predictive Maintenance • IoT",
    tagline: "Conveyor belt joint failure & abnormal motion prediction",
    description: "An industrial conveyor-belt health monitoring concept designed to detect abnormal belt behavior and support early joint-failure prediction in heavy-industry material handling environments.",
    technologies: [
      "ESP32",
      "Vibration Telemetry",
      "Infrared Alignment Sensors",
      "Python AI",
      "React",
      "WebSockets",
      "PostgreSQL"
    ],
    features: [
      "Real-time conveyor speed and slippage monitoring",
      "Splice joint integrity tracking and fatigue detection",
      "3-axis belt vibration anomaly classification",
      "Trough angle and belt wander detection",
      "Predictive Remaining Useful Life (RUL) estimation",
      "High-noise industrial environment filtering",
      "Immediate automated shutdown advisory thresholds"
    ],
    caseStudy: {
      problem: "In mining, steel mills, and bulk logistics, a sudden rip or splice failure on a heavy-duty conveyor belt can cost tens of thousands of dollars per hour in production stoppage and pose severe personnel hazards.",
      idea: "Create an autonomous edge-sensing telemetry rig deployed along critical conveyor return and drive pulleys that continuously measures acoustic vibrations, joint thickness profiles, and belt wander to flag joint fatigue early.",
      architecture: "Distributed Pulley Sensor Nodes (ESP32) → Local Industrial Gateway → Real-time Signal Processing Engine (Python) → Time-series Ingestion Service → Web-based Control Room HMI (React).",
      technology: "ESP32 edge hardware, high-resolution optical and magnetic position sensors, Python digital signal processing (DSP) libraries, WebSockets for instant telemetry streaming, React 19 interactive belt visualization.",
      implementation: "Engineered signature-matching filters to isolate the cyclical passage of belt splices from ambient rock impact noise. Built an interactive visualizer mapping the belt loop in 2D with real-time anomaly heatmaps.",
      results: "Demonstrated early anomaly detection for simulated belt joint delamination, providing maintenance teams with actionable warning alerts before full belt tearing occurs.",
      futureScope: "Integration of optical machine vision cameras with edge tensor accelerators for surface tear classification in dusty environments."
    }
  },
  {
    id: "synthetix-hr",
    number: "05",
    title: "Synthetix HR",
    category: "AI • HR Technology • Resume Intelligence",
    tagline: "Explainable AI-powered resume screening assistant",
    description: "An explainable AI-powered resume screening assistant designed to help recruiters analyze resumes more efficiently while improving transparency and mitigating hidden bias in candidate evaluations.",
    technologies: [
      "React",
      "Node.js",
      "Python",
      "AI APIs",
      "PDF Processing",
      "Vector Search",
      "Explainable Scoring"
    ],
    features: [
      "Structured multi-page PDF & document resume parsing",
      "Semantic skill taxonomy extraction",
      "Explainable candidate-job fit scoring with rubric breakdowns",
      "Candidate ranking with transparent rationale",
      "Hidden-text & white-font prompt injection detection",
      "Demographic bias-awareness & fairness checks",
      "Interactive recruiter candidate comparison dashboard"
    ],
    caseStudy: {
      problem: "Traditional ATS systems rely on naive keyword matching, which penalizes qualified candidates who use differing phrasing and encourages 'keyword stuffing'. Meanwhile, black-box AI tools fail to explain why a candidate was ranked.",
      idea: "Build an explainable resume intelligence tool that extracts deep semantic competencies, detects malicious prompt injections / hidden white text, and produces clear, human-understandable scoring rationales for hiring managers.",
      architecture: "Client PDF Upload → Node.js Secure Document Pipeline → PDF Extract Engine (pdf-parse / PyMuPDF) → Python Semantic Embeddings & LLM Reasoning Engine → Vector Cosine Similarity & Keyword Fallback → Interactive React Scoring UI.",
      technology: "React, Tailwind, Node.js API, Python FastAPI microservice, OpenAI / OpenRouter embeddings and LLM reasoning, Vector similarity ranking, robust regex hygiene routines.",
      implementation: "Developed a multi-stage evaluation pipeline: first extracting verified technical and soft skills, then detecting hidden text manipulation attempts, and finally generating a point-by-point explainability card detailing exact strengths and gaps against the job description.",
      results: "Accelerated resume review cycles while providing hiring teams with 100% transparent audit trails for candidate shortlisting.",
      futureScope: "Multi-language resume support and automated blind-screening mode that strips all demographic identifiers before evaluation."
    }
  },
  {
    id: "sentinel",
    number: "06",
    title: "Sentinel",
    category: "Space Technology • AI • Risk Analysis",
    tagline: "Conceptual space-debris & orbital-risk mitigation system",
    description: "A conceptual space-debris and orbital-risk mitigation system focused on monitoring low Earth orbit objects, evaluating conjunction risks, and supporting safer space flight operations.",
    technologies: [
      "Three.js",
      "React",
      "Python",
      "AI / Risk Algorithms",
      "Orbital Mechanics",
      "WebGL",
      "Telemetry"
    ],
    features: [
      "Interactive Low Earth Orbit (LEO) object tracker visualizer",
      "Conjunction risk probability calculation matrix",
      "Two-Line Element (TLE) ephemeris propagation modeling",
      "Debris trajectory projection & collision avoidance corridors",
      "Subtle, scientifically grounded 3D orbital canvas",
      "Automated collision risk alerting threshold",
      "Payload maneuvering fuel consumption trade-off insights"
    ],
    caseStudy: {
      problem: "The rapid exponential growth of commercial mega-constellations and millions of un-trackable space debris fragments in Low Earth Orbit threatens critical satellite communications, weather forecasting, and orbital safety.",
      idea: "Create a conceptual monitoring interface and risk evaluation platform that visualizes orbital object distributions and computes conjunction probabilities using fast trajectory approximation models.",
      architecture: "Orbital Data Ingestion Pipeline → TLE SGP4 Propagation Model (Python) → Risk Matrix Evaluation Module → Lightweight WebGL / Three.js Visualizer (React) with real-time interactive camera controls.",
      technology: "Three.js for high-efficiency WebGL rendering, React for control overlays, Python for orbital math verification, custom GLSL shaders for subtle atmospheric glow and orbital path arcs.",
      implementation: "Engineered a performant 3D globe and orbital ring system that renders thousands of orbital points smoothly at 60 FPS without hogging system resources. Avoided excessive Hollywood sci-fi tropes in favor of clean, scientific editorial aesthetics.",
      results: "Provides an intuitive, elegant bird's-eye view of satellite density and orbital crossing corridors with instant risk score calculations.",
      futureScope: "Integrating live Space-Track API feeds and multi-satellite cooperative collision avoidance maneuvers."
    }
  }
];
