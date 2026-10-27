import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { loadPhoto, createParticles, createPhotoOverlay, layoutParticles, highResolutionMix } from './particleEngine.js';
import { playChime } from '../../lib/soundFx';
import './particleStage.css';

export default function SignBridgeInteractiveStage({ compact = false }) {
    const stageRef = useRef(null);
    const [isHolding, setIsHolding] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let animationFrameId = null;
        let renderer = null;
        let cleanups = [];

        async function init() {
            try {
                const stage = stageRef.current;
                if (!stage) return;

                // 1. Load cropped SignBridge Logo FIRST
                const photo = await loadPhoto('/sign-logo.png');
                if (!isMounted || !stageRef.current) return;

                const width = Math.max(stage.clientWidth || 450, 1);
                const height = Math.max(stage.clientHeight || (compact ? 320 : 480), 1);
                const aspect = width / height;
                const columns = width < 640 ? 120 : (width < 1024 ? 160 : 190);

                // 2. Create fresh WebGLRenderer & canvas with full alpha transparency
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                });
                renderer.setClearColor(0x000000, 0);
                renderer.setPixelRatio(dpr);
                renderer.setSize(width, height, false);
                renderer.outputColorSpace = THREE.SRGBColorSpace;

                const canvas = renderer.domElement;
                canvas.setAttribute('role', 'button');
                canvas.setAttribute('tabindex', '0');
                canvas.setAttribute('aria-label', 'Hover or hold to form a 3D particle globe, release to restore SignBridge logo');
                canvas.className = 'interactive-canvas w-full h-full object-contain cursor-grab active:cursor-grabbing block';
                stage.insertBefore(canvas, stage.firstChild);

                cleanups.push(() => {
                    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
                    renderer.dispose();
                });

                const particles = createParticles(photo, columns);
                const photoMesh = createPhotoOverlay(photo);

                const scene = new THREE.Scene();

                const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
                camera.position.z = 4;

                scene.add(particles.object);
                scene.add(photoMesh);

                const globeYaw = Math.PI * 0.28;

                // Synchronous layout
                camera.left = -aspect;
                camera.right = aspect;
                camera.top = 1;
                camera.bottom = -1;
                camera.updateProjectionMatrix();
                layoutParticles(particles, photoMesh, aspect, globeYaw);

                let resizeRaf = null;
                const resize = () => {
                    if (resizeRaf) cancelAnimationFrame(resizeRaf);
                    resizeRaf = requestAnimationFrame(() => {
                        if (!isMounted || !stage || !renderer || !camera) return;
                        const w = Math.max(stage.clientWidth || 450, 1);
                        const h = Math.max(stage.clientHeight || (compact ? 320 : 480), 1);
                        const asp = w / h;

                        renderer.setSize(w, h, false);
                        camera.left = -asp;
                        camera.right = asp;
                        camera.top = 1;
                        camera.bottom = -1;
                        camera.updateProjectionMatrix();

                        layoutParticles(particles, photoMesh, asp, globeYaw);
                    });
                };

                const ro = new ResizeObserver(resize);
                ro.observe(stage);
                cleanups.push(() => {
                    ro.disconnect();
                    if (resizeRaf) cancelAnimationFrame(resizeRaf);
                });

                // Spring physics state: 0 = logo, 1 = globe
                let globeTarget = 0.0;
                let globeCurrent = 0.0;
                let globeVelocity = 0.0;

                const setTarget = (val) => {
                    globeTarget = val;
                    setIsHolding(val > 0.5);
                };

                // Native gestures: Hover or press & hold to form 3D globe, release to restore logo
                const onPointerDown = (e) => {
                    e.preventDefault();
                    setTarget(1.0);
                    playChime(880, 'triangle', 0.16, 0.04);
                };
                const onPointerUp = (e) => {
                    setTarget(0.0);
                };
                const onPointerEnter = () => {
                    setTarget(0.85);
                    playChime(660, 'sine', 0.1, 0.025);
                };
                const onPointerLeave = () => {
                    setTarget(0.0);
                };

                canvas.addEventListener('pointerdown', onPointerDown);
                canvas.addEventListener('pointerenter', onPointerEnter);
                canvas.addEventListener('pointerleave', onPointerLeave);
                window.addEventListener('pointerup', onPointerUp);
                window.addEventListener('pointercancel', onPointerUp);

                cleanups.push(() => {
                    canvas.removeEventListener('pointerdown', onPointerDown);
                    canvas.removeEventListener('pointerenter', onPointerEnter);
                    canvas.removeEventListener('pointerleave', onPointerLeave);
                    window.removeEventListener('pointerup', onPointerUp);
                    window.removeEventListener('pointercancel', onPointerUp);
                });

                // 60 FPS Render Loop with smooth Spring simulation
                const clock = new THREE.Clock();
                let lastTime = 0;

                function render() {
                    if (!isMounted) return;
                    const elapsedTime = clock.getElapsedTime();
                    const dt = Math.min(elapsedTime - lastTime, 0.05);
                    lastTime = elapsedTime;

                    // Spring simulation: F = -k*(x - target) - c*v
                    const stiffness = globeTarget > 0.5 ? 90.0 : 60.0;
                    const damping = globeTarget > 0.5 ? 14.0 : 12.0;
                    const force = -stiffness * (globeCurrent - globeTarget) - damping * globeVelocity;
                    globeVelocity += force * dt;
                    globeCurrent += globeVelocity * dt;
                    globeCurrent = Math.max(0.0, Math.min(1.0, globeCurrent));

                    particles.uniforms.uGlobe.value = globeCurrent;
                    particles.uniforms.uTime.value = elapsedTime;

                    if (photoMesh && photoMesh.material) {
                        photoMesh.material.opacity = highResolutionMix(globeCurrent);
                    }

                    renderer.render(scene, camera);
                    animationFrameId = requestAnimationFrame(render);
                }

                render();
                canvas.dataset.ready = 'true';
            } catch (err) {
                console.error('Interactive Stage Init Error:', err);
            }
        }

        init();

        return () => {
            isMounted = false;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            cleanups.forEach(fn => fn());
        };
    }, [compact]);

    if (compact) {
        return (
            <div className="relative w-full h-[320px] flex items-center justify-center select-none" ref={stageRef}>
                {/* Floating Interactive Badge */}
                <div className="absolute top-2 right-2 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-lg">
                        <span className={`w-1.5 h-1.5 rounded-full ${isHolding ? 'bg-orange-400 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
                        {isHolding ? '3D PARTICLES ACTIVE' : 'HOVER / HOLD TO MORPH'}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <section className="particle-lab-wrapper" id="particle-lab" aria-label="Interactive SignBridge Particle Lab">
            <div className="particle-lab-header">
                <div className="particle-lab-badge">
                    <span className="badge-pulse" />
                    <span>// INTERACTIVE EXPERIMENTAL LAB</span>
                </div>
                <h2 className="particle-lab-title">DIGITAL CONNECTIVITY MATRIX</h2>
                <p className="particle-lab-subtitle">
                    {isHolding
                        ? 'RELEASE TO RESOLVE SIGNBRIDGE LOGO'
                        : 'HOVER OR HOLD CANVAS TO ENERGIZE 3D PARTICLE GLOBE'}
                </p>
            </div>

            <div className="stage interactive-stage" ref={stageRef}>
                <div className="interactive-stage-hint" aria-hidden="true">
                    <span>{isHolding ? '⦿ ENERGIZING 3D GLOBE...' : '✦ HOVER OR HOLD TO FORM GLOBE'}</span>
                </div>
            </div>
        </section>
    );
}
