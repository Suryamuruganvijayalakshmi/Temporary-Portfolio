export const projects = [
  {
    id: "signbridge",
    number: "01",
    totalCount: "04",
    title: "SignBridge",
    category: "Startup • Technology Communication & Products",
    tagline: "Venture studio & platform for practical digital products & initiatives",
    year: "2025 – Present",
    role: "Founder & CEO",
    link: "https://signbridge.click/",
    githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
    isStartup: true,
    description: "SignBridge is my startup and technology-building platform focused on engineering practical, scalable digital products, high-impact software, and real-world technology solutions.",
    technologies: [
      "Full-Stack Web",
      "React.js",
      "Node.js",
      "Cloud Architecture",
      "Vercel",
      "Cloudflare",
      "Product Strategy"
    ],
    features: [
      "Central startup & digital product ecosystem",
      "Ultra-responsive modern web application architecture",
      "Integrated software pipelines from prototyping to cloud delivery",
      "Parent platform for technology initiatives including EcoClamp and FarmCargo",
      "Live production site: https://signbridge.click"
    ],
    caseStudy: {
      problem: "Real-world problems in industry, agriculture, and automation often lack pragmatic, accessible technology solutions. Many tools remain purely theoretical research exercises rather than working, field-deployable products.",
      idea: "Founded SignBridge as an agile startup venture dedicated to identifying friction points, engineering practical prototypes, and shipping robust full-stack software and AIoT hardware systems.",
      architecture: "Microservices-ready cloud infrastructure designed for low latency, secure user data handling, and scalable web delivery across devices.",
      technology: "React modern frontend, Node.js microservices, modern cloud hosting, JWT authentication, and automated continuous delivery pipelines.",
      implementation: "Bootstrapped from concept to production deployment. Led architectural design, frontend development, UX workflows, backend APIs, and product roadmapping under the SignBridge brand.",
      results: "Live at signbridge.click, serving as the launchpad and parent ecosystem for innovative software products and continuous experimentation.",
      futureScope: "Expanding the SignBridge suite to encompass next-generation real-time multi-modal communication and smart assistive interfaces."
    }
  },
  {
    id: "ecoclamp-iot",
    number: "02",
    totalCount: "04",
    title: "EcoClamp IoT",
    category: "AIoT • Industrial Intelligence • Energy Conservation",
    tagline: "Non-invasive machine energy intelligence & anomaly detection",
    year: "2026 – Present",
    role: "Project Lead / Developer",
    link: "https://ecoclamp.vercel.app/",
    githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
    description: "An AIoT industrial machine-monitoring and resource-conservation platform designed to monitor machine energy behavior and identify abnormal operating conditions before catastrophic equipment failures occur.",
    technologies: [
      "ESP32",
      "SCT-013 CT Sensor",
      "MPU6050 Vibration",
      "DS18B20 Temp",
      "React",
      "Node.js",
      "Supabase",
      "TinyML (Planned)"
    ],
    features: [
      "Non-invasive machine monitoring without halting factory lines",
      "Real-time CT current and harmonic load tracking",
      "MPU6050 3-axis vibration FFT frequency analysis",
      "Thermal boundary & temperature spike detection",
      "Machine-specific adaptive baseline learning",
      "Composite Machine Health Score (0–100%)",
      "Predictive maintenance early-warning alerts",
      "Energy conservation and idle power leakage insights"
    ],
    caseStudy: {
      problem: "Industrial electric motors and manufacturing machines frequently suffer from unexpected downtime caused by bearing wear, shaft misalignment, and thermal overload. Traditional vibration analysis tools are expensive, invasive, and require manual inspections.",
      idea: "Develop a plug-and-play, non-invasive clamp sensor pod (EcoClamp) powered by ESP32 that captures electrical current signatures, 3-axis vibration, and surface temperature, running edge baseline learning and streaming telemetry to a cloud dashboard for automated anomaly detection.",
      architecture: "Edge Sensor Pod (ESP32 + SCT-013 CT Sensor + MPU6050 I2C + DS18B20 Temp) → Secure MQTT/HTTPS Telemetry → Node.js Ingestion Gateway → Supabase Database & Timescale DB → Automated Baseline Scoring Pipeline → React Real-Time Dashboard.",
      technology: "ESP32 microcontrollers programmed in C++/FreeRTOS, SCT-013 current transformers, MPU6050 accelerometer/gyroscope, DS18B20 digital temperature sensors, Node.js streaming microservices, Supabase PostgreSQL, React interactive telemetry UI.",
      implementation: "Created high-frequency ADC sampling routines on ESP32 Core 1 while handling network telemetry on Core 0. Implemented moving-window RMS and peak-to-peak vibration algorithms. Built a cloud microservice that compares live metrics against machine-specific historical baselines to flag statistical deviations.",
      results: "Capable of detecting early rotor unbalance and anomalous current spikes up to 48 hours prior to mechanical threshold limits, allowing proactive maintenance scheduling and reducing unplanned factory downtime.",
      futureScope: "Deploying quantized TinyML autoencoders directly onto the ESP32 firmware for zero-latency offline inference in remote industrial zones without reliable internet connectivity."
    }
  },
  {
    id: "farmcargo",
    number: "03",
    totalCount: "04",
    title: "FarmCargo",
    category: "AI • Agricultural Logistics • Predictive Procurement",
    tagline: "Anticipating crop arrivals, receiving capacity & procurement coordination",
    year: "2026 – Present",
    role: "Project Lead / Developer",
    link: "https://signbridge.click",
    githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
    description: "An agricultural procurement operations and logistics coordination platform focused on anticipating crop arrivals, when and where crops should be received, receiving capacity, resource requirements, and coordination between procurement centres, storage, and milling operations.",
    technologies: [
      "React.js",
      "Node.js",
      "Python",
      "AI/ML",
      "PostgreSQL",
      "Supabase",
      "Offline-first PWA"
    ],
    features: [
      "Dynamic procurement planning and receiving capacity allocation",
      "Anticipating crop arrival windows and expected volumes",
      "Regional procurement-centre logistics coordination",
      "Receiving capacity vs. storage/milling coordination",
      "Offline-first data model for rural collection points",
      "Actionable operational recommendations for procurement teams"
    ],
    caseStudy: {
      problem: "Agricultural procurement suffers from severe supply volatility and lack of advance visibility into crop arrival times. When produce arrives unexpectedly, collection centres bottleneck, storage overflows, and crops spoil. Traditional tools act only as static farmer registration ledgers rather than operational logistics coordinators.",
      idea: "Create an intelligent procurement operations platform that anticipates crop arrivals weeks in advance, balances receiving capacities across regional centres, and provides real-time coordination with storage and milling operations.",
      architecture: "Field Officer Mobile Portals (Offline-first IndexedDB) → Python Analytics Engine (arrival estimation algorithms) → Node.js API Gateway → Supabase PostgreSQL → Centralized Operations Dashboard.",
      technology: "Frontend built with React and Tailwind for dense logistics monitoring. Backend powered by Node.js and Python for forecasting calculations. Supabase PostgreSQL for relational consistency and audit logging.",
      implementation: "Designed predictive models integrating localized harvest timelines and transport routes to project arrival windows. Created capacity allocation schedules for procurement centres to prevent intake gridlock.",
      results: "Provides procurement coordinators with advance foresight into intake volumes, enabling timely resource allocation (transport trucks, weighing staff, storage space).",
      futureScope: "Integrating satellite crop health index (NDVI) feeds and cold-chain IoT temperature tracking for perishables in transit."
    }
  },
  {
    id: "sentinel",
    number: "04",
    totalCount: "04",
    title: "SENTINEL",
    category: "Space Tech • Autonomous Orbital Safety • Debris Mitigation",
    tagline: "Autonomous mission workflow, orbital tracking & risk-assessment simulation",
    year: "2026",
    role: "System Architect & Simulation Developer",
    link: null, // Software simulation concept
    githubUrl: "https://github.com/Suryamuruganvijayalakshmi",
    description: "An autonomous orbital safety, satellite rescue, and debris mitigation concept presenting an autonomous mission workflow, orbital tracking, trajectory risk assessment, and simulation architecture.",
    technologies: [
      "Python Orbital Simulators",
      "Three.js / WebGL",
      "Orbital Mechanics",
      "Kinematic Solvers",
      "React UI"
    ],
    features: [
      "Autonomous rendezvous & proximity operations simulation",
      "Two-body & J2 perturbation orbital mechanics solver",
      "Orbital collision probability & trajectory risk assessment",
      "Satellite deorbit capture protocol design",
      "Interactive 3D ground-station mission telemetry visualizer"
    ],
    caseStudy: {
      problem: "Low Earth Orbit (LEO) orbital density is escalating rapidly with thousands of decommissioned satellites and debris fragments, endangering critical communication constellations and crewed stations.",
      idea: "Design SENTINEL as a conceptual mission architecture and software simulation framework modeling autonomous orbital rendezvous, proximity risk estimation, capture trajectory calculations, and satellite deorbit protocols.",
      architecture: "Orbital Mechanics Mathematical Engine → State Vector Propagation Pipeline → Collision Probability Estimator → WebGL 3D Orbital Trajectory Visualizer.",
      technology: "Python orbital propagation scripts, Three.js WebGL visualizer, Clohessy-Wiltshire relative motion equations, React interactive telemetry dashboard.",
      implementation: "Formulated the mission workflow architecture, developed orbital trajectory simulation code, and created interactive ground-station telemetry visualizers. (Note: Software simulations and ground-based prototypes are clearly distinguished from actual spaceborne operations).",
      results: "Demonstrated simulated autonomous intercept trajectories and risk scoring for defunct LEO payloads under realistic perturbation models.",
      futureScope: "Hardware-in-the-loop rendezvous docking testbed and miniaturized optical star-tracker sensor interface."
    }
  }
];
