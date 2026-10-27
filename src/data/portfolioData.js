/**
 * SURYA V M — PORTFOLIO DATA CONFIGURATION
 * Single source of truth for profile, projects, articles, experiments, services, and metadata.
 * Editable, strictly verified data adhering to project requirements.
 */

export const profileConfig = {
  name: "Surya V M",
  initials: "SVM",
  title: "Developer, Technology Innovator & Founder",
  subtitle: "Full-Stack Software • AI & Predictive Systems • AIoT Hardware Prototypes",
  portfolioUrl: "https://surya.signbridge.click",
  company: "SignBridge",
  companyUrl: "https://signbridge.click",
  githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
  linkedinUrl: "https://linkedin.com/in/suryamuruganvijayalakshmi",
  email: "vmsurya2007@gmail.com",
  phone: "+91 98422 53267",
  location: "Tamil Nadu, India",
  availability: "NOV 2026 // OPEN FOR PROJECTS",
  heroVideoUrl: "/hero-developer.mp4",
  
  bio: `I am a software developer, technology innovator, and founder of SignBridge based in Tamil Nadu, India. Currently pursuing my B.E. in Computer Science and Engineering (Artificial Intelligence & Machine Learning) at M. Kumarasamy College of Engineering (Class of 2029). I build full-stack web platforms, develop intelligent machine learning systems, and engineer physical AIoT prototypes like EcoClamp (industrial machine monitoring) and FarmCargo (predictive agricultural procurement).`,
  
  education: {
    degree: "B.E. Computer Science and Engineering (AI & ML)",
    institution: "M. Kumarasamy College of Engineering",
    expectedYear: "2029",
    focus: "Artificial Intelligence, Machine Learning, Embedded IoT Systems, Software Architecture"
  },

  skills: {
    languages: ["Java", "JavaScript", "TypeScript", "Python", "C", "C++"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion", "GSAP"],
    backend: ["Node.js", "Express.js", "REST APIs", "Microservices"],
    databases: ["Supabase", "PostgreSQL", "MongoDB"],
    aiIot: ["AI/ML", "Predictive Analytics", "AIoT", "Embedded Systems", "ESP32", "SCT-013", "TinyML"],
    toolsCloud: ["Git", "GitHub", "Cloudflare", "Vercel", "Vite", "Automation"]
  },

  achievements: [
    { title: "Kalam Awards", detail: "Project Participation, 2026", year: "2026" },
    { title: "Tata Crucible", detail: "Campus Ambassador", year: "2025–2026" },
    { title: "HackerRank Frontend Developer (React)", detail: "Verified Certification", year: "2026" },
    { title: "Claude Code 101", detail: "Certificate", year: "2026" },
    { title: "Published Author", detail: "The AI Wake-Up Call", year: "Published Book" },
    { title: "Published Author", detail: "The Celestial Odyssey of NASA Through Time and Space", year: "Published Book" }
  ]
};

export const featuredProjects = [
  {
    id: "signbridge",
    index: "01",
    totalCount: "05",
    title: "SignBridge",
    category: "Startup • Technology Communication & Products",
    tag: "W/FOUNDER",
    year: "2026",
    role: "Founder & CEO",
    liveUrl: "https://signbridge.click",
    githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
    tagline: "Venture studio & platform for practical digital products & initiatives",
    summary: "SignBridge is my startup and technology-building platform focused on engineering practical, scalable digital products, high-impact software, and real-world technology solutions.",
    problem: "Real-world problems in industry, agriculture, and workflow automation often lack pragmatic, accessible technology solutions. Many tools remain purely theoretical research exercises rather than working, field-deployable products.",
    solution: "Founded SignBridge as an agile startup venture dedicated to identifying friction points, engineering practical prototypes, and shipping robust full-stack software and AIoT hardware systems.",
    technicalApproach: "Engineered scalable cloud delivery, modern reactive frontends, lightweight API microservices, and rapid edge prototyping frameworks with continuous feedback loops.",
    technologies: ["React.js", "Node.js", "Cloudflare", "Vercel", "AI APIs", "Responsive Web Architecture", "Product Engineering"],
    contribution: "Led product ideation, architecture, system development, branding, testing, and production deployment under the SignBridge initiative.",
    status: "Active Startup Venture & Production Platform (https://signbridge.click)",
    isProductionLive: true,
    visualType: "startup"
  },
  {
    id: "ecoclamp-iot",
    index: "02",
    totalCount: "05",
    title: "EcoClamp",
    category: "AIoT • Industrial Intelligence • Energy Conservation",
    tag: "AIoT // HARDWARE",
    year: "2026",
    role: "Project Lead / Developer",
    liveUrl: "https://ecoclamp.vercel.app",
    githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
    tagline: "Non-invasive machine energy intelligence & anomaly detection",
    summary: "An AIoT Smart Resource Conservation and Industrial Energy Intelligence Platform designed to monitor machine energy behavior and identify abnormal operating conditions before catastrophic equipment failures occur.",
    problem: "Industrial electric motors and factory machinery experience unforeseen breakdowns due to bearing degradation, shaft misalignment, and thermal overloading. Traditional vibration analysis tools require invasive installation and expensive manual technician routines.",
    solution: "Created a non-invasive AIoT clamp monitoring system powered by ESP32 that measures electrical current signatures, 3-axis vibration FFTs, and surface temperatures without interrupting active production lines.",
    technicalApproach: "Dual-core ESP32 micro-controller architecture: Core 1 executes high-speed ADC sampling on current transformers (SCT-013) and I2C vibration reads (MPU6050); Core 0 handles network telemetry. Sensor data feeds adaptive baseline algorithms to detect harmonic distortions and abnormal vibration peaks.",
    technologies: ["ESP32", "SCT-013 Current Sensor", "MPU6050 (3-Axis Vibration)", "DS18B20 Temp", "C++ / FreeRTOS", "React 19", "Node.js", "Supabase", "TinyML (Planned)"],
    contribution: "Designed non-invasive hardware integration, firmware data collection routines, anomaly calculation algorithms, and the real-time telemetry dashboard.",
    status: "Implemented: Hardware prototype, sensor telemetry pipeline, baseline learning & web dashboard. Planned: On-chip quantized TinyML autoencoders for offline edge inference.",
    isProductionLive: true,
    visualType: "aiot"
  },
  {
    id: "farmcargo",
    index: "03",
    totalCount: "05",
    title: "FarmCargo",
    category: "AI • Agricultural Logistics • Predictive Procurement",
    tag: "AGRITECH // AI",
    year: "2026",
    role: "Project Lead / Developer",
    liveUrl: "https://signbridge.click",
    githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
    tagline: "Anticipating crop arrivals, receiving capacity & procurement coordination",
    summary: "An agricultural procurement operations and logistics coordination platform focused on anticipating crop arrivals, when and where crops should be received, receiving capacity, resource requirements, and coordination between procurement centres, storage, and milling operations.",
    problem: "Agricultural procurement faces severe supply volatility, bottlenecked receiving centres, and spoilage due to unpredictable harvest influxes. Traditional software simply acts as a static farmer registration ledger rather than an operational coordination engine.",
    solution: "Designed FarmCargo as a predictive procurement operations platform that forecasts arrival schedules, balances collection centre capacity, and provides actionable logistics resource guidance to procurement teams.",
    technicalApproach: "Time-series predictive models combine historical yield curves, regional harvesting schedules, and localized transport estimates. Built with an offline-first data model to ensure rural intake points can capture intake receipts without uninterrupted internet connectivity.",
    technologies: ["React.js", "Node.js", "Python Analytics", "PostgreSQL", "Supabase", "Offline-first IndexedDB", "REST APIs"],
    contribution: "Designed system architecture, predictive procurement workflows, centre capacity allocation logic, and the operations coordination dashboard.",
    status: "Prototype architecture implemented; operational capacity algorithms and intake tracking designed. Planned: Satellite crop maturity data integration.",
    isProductionLive: false,
    visualType: "agritech"
  },
  {
    id: "sentinel",
    index: "04",
    totalCount: "05",
    title: "SENTINEL",
    category: "Space Tech • Autonomous Orbital Safety • Debris Mitigation",
    tag: "ORBITAL // SIM",
    year: "2026",
    role: "System Architect & Simulation Developer",
    liveUrl: null,
    githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
    tagline: "Autonomous orbital mission workflow, collision risk assessment & satellite rescue simulation",
    summary: "An autonomous orbital safety, satellite rescue, and debris mitigation concept presenting an autonomous mission workflow, orbital tracking, trajectory risk assessment, and simulation architecture.",
    problem: "Low Earth Orbit (LEO) orbital density is escalating rapidly with thousands of decommissioned satellites and debris fragments, endangering critical communication constellations and crewed stations.",
    solution: "Engineered SENTINEL as a conceptual mission architecture and software simulation framework that models autonomous rendezvous, proximity risk estimation, capture trajectory calculations, and satellite deorbit protocols.",
    technicalApproach: "Simulation environment implementing orbital mechanics (Two-Body & J2 perturbation models), state vector propagation, relative coordinate docking maneuvers (Clohessy-Wiltshire equations), and automated sensor-fusion collision probability assessments.",
    technologies: ["Python Orbital Simulators", "Three.js / WebGL Visualizer", "Mathematical Modeling", "Kinematic Trajectory Solvers", "React UI"],
    contribution: "Formulated the mission workflow architecture, developed orbital trajectory simulation code, and created interactive ground-station telemetry visualizers.",
    status: "Software simulation & ground prototype architecture verified. Note: Software simulations and ground-based prototypes are distinct from actual spaceborne operations.",
    isProductionLive: false,
    visualType: "space"
  },
  {
    id: "merryberry",
    index: "05",
    totalCount: "05",
    title: "Merry Berry",
    category: "Interactive Web • Culinary Brand Experience",
    tag: "W/OFF+BRAND",
    year: "2026",
    role: "Creative Developer & UI Designer",
    liveUrl: "https://merry-berry.vercel.app",
    githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
    tagline: "Cinematic interactive ice-cream cafe website concept & product storytelling",
    summary: "An interactive ice-cream cafe website concept featuring cinematic food photography, vibrant fruit-inspired palettes, playful purple accents, oversized editorial typography, smooth scrolling, and scroll-controlled product storytelling.",
    problem: "Traditional artisan food and cafe websites often rely on static PDF menus or generic WordPress templates that fail to convey the sensory excitement and visual artistry of handcrafted desserts.",
    solution: "Engineered an award-caliber digital concept for Merry Berry that turns menu browsing into a kinetic culinary adventure with smooth parallax, tactile product interactions, and rich visual flavor profiles.",
    technicalApproach: "Built with fluid WebGL canvas shaders, Lenis inertial smooth scroll, and GSAP scroll triggers that reveal flavor notes and fruit textures in sync with user scrolling.",
    technologies: ["React.js", "GSAP ScrollTrigger", "Framer Motion", "Tailwind CSS", "Canvas Effects", "Responsive Web"],
    contribution: "Crafted interactive creative direction, custom typography treatments, animation choreographies, and responsive layout architecture.",
    status: "Interactive digital concept live at https://merry-berry.vercel.app.",
    isProductionLive: true,
    visualType: "culinary"
  }
];

export const editableArticles = [
  {
    id: "practical-aiot-edge-baselines",
    number: "Nº01",
    title: "Practical AIoT: From ESP32 Sensor Pods to Industrial Predictive Baselines",
    category: "Hardware & Edge AI",
    date: "OCT 2026",
    readTime: "6 MIN READ",
    status: "Draft",
    toc: [
      { id: "the-industrial-blindspot", title: "1. The Industrial Blindspot" },
      { id: "non-invasive-sensing", title: "2. Non-Invasive Sensor Architecture" },
      { id: "baseline-learning", title: "3. Adaptive Baseline Learning" },
      { id: "future-tinyml", title: "4. Future: On-Chip TinyML Autoencoders" }
    ],
    content: [
      {
        sectionId: "the-industrial-blindspot",
        heading: "The Industrial Blindspot",
        paragraphs: [
          "In manufacturing and processing plants, electric motors drive virtually every mechanical operation. Yet the vast majority of medium-sized industrial equipment is run to failure or inspected on rigid periodic schedules. When a bearing fails unexpectedly, factory downtime costs accumulate by the minute.",
          "Most commercial predictive maintenance solutions require invasive rewiring, machine shutdowns during installation, and expensive proprietary gateways that small and mid-scale operations cannot justify."
        ]
      },
      {
        sectionId: "non-invasive-sensing",
        heading: "Non-Invasive Sensor Architecture",
        paragraphs: [
          "With EcoClamp, our engineering requirement was absolute zero-downtime installation. By combining split-core current transformers (SCT-013) that clamp around existing insulated lines with MPU6050 3-axis vibration accelerometers magnetically coupled to the motor housing, we capture vital mechanical and electrical health signatures.",
          "The dual-core ESP32 micro-controller executes ADC sampling on Core 1 at consistent kilohertz intervals, computing root-mean-square (RMS) current and peak-to-peak vibration amplitudes before streaming aggregated metrics via Core 0."
        ]
      },
      {
        sectionId: "baseline-learning",
        heading: "Adaptive Baseline Learning",
        paragraphs: [
          "Because every factory machine has individual operational characteristics depending on mounting stiffness and duty cycle, static alert thresholds result in rampant false positives.",
          "We implemented machine-specific baseline profiling: the system records normal operating signatures over a 48-hour warm-up window, computing standard deviations across current draw and vibration harmonics. Any sustained deviation triggers an early-warning advisory long before thermal limits are breached."
        ]
      },
      {
        sectionId: "future-tinyml",
        heading: "Future: On-Chip TinyML Autoencoders",
        paragraphs: [
          "Our ongoing research centers on quantizing neural autoencoder models to run directly inside the ESP32's SRAM. By training the autoencoder on normal vibration reconstructions, reconstruction error becomes a continuous, zero-latency anomaly metric calculated entirely at the edge without cloud dependency."
        ]
      }
    ]
  },
  {
    id: "predictive-agri-procurement",
    number: "Nº02",
    title: "Predictive Operations in Agriculture: Beyond Static Registries to Intake Intelligence",
    category: "AgriTech & Supply Chain",
    date: "AUG 2026",
    readTime: "7 MIN READ",
    status: "Draft",
    toc: [
      { id: "the-procurement-bottleneck", title: "1. The Procurement Bottleneck" },
      { id: "arrival-forecasting", title: "2. Anticipating Crop Arrival Windows" },
      { id: "centre-capacity", title: "3. Capacity Allocation & Logistics" },
      { id: "offline-first-reality", title: "4. The Offline-First Imperative" }
    ],
    content: [
      {
        sectionId: "the-procurement-bottleneck",
        heading: "The Procurement Bottleneck",
        paragraphs: [
          "Most digital agriculture platforms focus strictly on farmer registration databases or consumer marketplaces. But the most critical breakdown in agricultural supply chains occurs at the procurement collection center.",
          "When hundreds of farmers bring perishable harvests on the same day without advance coordination, collection centers overflow, trucks wait for hours, and produce spoils in holding yards."
        ]
      },
      {
        sectionId: "arrival-forecasting",
        heading: "Anticipating Crop Arrival Windows",
        paragraphs: [
          "FarmCargo was conceptualized to solve this operational blindspot. Rather than waiting for produce to arrive at the gate, our system models sowing dates, regional rainfall patterns, and harvest maturation timelines to generate probabilistic arrival windows for specific procurement catchments.",
          "Coordinators receive a 10-day lookahead displaying expected crop tonnage, enabling them to pre-arrange jute bags, weighing staff, and transportation capacity."
        ]
      },
      {
        sectionId: "centre-capacity",
        heading: "Capacity Allocation & Logistics",
        paragraphs: [
          "By visualizing milling schedules alongside collection depot capacities, FarmCargo balances intake across regional centers. If Center A is operating at 90% storage capacity, inbound batches can be dynamically rerouted to Center B with available transit slots."
        ]
      },
      {
        sectionId: "offline-first-reality",
        heading: "The Offline-First Imperative",
        paragraphs: [
          "Rural collection yards frequently suffer from intermittent cellular coverage. FarmCargo employs an offline-first progressive web architecture using IndexedDB caching. Field operators record intake weights, moisture levels, and lot numbers without connectivity, with automated conflict-free sync once network access resumes."
        ]
      }
    ]
  },
  {
    id: "founder-engineer-playbook",
    number: "Nº03",
    title: "The Founder-Engineer Playbook: Bootstrapping Hardware-Software Ventures",
    category: "Product & Startups",
    date: "JAN 2026",
    readTime: "5 MIN READ",
    status: "Draft",
    toc: [
      { id: "building-signbridge", title: "1. The Genesis of SignBridge" },
      { id: "hardware-meets-software", title: "2. Bridging Code and Physical Reality" },
      { id: "pragmatic-prototyping", title: "3. Rapid Functional Prototyping" },
      { id: "lessons-in-ownership", title: "4. Ownership, Curiosity & Execution" }
    ],
    content: [
      {
        sectionId: "building-signbridge",
        heading: "The Genesis of SignBridge",
        paragraphs: [
          "Starting SignBridge emerged from a simple realization: code has maximum impact when it directly interacts with the physical world. While pure SaaS products are valuable, the intersection of embedded hardware, telemetry, and intelligent web interfaces represents a massive frontier for real problem-solving.",
          "As Founder & CEO, my focus is moving beyond theoretical student projects into tangible, verifiable technology platforms."
        ]
      },
      {
        sectionId: "hardware-meets-software",
        heading: "Bridging Code and Physical Reality",
        paragraphs: [
          "Full-stack development takes on a whole new dimension when your data source isn't just a REST endpoint or database query, but an analog-to-digital converter reading micro-voltages from a CT sensor clamp.",
          "Understanding hardware limitations—sampling noise, transmission packet loss, power constraints—makes you a significantly stronger software engineer."
        ]
      },
      {
        sectionId: "pragmatic-prototyping",
        heading: "Rapid Functional Prototyping",
        paragraphs: [
          "Avoid premature optimization. The quickest path to validating a product is building a functioning proof-of-concept with off-the-shelf development boards and clean, modern web dashboards. If the core value proposition works with breadboards and WebSockets, you have something worth scaling."
        ]
      },
      {
        sectionId: "lessons-in-ownership",
        heading: "Ownership, Curiosity & Execution",
        paragraphs: [
          "Whether authoring books on AI and space exploration or writing firmware routines at 2 AM, the common thread is deep curiosity and relentless execution. The ability to learn any technology stack quickly is the most vital skill in modern engineering."
        ]
      }
    ]
  }
];

export const labExperiments = [
  {
    id: "dynamic-scroll",
    number: "01",
    totalCount: "09",
    name: "Dynamic Scroll",
    category: "Scroll Physics & Parallax",
    description: "Scroll-linked kinematic movement with perspective warping and velocity decay.",
    technologies: ["React", "Framer Motion", "Lenis Physics"],
    status: "Active Interactive"
  },
  {
    id: "rotating-gallery",
    number: "02",
    totalCount: "09",
    name: "Rotating Gallery",
    category: "3D Spatial Perspective",
    description: "Interactive 3D carousel responding to pointer drag with momentum and depth scaling.",
    technologies: ["CSS 3D Transforms", "Pointer Events", "Spring Physics"],
    status: "Active Interactive"
  },
  {
    id: "paste-up",
    number: "03",
    totalCount: "09",
    name: "Paste-Up",
    category: "Tactile Desktop Layering",
    description: "Draggable, layered tactile cards with bring-to-front z-indexing and physical paper bounce.",
    technologies: ["Framer Motion Drag", "Z-Index Management", "Haptic Sound"],
    status: "Active Interactive"
  },
  {
    id: "vocal-orb",
    number: "04",
    totalCount: "09",
    name: "Vocal Orb",
    category: "Audio Reactive WebGL",
    description: "Real-time frequency-responsive shader sphere driven by live microphone input.",
    technologies: ["Web Audio API", "AnalyserNode", "Canvas 2D / WebGL"],
    status: "Permission Requested On-Demand"
  },
  {
    id: "live-cursors",
    number: "05",
    totalCount: "09",
    name: "Live Cursors",
    category: "Realtime Multi-Client Presence",
    description: "Multi-user cursor synchronization with animated name tags and presence broadcasting.",
    technologies: ["Supabase Realtime / WebSocket", "Zustand", "Pointer Broadcasting"],
    status: "Multi-tab Live Sync"
  },
  {
    id: "rotary-dial",
    number: "06",
    totalCount: "09",
    name: "Dial",
    category: "Physical Skeuomorphic Control",
    description: "Tactile rotary potentiometer with angle snapping, detent ticks, and parametric value control.",
    technologies: ["Polar Coordinates", "Trigonometry", "Audio Synthesis"],
    status: "Active Interactive"
  },
  {
    id: "polka-dots",
    number: "07",
    totalCount: "09",
    name: "Polka Dots",
    category: "Generative Halftone Matrix",
    description: "Pointer-repelling halftone dot array simulating physical offset lithography printing.",
    technologies: ["Canvas 2D Context", "Vector Distances", "Decay Physics"],
    status: "Active Interactive"
  },
  {
    id: "kinetic-heart",
    number: "08",
    totalCount: "09",
    name: "Heart",
    category: "Parametric Curve Pulse",
    description: "Interactive cardiod geometric pulse with harmonic oscillations on pointer interaction.",
    technologies: ["Parametric Curves", "SVG Morphing", "Spring Physics"],
    status: "Active Interactive"
  },
  {
    id: "three-orbit",
    number: "09",
    totalCount: "09",
    name: "Three.js Scene",
    category: "3D WebGL Environment",
    description: "Lightweight, GPU-optimized procedural orbital node simulation with camera controls.",
    technologies: ["Three.js", "WebGL", "Procedural Geometry"],
    status: "Lazy Loaded"
  }
];

export const studioServices = [
  {
    id: "web-dev",
    number: "01",
    title: "Website Development",
    description: "High-performance, editorial digital experiences with custom design systems, responsive architecture, and SEO excellence.",
    deliverables: ["Custom Digital Portfolios", "Interactive Corporate Sites", "Responsive Web Apps", "Performance Optimization"]
  },
  {
    id: "interactive-frontend",
    number: "02",
    title: "Interactive Frontend Development",
    description: "Award-caliber interactive interfaces utilizing smooth physics, micro-animations, 3D WebGL scenes, and tactile controls.",
    deliverables: ["Framer Motion & GSAP Orchestration", "Three.js 3D Environments", "Kinetic Typography", "Custom Interactive Controls"]
  },
  {
    id: "fullstack-apps",
    number: "03",
    title: "Full-Stack Applications",
    description: "End-to-end web applications with robust backend APIs, secure database schemas, authentication, and continuous deployment.",
    deliverables: ["Node.js / Express Services", "Supabase & PostgreSQL Integration", "RESTful & Realtime APIs", "Cloudflare & Vercel Architecture"]
  },
  {
    id: "iot-embedded",
    number: "04",
    title: "IoT & Embedded Prototypes",
    description: "Physical hardware prototyping connecting micro-controllers (ESP32), sensors, and edge telemetry to real-time dashboards.",
    deliverables: ["ESP32 Firmware Development", "Sensor Interfacing (SCT-013, MPU6050)", "Hardware-to-Cloud Telemetry", "Non-invasive Retrofits"]
  },
  {
    id: "ai-software",
    number: "05",
    title: "AI-Enabled Software Prototypes",
    description: "Integrating intelligent machine learning models, predictive time-series forecasting, and natural language agents into products.",
    deliverables: ["Predictive Analytics Pipelines", "Time-series Anomaly Detection", "LLM Reasoning Agents", "Data Ingestion Systems"]
  },
  {
    id: "tech-product",
    number: "06",
    title: "Technical Product Development",
    description: "From concept ideation and prototype architecture to testing, iteration, and shipping minimum viable products.",
    deliverables: ["Product Architecture Design", "Fast Prototyping Cycles", "Technical Feasibility Analysis", "Startup MVP Roadmapping"]
  }
];

export const audioConfig = {
  defaultTrack: {
    title: "Analog Desk Session // Low-Fi Workspace",
    artist: "Surya V M Studio",
    duration: "02:45",
    audioSrc: "" // Local audio synthesized or loaded on user gesture
  }
};


