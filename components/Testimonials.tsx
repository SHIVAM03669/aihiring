"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const testimonials = [
        {
            quote:
                "RecruiterAI helped us screen 300+ applications in under an hour. Our time-to-hire dropped by 60%.",
            name: "Sarah Chen",
            title: "Head of Talent",
            company: "TechCorp",
            initials: "SC",
        },
        {
            quote:
                "The AI interview scheduling alone saved our team 20 hours per week. Game changer.",
            name: "Michael Rodriguez",
            title: "Recruiting Manager",
            company: "StartupXYZ",
            initials: "MR",
        },
        {
            quote:
                "We rehired a candidate from 6 months ago thanks to the passive pipeline feature. Amazing.",
            name: "Emily Patel",
            title: "VP People",
            company: "GrowthCo",
            initials: "EP",
        },
    ];

    return (
        <section
            ref={ref}
            className="py-24 px-4 md:px-8 lg:px-16 bg-[#0a0a0a]"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-4">
                        Loved by <span className="gradient-text">Hiring Teams</span>
                    </h2>
                    <p className="text-xl text-white/60">
                        See what our customers are saying
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="glass-effect rounded-2xl p-8 hover:border-accent/30 transition-all"
                        >
                            <Quote className="w-10 h-10 text-accent-1/40 mb-4" />
                            <p className="text-white/80 text-lg mb-6 leading-relaxed">
                                "{testimonial.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white font-bold">
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <div className="font-semibold text-white/90">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-white/60">
                                        {testimonial.title}, {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
