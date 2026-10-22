import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, Thermometer, ShieldCheck, AlertTriangle, Cpu, TrendingUp, Compass, CheckCircle2, RefreshCw, Satellite, Radio } from 'lucide-react';

// 1. EcoClamp IoT Interactive Telemetry Dashboard
export function EcoClampVisual() {
  const [current, setCurrent] = useState(14.2);
  const [vibration, setVibration] = useState(0.82);
  const [temperature, setTemperature] = useState(42.1);
  const [healthScore, setHealthScore] = useState(98.4);
  const [isAnomaly, setIsAnomaly] = useState(false);
  const [history, setHistory] = useState([14.1, 14.3, 14.2, 14.4, 14.2, 14.3, 14.1, 14.2]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isAnomaly) {
        const spike = +(22.5 + Math.random() * 3.5).toFixed(1);
        setCurrent(spike);
        setVibration(+(2.4 + Math.random() * 0.8).toFixed(2));
        setTemperature(prev => +(Math.min(68, prev + 0.4)).toFixed(1));
        setHealthScore(prev => +(Math.max(62, prev - 0.8)).toFixed(1));
        setHistory(prev => [...prev.slice(1), spike]);
      } else {
        const norm = +(14.0 + Math.random() * 0.5).toFixed(1);
        setCurrent(norm);
        setVibration(+(0.75 + Math.random() * 0.15).toFixed(2));
        setTemperature(prev => +(Math.max(41.5, prev - 0.2)).toFixed(1));
        setHealthScore(prev => +(Math.min(98.4, prev + 0.3)).toFixed(1));
        setHistory(prev => [...prev.slice(1), norm]);
      }
    }, 1200);
    return () => clearInterval(timer);
  }, [isAnomaly]);

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl font-mono text-xs select-none">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAnomaly ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAnomaly ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
          </span>
          <span className="font-semibold text-slate-200 tracking-wider">ECOCLAMP-NODE-01</span>
          <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">ESP32 • FREE_RTOS</span>
        </div>
        <button
          onClick={() => setIsAnomaly(!isAnomaly)}
          className={`px-2.5 py-1 rounded text-[11px] font-sans font-medium transition-all ${
            isAnomaly
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-iris-600/20 text-iris-300 border border-iris-500/40 hover:bg-iris-600/30'
          }`}
        >
          {isAnomaly ? 'Reset Baseline' : 'Simulate Load Anomaly'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="text-slate-400 flex items-center space-x-1.5 mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>CT CURRENT</span>
          </div>
          <div className="text-lg font-bold text-slate-100">{current} <span className="text-xs font-normal text-slate-400">A RMS</span></div>
          <div className="text-[10px] text-slate-500 mt-0.5">SCT-013 • 50Hz</div>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="text-slate-400 flex items-center space-x-1.5 mb-1">
            <Activity className="w-3.5 h-3.5 text-iris-400" />
            <span>VIBRATION</span>
          </div>
          <div className="text-lg font-bold text-slate-100">{vibration} <span className="text-xs font-normal text-slate-400">m/s²</span></div>
          <div className="text-[10px] text-slate-500 mt-0.5">MPU6050 3-Axis</div>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="text-slate-400 flex items-center space-x-1.5 mb-1">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span>CORE TEMP</span>
          </div>
          <div className="text-lg font-bold text-slate-100">{temperature} <span className="text-xs font-normal text-slate-400">°C</span></div>
          <div className="text-[10px] text-slate-500 mt-0.5">DS18B20 1-Wire</div>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="text-slate-400 flex items-center space-x-1.5 mb-1">
            {isAnomaly ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
            <span>HEALTH</span>
          </div>
          <div className={`text-lg font-bold ${isAnomaly ? 'text-amber-400' : 'text-emerald-400'}`}>
            {healthScore}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">{isAnomaly ? 'Anomaly Flagged' : 'Normal Baseline'}</div>
        </div>
      </div>

      {/* Real-time waveform visualizer */}
      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <div className="flex justify-between items-center text-[11px] text-slate-400 mb-2">
          <span>REAL-TIME CURRENT WAVEFORM (12s WINDOW)</span>
          <span className="text-iris-400">TELEMETRY: 200Hz SAMPLING</span>
        </div>
        <div className="h-16 flex items-end gap-1.5 pt-2">
          {history.map((val, idx) => {
            const heightPercent = Math.min(100, Math.max(15, ((val - 12) / 14) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t transition-all duration-500 ${
                    val > 18 ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-sm shadow-amber-500/50' : 'bg-gradient-to-t from-iris-700 to-iris-400 shadow-sm shadow-iris-500/30'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[9px] text-slate-500">{val}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 2. AgriFlow Interactive Supply & Procurement Visualizer
export function AgriFlowVisual() {
  const [selectedCrop, setSelectedCrop] = useState('Paddy (Grade A)');
  const [forecastDays, setForecastDays] = useState(14);

  const cropData = {
    'Paddy (Grade A)': { harvest: '4,280 MT', centerCapacity: '86%', confidence: '96.2%', trend: '+14% vs avg' },
    'Maize (Hybrid)': { harvest: '2,940 MT', centerCapacity: '72%', confidence: '94.8%', trend: '+8% vs avg' },
    'Wheat (Winter)': { harvest: '5,150 MT', centerCapacity: '91%', confidence: '97.5%', trend: '+19% vs avg' },
  };

  const active = cropData[selectedCrop];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-md font-sans text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            🌱
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">AgriFlow Predictive Procurement</h4>
            <p className="text-[11px] text-slate-500">Regional Supply Forecasting Engine</p>
          </div>
        </div>
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
          {Object.keys(cropData).map(crop => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                selectedCrop === crop
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {crop.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 font-mono">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
          <span className="text-[10px] text-slate-500">ESTIMATED YIELD</span>
          <div className="text-base font-bold text-slate-900 mt-0.5">{active.harvest}</div>
          <div className="text-[10px] text-emerald-600 font-sans font-medium mt-0.5">{active.trend}</div>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
          <span className="text-[10px] text-slate-500">CENTER INTAKE</span>
          <div className="text-base font-bold text-slate-900 mt-0.5">{active.centerCapacity}</div>
          <div className="text-[10px] text-slate-500 font-sans mt-0.5">Optimal Capacity</div>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
          <span className="text-[10px] text-slate-500">ML CONFIDENCE</span>
          <div className="text-base font-bold text-iris-600 mt-0.5">{active.confidence}</div>
          <div className="text-[10px] text-slate-500 font-sans mt-0.5">Prophet Model</div>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
          <span className="text-[10px] text-slate-500">FORECAST HORIZON</span>
          <div className="text-base font-bold text-slate-900 mt-0.5">{forecastDays} Days</div>
          <div className="text-[10px] text-slate-500 font-sans mt-0.5">Dynamic Window</div>
        </div>
      </div>

      {/* Interactive Forecast Slider */}
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60">
        <div className="flex justify-between items-center text-xs mb-2 text-slate-700">
          <span className="font-medium">Supply Allocation & Route Coordination</span>
          <span className="text-slate-500 font-mono text-[11px]">Adjust horizon: {forecastDays}d</span>
        </div>
        <input
          type="range"
          min="7"
          max="30"
          value={forecastDays}
          onChange={(e) => setForecastDays(Number(e.target.value))}
          className="w-full accent-iris-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
          <span>7 Days (Arrival Stage)</span>
          <span>14 Days (Collection Peak)</span>
          <span>30 Days (Regional Total)</span>
        </div>
      </div>
    </div>
  );
}

// 3. SignBridge Startup Ecosystem Visualizer
export function SignBridgeVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white via-iris-50/30 to-purple-50/20 border border-iris-200/80 shadow-lg font-sans">
      <div className="absolute top-0 right-0 w-44 h-44 bg-iris-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-iris-100 text-iris-800 border border-iris-300">
            <span className="w-1.5 h-1.5 rounded-full bg-iris-600 animate-pulse" />
            Active Startup Venture
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2 tracking-tight">SignBridge Ecosystem</h3>
          <p className="text-xs text-slate-600 mt-0.5">Software • Innovation • Products</p>
        </div>
        <a
          href="https://signbridge.click/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-iris-600 text-white hover:bg-iris-700 transition-colors shadow-sm flex items-center gap-1"
        >
          signbridge.click ↗
        </a>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mb-4">
        Serving as the primary technology-building venture and product incubator, SignBridge bridges communication barriers through accessible, high-performance web applications and assistive digital tools.
      </p>

      <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-200/70 text-center">
        <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-sm">
          <div className="text-[10px] text-slate-500">VENTURE ROLE</div>
          <div className="text-xs font-bold text-slate-900 mt-0.5">Founder & CEO</div>
        </div>
        <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-sm">
          <div className="text-[10px] text-slate-500">ARCHITECTURE</div>
          <div className="text-xs font-bold text-slate-900 mt-0.5">Micro-Cloud</div>
        </div>
        <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-sm">
          <div className="text-[10px] text-slate-500">LIVE ACCESS</div>
          <div className="text-xs font-bold text-iris-600 mt-0.5">Production</div>
        </div>
      </div>
    </div>
  );
}

// 4. BeltSentinel Conveyor Visualizer
export function BeltSentinelVisual() {
  const [speed, setSpeed] = useState(2.4);
  const [jointWear, setJointWear] = useState(12);

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono font-bold text-slate-200">BELTSENTINEL HMI</span>
          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">HEAVY INDUSTRY</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400">LINE: PRIMARY CONVEYOR B-04</span>
        </div>
      </div>

      {/* Simulated animated conveyor loop */}
      <div className="relative bg-slate-900/90 rounded-xl p-4 border border-slate-800 mb-4 overflow-hidden">
        <div className="flex justify-between items-center text-[11px] text-slate-400 mb-2 font-mono">
          <span>BELT MOTION VECTOR</span>
          <span className="text-cyan-400 font-semibold">{speed} m/s NOMINAL</span>
        </div>

        {/* Animated track lines */}
        <div className="h-10 bg-slate-950 rounded-lg border border-slate-800 relative flex items-center overflow-hidden px-2">
          <div className="absolute inset-0 flex items-center justify-around opacity-40">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-6 bg-cyan-500/30 rounded-sm transform skew-x-12 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <div className="z-10 flex items-center justify-between w-full px-4 text-[10px] font-mono text-slate-300">
            <span>[PULLEY DRIVE]</span>
            <span className="bg-slate-800/90 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">SPLICE JOINT S-12 OK</span>
            <span>[TENSION TAKE-UP]</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 font-mono">
        <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400">JOINT FATIGUE</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">{jointWear}% (Safe)</div>
        </div>
        <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400">TROUGH ANGLE</div>
          <div className="text-sm font-bold text-slate-200 mt-1">35.2° Balanced</div>
        </div>
        <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400">SHUTDOWN RISK</div>
          <div className="text-sm font-bold text-slate-300 mt-1">0.03 (Low)</div>
        </div>
      </div>
    </div>
  );
}

// 5. Synthetix HR Resume Intelligence Scanner
export function SynthetixHRVisual() {
  const [parsingStep, setParsingStep] = useState(3);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-md font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-iris-600 flex items-center justify-center font-bold">
            ⚡
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Synthetix HR Intelligence</h4>
            <p className="text-[11px] text-slate-500">Explainable Screening & Bias Mitigation</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-medium text-[11px] border border-emerald-200/60">
          Match Score: 94.2%
        </span>
      </div>

      <div className="space-y-2.5 mb-4">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="font-medium text-slate-800">Semantic Capability Match</span>
            <p className="text-[10px] text-slate-500">Vector cosine similarity on core architecture competencies</p>
          </div>
          <span className="font-mono font-bold text-iris-600">96 / 100</span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="font-medium text-slate-800">Adversarial & Hidden-Text Audit</span>
            <p className="text-[10px] text-slate-500">Zero white-font or hidden prompt injections detected</p>
          </div>
          <span className="font-mono font-bold text-emerald-600">PASS (Clean)</span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="font-medium text-slate-800">Explainable Scoring Rationale</span>
            <p className="text-[10px] text-slate-500">Demonstrated hands-on full stack + IoT hardware experience</p>
          </div>
          <span className="font-mono font-bold text-slate-700">High Confidence</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">React & Next.js</span>
        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">Node.js Microservices</span>
        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">FastAPI Python</span>
        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">ESP32 Firmware</span>
        <span className="px-2 py-0.5 rounded bg-iris-50 text-iris-700 text-[10px] font-medium border border-iris-200">+8 more verified</span>
      </div>
    </div>
  );
}

// 6. Sentinel Conceptual Space-Debris Visualizer
export function SentinelVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Central Earth Globe representation
      const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 38);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#090d16');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric limb
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Orbital Rings
      const orbits = [
        { rx: 70, ry: 25, rot: 0.2, speed: 0.02, color: 'rgba(124, 58, 237, 0.35)' },
        { rx: 95, ry: 35, rot: -0.4, speed: 0.015, color: 'rgba(56, 189, 248, 0.3)' },
        { rx: 120, ry: 45, rot: 0.6, speed: 0.01, color: 'rgba(148, 163, 184, 0.25)' }
      ];

      orbits.forEach((orb, i) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(orb.rot);
        ctx.strokeStyle = orb.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Orbiting satellite/debris point
        const satAngle = angle * (i + 1) * orb.speed * 2;
        const satX = Math.cos(satAngle) * orb.rx;
        const satY = Math.sin(satAngle) * orb.ry;

        ctx.fillStyle = i === 0 ? '#818cf8' : i === 1 ? '#38bdf8' : '#f59e0b';
        ctx.beginPath();
        ctx.arc(satX, satY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      angle += 0.5;
      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <Satellite className="w-3.5 h-3.5 text-iris-400" />
          <span className="font-mono font-bold text-slate-200">SENTINEL ORBITAL RISK RADAR</span>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded font-mono">
          LEO CONJUNCTION: NOMINAL
        </span>
      </div>

      <div className="relative flex justify-center items-center py-2">
        <canvas
          ref={canvasRef}
          width={320}
          height={180}
          className="rounded-lg max-w-full"
        />
      </div>

      <div className="grid grid-cols-3 gap-2.5 font-mono text-center border-t border-slate-800 pt-3">
        <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
          <div className="text-[9px] text-slate-400">TRACKED OBJECTS</div>
          <div className="text-xs font-bold text-slate-200 mt-0.5">28,490+</div>
        </div>
        <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
          <div className="text-[9px] text-slate-400">COLLISION PROB.</div>
          <div className="text-xs font-bold text-iris-400 mt-0.5">&lt; 10⁻⁵ Safe</div>
        </div>
        <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
          <div className="text-[9px] text-slate-400">PROPAGATOR</div>
          <div className="text-xs font-bold text-slate-200 mt-0.5">SGP4 / TLE</div>
        </div>
      </div>
    </div>
  );
}

// 5. Merry Berry Ice Cream Cafe Visual
export function MerryBerryVisual() {
  const [flavorIndex, setFlavorIndex] = useState(0);
  const flavors = [
    { name: 'Wild Boysenberry Ribbon', color: '#9333ea', notes: 'Tart Berry • Velvet Cream • Fresh Mint', temp: '-14°C' },
    { name: 'Sicilian Pistachio Crunch', color: '#10b981', notes: 'Roasted Nut • Sea Salt • Cocoa Nibs', temp: '-12°C' },
    { name: 'Madagascar Smoked Vanilla', color: '#f59e0b', notes: 'Pure Bean • Bourbon Caramel • Oak Smoke', temp: '-13°C' }
  ];

  const currentFlavor = flavors[flavorIndex];

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentFlavor.color }} />
          <span className="font-mono font-bold text-slate-200">MERRY BERRY // KINETIC STORYTELLING</span>
        </div>
        <span className="text-[10px] text-purple-400 bg-purple-950/60 border border-purple-800 px-2 py-0.5 rounded font-mono">
          PARALLAX ENGINE ACTIVE
        </span>
      </div>

      <div className="py-4 text-center space-y-3">
        <div className="inline-block p-4 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-inner">
          <div 
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg transition-transform duration-500 hover:scale-110"
            style={{ 
              background: `radial-gradient(circle at 30% 30%, ${currentFlavor.color}, #09090b)` 
            }}
          >
            🍨
          </div>
        </div>
        <div>
          <div className="text-base font-bold text-slate-100">{currentFlavor.name}</div>
          <div className="text-xs text-slate-400 mt-0.5">{currentFlavor.notes}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 font-mono text-center border-t border-slate-800 pt-3">
        {flavors.map((flv, idx) => (
          <button
            key={flv.name}
            onClick={() => setFlavorIndex(idx)}
            className={`p-2 rounded-lg border transition-all text-[10px] ${
              idx === flavorIndex 
                ? 'bg-purple-950/40 border-purple-500 text-purple-200 font-bold' 
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            {flv.name.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

// 6. eSIM Visa Overstay Detection & Alert System Visual
export function EsimVisaVisual() {
  const [country, setCountry] = useState('ESP');
  const [daysRemaining, setDaysRemaining] = useState(14);
  const [privacyProtected, setPrivacyProtected] = useState(true);

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono font-bold text-slate-200">eSIM TELECOM ROAMING ADVISORY</span>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded font-mono">
          ZERO-KNOWLEDGE PRIVACY
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 py-2 font-mono">
        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400">ROAMING MCC/MNC</div>
          <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
            <span>214-07 ({country})</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-[9px] text-slate-500">Cellular Session Active</div>
        </div>
        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400">VISA QUOTA ALLOWANCE</div>
          <div className="text-sm font-bold text-amber-400">{daysRemaining} Days Left</div>
          <div className="text-[9px] text-slate-500">Schengen 90/180 Window</div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-3 flex items-center justify-between font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-400">✓</span>
          <span>Zero Itinerary Stored (On-Device State)</span>
        </div>
        <button
          onClick={() => setDaysRemaining(prev => prev > 1 ? prev - 1 : 14)}
          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] transition-colors"
        >
          Advance Day
        </button>
      </div>
    </div>
  );
}

