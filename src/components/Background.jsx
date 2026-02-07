
import React, { useEffect, useRef } from "react";

export default function Background() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950 pointer-events-none">
            {/* 1. Static Blueprint Grid (CSS) */}
            <div className="absolute inset-0 bg-blueprint opacity-[0.6]" />

            {/* 2. Lidar Scanner Effect (BIM Scan) */}
            <div className="absolute inset-0 bg-scanline opacity-10" />

            {/* 3. Ambient Color Blobs (Aurora) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-sky-500/10 rounded-full blur-[100px] animate-float" />
            <div className="absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
            <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-indigo-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "5s" }} />

            {/* 4. Floating BIM Wireframes */}
            <FloatingBIMObject className="top-[15%] left-[10%] opacity-20" size={60} duration={20} />
            <FloatingBIMObject className="top-[40%] right-[15%] opacity-20" size={80} duration={25} delay={-5} />
            <FloatingBIMObject className="bottom-[20%] left-[25%] opacity-15" size={50} duration={18} delay={-10} />

            {/* 5. Building Frameworks (Rising Construction) */}
            <div className="absolute inset-x-0 bottom-0 h-[40vh] overflow-hidden pointer-events-none opacity-20 z-[-1]">
                <BuildingFrameworks />
            </div>

            {/* 6. Interactive Structural Grid (Canvas) */}
            <StructuralCanvas />

            {/* 7. Vignette Overlay (Focus Center) */}
            <div className="absolute inset-0 bg-radial-vignette opacity-60"
                style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(2,6,23,0.8) 100%)' }} />
        </div>
    );
}

/**
 * FloatingBIMObject
 * Renders a slow-rotating 3D wireframe cube representing a BIM element.
 */
function FloatingBIMObject({ className, size, duration, delay = 0 }) {
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
                <CubeFace rotate="rotateY(0deg)" translate={`translateZ(${size / 2}px)`} size={size} />
                <CubeFace rotate="rotateY(90deg)" translate={`translateZ(${size / 2}px)`} size={size} />
                <CubeFace rotate="rotateY(180deg)" translate={`translateZ(${size / 2}px)`} size={size} />
                <CubeFace rotate="rotateY(-90deg)" translate={`translateZ(${size / 2}px)`} size={size} />
                <CubeFace rotate="rotateX(90deg)" translate={`translateZ(${size / 2}px)`} size={size} />
                <CubeFace rotate="rotateX(-90deg)" translate={`translateZ(${size / 2}px)`} size={size} />
            </div>
        </div>
    );
}

function CubeFace({ rotate, translate, size }) {
    return (
        <div
            className="absolute border border-sky-500/30 bg-sky-500/5 backdrop-blur-[1px]"
            style={{
                width: size,
                height: size,
                transform: `${rotate} ${translate}`
            }}
        >
            {/* Internal cross for 'structure' look */}
            <div className="absolute inset-0 border-[0.5px] border-sky-500/10 transform rotate-45 scale-[1.4] opacity-30" />
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

        // Config
        const GRID_SIZE = 120; // larger grid for cleaner look
        const CONNECT_DIST = 160;
        const MOUSE_RADIUS = 250;

        // Theme Colors
        const NODE_COLOR = "rgba(14, 165, 233, 0.4)"; // sky-500
        const LINE_COLOR = "rgba(14, 165, 233, 0.15)"; // Increased visibility
        const ACTIVE_LINE_COLOR = "rgba(14, 165, 233, 0.4)";

        class Node {
            constructor(x, y, isAnchor) {
                this.baseX = x;
                this.baseY = y;
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.isAnchor = isAnchor;
            }

            update() {
                // Mouse Interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS) {
                    const forceDirectionX = dx / dist;
                    const forceDirectionY = dy / dist;
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;

                    // Gentle push/pull
                    const direction = 1; // attract
                    const strength = 2;

                    this.vx += forceDirectionX * force * strength * direction;
                    this.vy += forceDirectionY * force * strength * direction;
                }

                // Return to grid
                if (this.isAnchor) {
                    const spring = 0.03;
                    this.vx += (this.baseX - this.x) * spring;
                    this.vy += (this.baseY - this.y) * spring;
                }

                // Friction
                this.vx *= 0.92;
                this.vy *= 0.92;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                ctx.beginPath();
                // Draw small cross or circle for "technical" look
                const size = this.isAnchor ? 1.5 : 1;
                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fillStyle = NODE_COLOR;
                ctx.fill();
                ctx.closePath();
            }
        }

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];

            // Create Grid
            for (let y = 0; y < height + GRID_SIZE; y += GRID_SIZE) {
                for (let x = 0; x < width + GRID_SIZE; x += GRID_SIZE) {
                    // Hexagonal offset for truss look
                    const offsetX = (Math.floor(y / GRID_SIZE) % 2 === 0) ? 0 : GRID_SIZE / 2;
                    particles.push(new Node(x + offsetX, y, true));
                }
            }

            // Add random floaters
            const floaters = 15;
            for (let i = 0; i < floaters; i++) {
                particles.push(new Node(Math.random() * width, Math.random() * height, false));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Update & Draw Nodes
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw Lines
            particles.forEach((a, i) => {
                // Optimization: check limited neighbors
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECT_DIST) {
                        ctx.beginPath();
                        const isActive = dist < (MOUSE_RADIUS * 0.6);
                        ctx.strokeStyle = isActive ? ACTIVE_LINE_COLOR : LINE_COLOR;
                        ctx.lineWidth = isActive ? 1 : 0.5;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        const handleResize = () => init();
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        init();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/**
 * BuildingFrameworks
 * Simulates a city/construction skyline at the bottom using CSS grids.
 */
function BuildingFrameworks() {
    // Generate random heights for "buildings"
    const buildings = Array.from({ length: 20 }).map((_, i) => ({
        height: Math.random() * 60 + 20 + "%", // 20% to 80% height
        width: Math.random() * 2 + 3 + "vw",   // 3vw to 5vw width
        delay: Math.random() * 5 + "s",
        floors: Math.floor(Math.random() * 5) + 3 // 3 to 8 floors lines
    }));

    return (
        <div className="flex items-end justify-around w-full h-full px-10 gap-2 perspective-[500px]">
            {buildings.map((b, i) => (
                <div
                    key={i}
                    className="relative border-l border-r border-t border-sky-500/30 bg-sky-500/5 backdrop-blur-[1px] transform-gpu transition-all duration-[3000ms]"
                    style={{
                        height: b.height,
                        width: b.width,
                        animation: `growing-building 8s ease-in-out infinite alternate ${b.delay}`
                    }}
                >
                    {/* Internal Floor Lines */}
                    <div className="absolute inset-0 flex flex-col justify-end">
                        {Array.from({ length: b.floors }).map((_, j) => (
                            <div
                                key={j}
                                className="w-full h-px bg-sky-500/20"
                                style={{ marginBottom: (100 / b.floors) + "%" }}
                            />
                        ))}
                    </div>

                    {/* Crane / Antenna on top of some */}
                    {i % 3 === 0 && (
                        <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-sky-500/30 -translate-x-1/2">
                            <div className="absolute top-0 w-4 h-0.5 bg-sky-500/30 animate-spin-3d origin-left" style={{ animationDuration: '10s' }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

