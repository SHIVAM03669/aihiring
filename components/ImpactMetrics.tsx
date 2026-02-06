"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function ImpactMetrics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const metrics = [
        { value: 10, suffix: "x", label: "Faster Screening" },
        { value: 70, suffix: "%", label: "Faster Time-to-Hire" },
        { value: 25, suffix: "x", label: "More Interview Capacity" },
        { value: 95, suffix: "%", label: "Application Completion" },
        { value: 89, suffix: "%", label: "More Qualified Applications" },
        { value: 80, suffix: "%", label: "Lower Recruitment Cost" },
        { value: 50, suffix: "%", label: "Reduction in Bad Hires" },
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
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 mb-4">
                        The <span className="gradient-text">RecruiterAI</span> Advantage
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Join hundreds of companies transforming their hiring process
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {metrics.map((metric, idx) => (
                        <MetricCard
                            key={idx}
                            value={metric.value}
                            suffix={metric.suffix}
                            label={metric.label}
                            delay={idx * 0.1}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function MetricCard({
    value,
    suffix,
    label,
    delay,
    isInView,
}: {
    value: number;
    suffix: string;
    label: string;
    delay: number;
    isInView: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepValue = value / steps;
        const stepDelay = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            if (currentStep >= steps) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(stepValue * currentStep));
            }
        }, stepDelay);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay }}
            className="glass-effect rounded-xl p-6 hover:border-accent/30 transition-all group hover:scale-105"
        >
            <div className="text-4xl md:text-5xl font-bold text-accent-2 mb-2 group-hover:text-accent-1 transition-colors">
                {count}
                {suffix}
            </div>
            <div className="text-sm md:text-base text-white/60">{label}</div>
        </motion.div>
    );
}
