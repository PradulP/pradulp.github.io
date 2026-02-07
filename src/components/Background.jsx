
import React, { useEffect, useRef, useState } from "react";

/**
 * Background
 * Combined Spectrum Theme: Blue (BIM), Amber (Construction), Emerald (Innovation)
 */
export default function Background() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const progress = window.scrollY / totalScroll;
                setScrollProgress(progress);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* 1. Static Blueprint Grid (CSS) */}
            <div className="absolute inset-0 bg-blueprint opacity-[var(--cad-grid-opacity,0.5)]"
                style={{ '--cad-grid-opacity': currentTheme === 'paper' ? '0.1' : '0.5' }} />

            {/* 2. House Structure (Scroll-Reactive Assembly) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 z-[-2]">
                <HouseAssembly progress={scrollProgress} />
            </div>

            {/* 3. Futuristic Neon Light Beams (Diagonal Scans) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="bg-neon-beam" style={{ left: '20%', animationDelay: '0s' }} />
                <div className="bg-neon-beam" style={{ left: '50%', animationDelay: '2s' }} />
                <div className="bg-neon-beam" style={{ left: '80%', animationDelay: '4s' }} />
            </div>

            {/* 4. Multi-color Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-sky-500/20 rounded-full blur-[120px] animate-float" />
            <div className="absolute top-[20%] right-[-5%] w-[45vw] h-[45vw] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
            <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-amber-500/20 rounded-full blur-[140px] animate-float" style={{ animationDelay: "4s" }} />
            <div className="absolute bottom-[-10%] left-[10%] w-[55vw] h-[55vw] bg-indigo-500/20 rounded-full blur-[140px] animate-float" style={{ animationDelay: "6s" }} />

            {/* 5. Floating BIM Wireframes (Spectrum themed) */}
            <FloatingBIMObject className="top-[15%] left-[10%] opacity-30" size={60} duration={20} color="border-sky-500/50" />
            <FloatingBIMObject className="top-[45%] right-[20%] opacity-30" size={85} duration={25} delay={-5} color="border-amber-500/50" />
            <FloatingBIMObject className="bottom-[30%] left-[15%] opacity-25" size={50} duration={18} delay={-10} color="border-emerald-500/50" />

            {/* 6. Building Frameworks (Rising Construction) */}
            <div className="absolute inset-x-0 bottom-0 h-[40vh] overflow-hidden pointer-events-none opacity-20 z-[-1]">
                <BuildingFrameworks />
            </div>

            {/* 6. Floating Digital Tools (Civil & Web) */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <FloatingToolLabel text="REVIT" top="10%" left="80%" delay="0s" color="text-sky-400" />
                <FloatingToolLabel text="AUTOCAD" top="25%" left="15%" delay="2s" color="text-slate-400" />
                <FloatingToolLabel text="REACT" top="60%" left="85%" delay="4s" color="text-sky-400" />
                <FloatingToolLabel text="CIVIL 3D" top="80%" left="20%" delay="1s" color="text-emerald-400" />
                <FloatingToolLabel text="STAAD PRO" top="15%" left="40%" delay="5s" color="text-amber-400" />
                <FloatingToolLabel text="TWINMOTION" top="70%" left="60%" delay="3s" color="text-indigo-400" />
                <FloatingToolLabel text="BIM 360" top="40%" left="5%" delay="6s" color="text-sky-300" />
                <FloatingToolLabel text="NODE.JS" top="50%" left="75%" delay="7s" color="text-emerald-500" />
            </div>

            {/* 7. Interactive Structural Grid (Canvas) */}
            <StructuralCanvas />

            {/* 8. Vignette Overlay (Focus Center) */}
            <div className="absolute inset-0 bg-radial-vignette opacity-70"
                style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(2,6,23,0.9) 100%)' }} />
        </div>
    );
}

/**
 * FloatingToolLabel
 * Displays a drifting, monospaced tech label.
 */
function FloatingToolLabel({ text, top, left, delay, color }) {
    return (
        <div
            className={`absolute font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] animate-float ${color} blur-[0.3px]`}
            style={{
                top,
                left,
                animationDelay: delay,
                textShadow: '0 0 8px currentColor'
            }}
        >
            {`// ${text}`}
        </div>
    );
}

/**
 * HouseAssembly
 * Progress 0: Complete
 * Progress 0.5: Maximum Scatter
 * Progress 1.0: Re-combined
 */
function HouseAssembly({ progress }) {
    // We want the peak scatter to be at progress 0.5
    // intensity is 0 at both ends
    const intensity = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
    const scatterRange = 300; // how far pieces fly

    const pieces = [
        { id: 'foundation', x: 0, y: 30, scale: 1, color: 'border-sky-500/50 bg-sky-500/10', rx: 0, ry: 0.2 },
        { id: 'wall-l', x: -50, y: 0, scale: 0.9, color: 'border-emerald-500/50 bg-emerald-500/10', rx: -0.8, ry: -0.5 },
        { id: 'wall-r', x: 50, y: 0, scale: 0.9, color: 'border-amber-500/50 bg-amber-500/10', rx: 0.8, ry: -0.5 },
        { id: 'roof', x: 0, y: -60, scale: 1.1, color: 'border-sky-500/60', rx: 0, ry: -1.2 },
        { id: 'window-l', x: -25, y: -10, scale: 0.8, color: 'border-white/40 bg-white/5', rx: -0.4, ry: -0.2 },
        { id: 'window-r', x: 25, y: -10, scale: 0.8, color: 'border-white/40 bg-white/5', rx: 0.4, ry: -0.2 },
        { id: 'door', x: 0, y: 15, scale: 0.8, color: 'border-amber-400/50 bg-amber-400/10', rx: 0, ry: 0.1 },
    ];

    return (
        <div className="relative" style={{ transform: `scale(${1.6 + intensity * 0.4})` }}>
            {pieces.map((p, i) => {
                // Scatter calculation: move using fixed directions
                const tx = p.x + p.rx * 500 * intensity;
                const ty = p.y + p.ry * 500 * intensity;
                const rot = intensity * 70 * (i % 2 === 0 ? 1 : -1);

                return (
                    <div
                        key={p.id}
                        className={`absolute border transition-all duration-300 ease-out glow-edge transform-style-3d ${p.color}`}
                        style={{
                            width: p.id === 'roof' ? 0 : (p.id === 'foundation' ? 240 : (p.id.includes('wall') ? 110 : (p.id.includes('window') ? 35 : 45))),
                            height: p.id === 'roof' ? 0 : (p.id === 'foundation' ? 25 : (p.id.includes('wall') ? 130 : (p.id.includes('window') ? 35 : 65))),
                            left: -120, // center offset
                            top: -65,
                            transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${p.scale - intensity * 0.1})`,
                            // Special roof styling (triangle)
                            border: p.id === 'roof' ? 'none' : undefined,
                            borderLeft: p.id === 'roof' ? '135px solid transparent' : undefined,
                            borderRight: p.id === 'roof' ? '135px solid transparent' : undefined,
                            borderBottom: p.id === 'roof' ? `90px solid ${intensity > 0.1 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(56, 189, 248, 0.8)'}` : undefined,
                            filter: p.id === 'roof' ? 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.5))' : undefined,
                        }}
                    >
                        {/* 1. INTERNAL STRUCTURAL FRAME (Columns/Beams) */}
                        <div className="absolute inset-0 border border-white/10 m-2 flex flex-col justify-between">
                            {/* Horizontal Beams */}
                            <div className="w-full h-px bg-white/20" />
                            <div className="w-full h-px bg-white/20" />
                            <div className="absolute inset-y-0 left-1/2 w-px bg-white/20" /> {/* Main Column */}
                        </div>

                        {/* 2. Diagonal Bracing (Structural engineering look) */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-0 left-0 w-[142%] h-px bg-white origin-top-left rotate-[45deg]" />
                        </div>

                        {/* 3. Blueprint grid inside pieces */}
                        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />

                        {/* 4. LIDAR / Technical Points on corners */}
                        <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_5px_#38bdf8]" />
                        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_5px_#38bdf8]" />
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_5px_#38bdf8]" />
                        <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_5px_#38bdf8]" />

                        {/* Dimension Lines (visible when mostly assembled) */}
                        {intensity < 0.2 && p.id === 'foundation' && (
                            <div className="absolute -bottom-8 left-0 w-full flex items-center justify-between px-2 text-[8px] text-sky-500/60 font-mono">
                                <div className="h-4 border-l border-sky-500/40" />
                                <span className="pb-1 border-b border-sky-500/20 px-2 tracking-tighter animate-pulse">24.50m REF</span>
                                <div className="h-4 border-r border-sky-500/40" />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/**
 * FloatingBIMObject
 * Renders a slow-rotating 3D wireframe cube representing a BIM element.
 */
function FloatingBIMObject({ className, size, duration, delay = 0, color = "border-sky-500/30" }) {
    return (
        <div
            className={`absolute ${className}`}
            style={{ perspective: "1000px" }}
        >
            <div
                className="relative transform-style-3d animate-spin-3d"
                style={{
                    width: size,
                    height: size,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`
                }}
            >
                {/* Cube Faces */}
                <CubeFace rotate="rotateY(0deg)" translate={`translateZ(${size / 2}px)`} size={size} color={color} />
                <CubeFace rotate="rotateY(90deg)" translate={`translateZ(${size / 2}px)`} size={size} color={color} />
                <CubeFace rotate="rotateY(180deg)" translate={`translateZ(${size / 2}px)`} size={size} color={color} />
                <CubeFace rotate="rotateY(-90deg)" translate={`translateZ(${size / 2}px)`} size={size} color={color} />
                <CubeFace rotate="rotateX(90deg)" translate={`translateZ(${size / 2}px)`} size={size} color={color} />
                <CubeFace rotate="rotateX(-90deg)" translate={`translateZ(${size / 2}px)`} size={size} color={color} />
            </div>
        </div>
    );
}

function CubeFace({ rotate, translate, size, color }) {
    return (
        <div
            className={`absolute ${color} bg-white/5 backdrop-blur-[1px] border`}
            style={{
                width: size,
                height: size,
                transform: `${rotate} ${translate}`
            }}
        >
            <div className="absolute inset-0 border-[0.5px] border-white/10 transform rotate-45 scale-[1.4] opacity-20" />
        </div>
    );
}

/**
 * StructuralCanvas
 * Renders the interactive nodes and connecting lines.
 */
function StructuralCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let width, height;
        let particles = [];
        let mouse = { x: -1000, y: -1000 };

        const GRID_SIZE = 110;
        const CONNECT_DIST = 160;
        const MOUSE_RADIUS = 280;

        // Multi-color support
        const COLORS = [
            "rgba(14, 165, 233, 0.3)", // Sky
            "rgba(251, 191, 36, 0.3)", // Amber
            "rgba(52, 211, 153, 0.3)"  // Emerald
        ];

        class Node {
            constructor(x, y, isAnchor) {
                this.baseX = x;
                this.baseY = y;
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.isAnchor = isAnchor;
                this.hueShift = Math.random() * COLORS.length;
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    this.vx += (dx / dist) * force * 1.5;
                    this.vy += (dy / dist) * force * 1.5;
                }

                if (this.isAnchor) {
                    this.vx += (this.baseX - this.x) * 0.04;
                    this.vy += (this.baseY - this.y) * 0.04;
                }

                this.vx *= 0.93;
                this.vy *= 0.93;
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                ctx.beginPath();
                const size = this.isAnchor ? 1.5 : 1;
                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                ctx.fill();
                ctx.closePath();
            }
        }

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            if (width === 0) return;
            particles = [];

            for (let y = 0; y < height + GRID_SIZE; y += GRID_SIZE) {
                for (let x = 0; x < width + GRID_SIZE; x += GRID_SIZE) {
                    const offsetX = (Math.floor(y / GRID_SIZE) % 2 === 0) ? 0 : GRID_SIZE / 2;
                    particles.push(new Node(x + offsetX, y, true));
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });

            particles.forEach((a, i) => {
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECT_DIST) {
                        ctx.beginPath();
                        const mouseFactor = Math.max(0, 1 - (Math.sqrt((mouse.x - a.x) ** 2 + (mouse.y - a.y) ** 2) / 400));

                        // Choose color based on position (Blueprint transition)
                        const colorIdx = Math.floor((a.x / (width || 1)) * COLORS.length) % COLORS.length;
                        const baseColor = COLORS[colorIdx];

                        ctx.strokeStyle = mouseFactor > 0.5 ? baseColor.replace("0.3", "0.6") : baseColor;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });
            animationFrameId = requestAnimationFrame(animate);
        }

        const handleResize = () => init();
        const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        init(); animate();
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function BuildingFrameworks() {
    const buildings = React.useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
        height: Math.random() * 55 + 25 + "%",
        width: Math.random() * 2 + 4 + "vw",
        delay: Math.random() * 6 + "s",
        floors: Math.floor(Math.random() * 4) + 4,
        // Spectral variety in buildings
        tint: ["sky", "amber", "emerald"][i % 3]
    })), []);

    return (
        <div className="flex items-end justify-around w-full h-full px-10 gap-2 perspective-[800px]">
            {buildings.map((b, i) => (
                <div
                    key={i}
                    className={`relative border-l border-r border-t backdrop-blur-[1px] transform-gpu transition-all duration-[3000ms] ${b.tint === "sky" ? "border-sky-500/20 bg-sky-500/5" :
                        b.tint === "amber" ? "border-amber-500/20 bg-amber-500/5" :
                            "border-emerald-500/20 bg-emerald-500/5"
                        }`}
                    style={{
                        height: b.height,
                        width: b.width,
                        animation: `growing-building 10s ease-in-out infinite alternate ${b.delay}`
                    }}
                >
                    <div className="absolute inset-0 flex flex-col justify-end">
                        {Array.from({ length: b.floors }).map((_, j) => (
                            <div key={j} className="w-full h-px bg-white/5" style={{ marginBottom: (100 / b.floors) + "%" }} />
                        ))}
                    </div>
                    {i % 4 === 0 && (
                        <div className="absolute -top-10 left-1/2 w-px h-10 bg-white/20 -translate-x-1/2">
                            <div className="absolute top-0 w-6 h-px bg-white/30 animate-spin-3d origin-left" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
