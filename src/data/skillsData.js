export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    shortTitle: "Frontend",
    description: "Crafting fluid, high-performance interfaces with modern component architectures and micro-interactions.",
    skills: [
      { name: "React", level: "Expert", desc: "Hooks, Concurrent Mode, State Architecture" },
      { name: "JavaScript", level: "Advanced", desc: "Modern ES6+, Async/Await, Web APIs" },
      { name: "HTML5", level: "Expert", desc: "Semantic Architecture, Web Accessibility" },
      { name: "CSS3", level: "Expert", desc: "Modern CSS, Flexbox, Grid, Glassmorphism" },
      { name: "Vite", level: "Advanced", desc: "Fast HMR, Build Optimization, Rollup" },
      { name: "Responsive UI", level: "Expert", desc: "Mobile-first, Adaptive Layouts" },
      { name: "Animations", level: "Advanced", desc: "Micro-interactions, 60fps transitions" },
      { name: "Framer Motion", level: "Advanced", desc: "Gesture Physics, Layout Animations" }
    ]
  },
  {
    id: "backend",
    title: "Backend & Systems",
    shortTitle: "Backend",
    description: "Architecting resilient RESTful APIs, microservices, and asynchronous event pipelines.",
    skills: [
      { name: "Node.js", level: "Advanced", desc: "Event-driven runtime, Streams, Event Loops" },
      { name: "Express.js", level: "Advanced", desc: "Middleware pipelines, REST architectures" },
      { name: "Python", level: "Advanced", desc: "Scripting, Data processing, Automation" },
      { name: "FastAPI", level: "Advanced", desc: "High-performance async APIs, Pydantic" },
      { name: "REST APIs", level: "Expert", desc: "Resource modeling, Versioning, Idempotency" },
      { name: "Authentication", level: "Advanced", desc: "Session mgmt, OAuth2, RBAC" },
      { name: "JWT", level: "Advanced", desc: "Stateless security, Token rotation" }
    ]
  },
  {
    id: "database",
    title: "Database & Cloud",
    shortTitle: "Database & Cloud",
    description: "Designing reliable data models, real-time stores, and secure cloud storage layers.",
    skills: [
      { name: "MongoDB", level: "Advanced", desc: "Document schemas, Aggregations, Indexing" },
      { name: "PostgreSQL", level: "Advanced", desc: "Relational modeling, ACID compliance" },
      { name: "Supabase", level: "Advanced", desc: "Postgres backend, Realtime subscriptions" },
      { name: "Database Design", level: "Advanced", desc: "Normalization, Constraints, Performance" },
      { name: "RLS", level: "Advanced", desc: "Row Level Security policies & authorization" },
      { name: "API Integration", level: "Expert", desc: "Third-party services, Webhooks, SDKs" }
    ]
  },
  {
    id: "ai-ml",
    title: "AI / ML & Intelligence",
    shortTitle: "AI / ML",
    description: "Bridging mathematical intelligence into practical, user-facing applications and edge devices.",
    skills: [
      { name: "Python ML", level: "Advanced", desc: "Data modeling, Feature engineering" },
      { name: "Machine Learning", level: "Advanced", desc: "Supervised & Unsupervised models" },
      { name: "AI APIs", level: "Expert", desc: "LLM endpoints, Vision & Embeddings" },
      { name: "LLM Integration", level: "Advanced", desc: "Prompt engineering, RAG pipelines" },
      { name: "TinyML", level: "Specialized", desc: "Quantized edge inference on MCUs" },
      { name: "AI-assisted Apps", level: "Expert", desc: "Intelligent UX, Generative workflows" },
      { name: "Predictive Systems", level: "Advanced", desc: "Anomaly detection, Time-series forecasting" }
    ]
  },
  {
    id: "iot",
    title: "IoT & Embedded Systems",
    shortTitle: "IoT / Embedded",
    description: "Connecting physical sensors, microcontrollers, and hardware telemetry directly to the cloud.",
    skills: [
      { name: "ESP32", level: "Expert", desc: "Dual-core FreeRTOS, WiFi & BLE stacks" },
      { name: "IoT Architecture", level: "Expert", desc: "Edge-to-cloud protocols, MQTT, WebSockets" },
      { name: "Sensors", level: "Expert", desc: "Analog/Digital interfacing, ADC sampling" },
      { name: "CT Current Sensing", level: "Specialized", desc: "SCT-013 non-invasive power analysis" },
      { name: "MPU6050", level: "Specialized", desc: "6-DoF accelerometer/gyroscope I2C bus" },
      { name: "Temperature Sensors", level: "Advanced", desc: "DS18B20 1-Wire, NTC thermistors" },
      { name: "Embedded Systems", level: "Advanced", desc: "Hardware interrupts, Power budgeting" },
      { name: "Telemetry", level: "Advanced", desc: "Timescale streaming, Edge compression" }
    ]
  },
  {
    id: "tools",
    title: "Developer Tools & DevOps",
    shortTitle: "Tools",
    description: "Harnessing modern developer ecosystems, source control, and zero-downtime deployment workflows.",
    skills: [
      { name: "Git", level: "Expert", desc: "Branching strategies, Interactive rebasing" },
      { name: "GitHub", level: "Expert", desc: "CI/CD Actions, Pull Requests, Code reviews" },
      { name: "VS Code", level: "Expert", desc: "Customized debugging, Extensions, Terminal" },
      { name: "REST Clients", level: "Expert", desc: "Postman, Curl, API contract verification" },
      { name: "Vercel", level: "Advanced", desc: "Serverless deployments, Edge functions" },
      { name: "Cloud Deployment", level: "Advanced", desc: "Environment management, Domains, SSL" }
    ]
  }
];
