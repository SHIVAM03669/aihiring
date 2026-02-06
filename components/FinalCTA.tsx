"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export default function FinalCTA() {
    return (
        <section
            id="final-cta"
            className="py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f1f] to-[#0a0a0a] relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-1/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white/90 mb-6">
                        Ready to Hire{" "}
                        <span className="gradient-text">Better, Faster?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto">
                        Join 500+ companies hiring smarter with AI
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="group px-8 py-4 bg-accent text-white font-semibold rounded-lg text-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/20 flex items-center gap-2">
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="group px-8 py-4 bg-transparent border-2 border-white/20 text-white font-semibold rounded-lg text-lg hover:border-accent hover:bg-accent/10 transition-all flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Schedule Demo
                        </button>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/40">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>Setup in 30 minutes</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
