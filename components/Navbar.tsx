"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">R</span>
                    </div>
                    <span className="text-xl font-bold text-white">RecruiterAI</span>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-white/70 hover:text-accent-3 transition-colors text-sm">
                        Features
                    </a>
                    <a href="#how-it-works" className="text-white/70 hover:text-accent-3 transition-colors text-sm">
                        How it Works
                    </a>
                    <a href="#testimonials" className="text-white/70 hover:text-accent-3 transition-colors text-sm">
                        Testimonials
                    </a>
                </div>

                {/* CTA Button */}
                <button className="px-6 py-2 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg text-sm transition-all hover:scale-105">
                    Start Free Trial
                </button>
            </div>
        </nav>
    );
}

export function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
        >
            <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ArrowDown className="w-6 h-6 text-accent" />
            </motion.div>
        </motion.div>
    );
}
