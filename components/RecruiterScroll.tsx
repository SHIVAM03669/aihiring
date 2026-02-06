"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { clamp, mapRange } from "@/lib/utils";

export default function RecruiterScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [frames, setFrames] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const requestRef = useRef<number>();

    // Preload all frames
    useEffect(() => {
        const loadFrames = async () => {
            const loadedFrames: HTMLImageElement[] = [];
            let frameCount = 0;

            // Try to load frames with common naming patterns
            const patterns = [
                (i: number) => `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`,
                (i: number) => `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.png`,
                (i: number) => `/sequence/${String(i).padStart(4, "0")}.png`,
                (i: number) => `/sequence/${String(i).padStart(4, "0")}.jpg`,
                (i: number) => `/sequence/frame_${i}.png`,
                (i: number) => `/sequence/frame_${i}.jpg`,
            ];

            // Try loading up to 250 frames
            for (let i = 1; i <= 250; i++) {
                let loaded = false;

                for (const pattern of patterns) {
                    try {
                        const img = new Image();
                        const path = pattern(i);

                        await new Promise((resolve, reject) => {
                            img.onload = resolve;
                            img.onerror = reject;
                            img.src = path;
                        });

                        loadedFrames.push(img);
                        frameCount = i;
                        loaded = true;
                        break; // Found the right pattern
                    } catch {
                        // Try next pattern
                        continue;
                    }
                }

                if (!loaded) break; // No more frames
            }

            if (loadedFrames.length > 0) {
                setFrames(loadedFrames);
                console.log(`Loaded ${loadedFrames.length} frames`);
            } else {
                console.log("No frames found, using fallback");
            }

            setIsLoading(false);
        };

        loadFrames();
    }, []);

    // Handle scroll and render
    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const scrollStart = -rect.top;
            const scrollEnd = container.offsetHeight - window.innerHeight;

            // Calculate progress (0 to 1)
            const progress = clamp(scrollStart / scrollEnd, 0, 1);
            setScrollProgress(progress);

            // Render frame
            if (frames.length > 0) {
                const frameIndex = Math.floor(progress * (frames.length - 1));
                const frame = frames[clamp(frameIndex, 0, frames.length - 1)];

                // Resize canvas to match display size
                const dpr = window.devicePixelRatio || 1;
                const displayWidth = canvas.offsetWidth;
                const displayHeight = canvas.offsetHeight;

                canvas.width = displayWidth * dpr;
                canvas.height = displayHeight * dpr;

                ctx.scale(dpr, dpr);

                // Clear canvas
                ctx.clearRect(0, 0, displayWidth, displayHeight);

                // Draw frame (cover fit)
                const imgAspect = frame.width / frame.height;
                const canvasAspect = displayWidth / displayHeight;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (imgAspect > canvasAspect) {
                    drawHeight = displayHeight;
                    drawWidth = displayHeight * imgAspect;
                    offsetX = (displayWidth - drawWidth) / 2;
                    offsetY = 0;
                } else {
                    drawWidth = displayWidth;
                    drawHeight = displayWidth / imgAspect;
                    offsetX = 0;
                    offsetY = (displayHeight - drawHeight) / 2;
                }

                ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
            } else {
                // Fallback gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, "#1a1a2e");
                gradient.addColorStop(0.5, "#16213e");
                gradient.addColorStop(1, "#0f3460");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        };

        // Initial render
        handleScroll();

        // Throttled scroll handler
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestRef.current = requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", handleScroll);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [frames]);

    // Calculate text opacity based on scroll progress
    const getTextOpacity = (start: number, peak: number, end: number) => {
        if (scrollProgress < start) return 0;
        if (scrollProgress < peak) {
            return mapRange(scrollProgress, start, peak, 0, 1);
        }
        if (scrollProgress < end) {
            return mapRange(scrollProgress, peak, end, 1, 0);
        }
        return 0;
    };

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
                {/* Contained Canvas Box - Only visible after title completely fades (25% onwards) */}
                <div
                    className="relative w-full max-w-6xl mx-auto px-4 md:px-8 transition-opacity duration-700"
                    style={{ opacity: scrollProgress > 0.25 ? 1 : 0 }}
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                        <canvas
                            ref={canvasRef}
                            className="w-full aspect-video bg-[#0a0a0a]"
                            style={{ touchAction: "pan-y" }}
                        />
                    </div>
                </div>

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <div className="text-center">
                            <div className="inline-block w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4" />
                            <p className="text-white/60 text-sm">Loading experience...</p>
                        </div>
                    </div>
                )}

                {/* Text Overlays - Outside the box for better readability */}
                {!isLoading && (
                    <>
                        {/* 0-15% - Hero Headline - Completely fades before frames appear */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
                            style={{
                                opacity: scrollProgress < 0.15 ? 1 : Math.max(0, 1 - (scrollProgress - 0.15) * 10),
                            }}
                        >
                            <div className="text-center max-w-5xl space-y-6">
                                <div className="inline-block px-4 py-2 bg-accent-1/10 border border-accent-1/30 rounded-full mb-4">
                                    <span className="text-accent-1 text-sm font-semibold">AI-Powered Recruiting Platform</span>
                                </div>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(59,130,246,0.3)' }}>
                                    Every Hire,{" "}
                                    <span className="gradient-text">Faster and Better</span>
                                </h1>
                                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
                                    Automate screening, scheduling, and interviews with AI. Reduce time-to-hire by 70% and focus on the best candidates.
                                </p>

                                <button
                                    className="pointer-events-auto px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-accent/30"
                                    onClick={() => {
                                        document
                                            .getElementById("final-cta")
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    Start Free Trial →
                                </button>

                                {/* Scroll Indicator - Positioned below CTA */}
                                {scrollProgress < 0.02 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1, duration: 0.6 }}
                                        className="flex flex-col items-center gap-2 mt-8"
                                    >
                                        <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
                                        <motion.div
                                            animate={{ y: [0, 8, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <ArrowDown className="w-6 h-6 text-accent-1" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* 30-50% - Problem Statement - Stays longer */}
                        <div
                            className="absolute top-0 left-0 right-0 pt-12 md:pt-20 px-6 md:px-12 pointer-events-none"
                            style={{
                                opacity: getTextOpacity(0.3, 0.4, 0.55),
                            }}
                        >
                            <div className="max-w-2xl bg-black/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
                                <div className="inline-block px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full mb-3">
                                    <span className="text-red-400 text-sm font-semibold">Problem</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Manual Hiring Chaos
                                </h2>
                                <p className="text-base md:text-lg text-white/80">
                                    Endless resume reviews. Scheduling chaos. Lost candidates.
                                </p>
                            </div>
                        </div>

                        {/* 55-75% - Solution - Stays longer */}
                        <div
                            className="absolute top-0 right-0 pt-12 md:pt-20 px-6 md:px-12 pointer-events-none"
                            style={{
                                opacity: getTextOpacity(0.55, 0.65, 0.8),
                            }}
                        >
                            <div className="max-w-2xl ml-auto bg-black/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-accent/20">
                                <div className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 rounded-full mb-3">
                                    <span className="text-accent text-sm font-semibold">Solution</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    AI Automation & Clarity
                                </h2>
                                <p className="text-base md:text-lg text-white/80">
                                    AI screens, schedules, and organizes automatically. Focus on the best candidates.
                                </p>
                            </div>
                        </div>

                        {/* 80-100% - CTA - Stays longer */}
                        <div
                            className="absolute bottom-0 left-0 right-0 pb-12 md:pb-20 px-4 flex flex-col items-center pointer-events-none"
                            style={{
                                opacity: getTextOpacity(0.8, 0.85, 1),
                            }}
                        >
                            <div className="text-center max-w-3xl bg-black/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-accent/20">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Start Hiring Smarter
                                </h2>
                                <button
                                    className="pointer-events-auto px-8 py-4 bg-accent text-white font-semibold rounded-xl text-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/30"
                                    onClick={() => {
                                        document
                                            .getElementById("final-cta")
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    Start Free Trial →
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
