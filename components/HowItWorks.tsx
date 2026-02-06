"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Bot, Calendar, CheckCircle, UserCheck } from "lucide-react";

export default function HowItWorks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const workflows = [
        {
            title: "Automated Screening & Scheduling",
            steps: [
                { icon: <UserCheck className="w-5 h-5" />, text: "New Application" },
                {
                    icon: <Bot className="w-5 h-5" />,
                    text: "AI Resume Screening (Top 20%)",
                },
                {
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: "Auto screening questions",
                },
                {
                    icon: <Calendar className="w-5 h-5" />,
                    text: "Auto interview scheduling",
                },
            ],
            benefit: "Screen 250+ applications in minutes",
        },
        {
            title: "Multi-Stage Interview Automation",
            steps: [
                { icon: <Bot className="w-5 h-5" />, text: "AI video interview" },
                { icon: <CheckCircle className="w-5 h-5" />, text: "AI scoring" },
                { icon: <UserCheck className="w-5 h-5" />, text: "Manager interview" },
                { icon: <ArrowRight className="w-5 h-5" />, text: "Auto offer / rejection" },
            ],
            benefit: "Reduce time-to-hire from 42 days to 12 days",
        },
        {
            title: "Passive Candidate Re-engagement",
            steps: [
                { icon: <UserCheck className="w-5 h-5" />, text: "Save borderline candidates" },
                { icon: <Calendar className="w-5 h-5" />, text: "Re-engage after 3 months" },
                { icon: <ArrowRight className="w-5 h-5" />, text: "Fast-track interviews" },
            ],
            benefit: "Never start hiring from zero again",
        },
    ];

    return (
        <section
            ref={ref}
            className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 mb-4">
                        AI Recruiting Software That Works{" "}
                        <span className="gradient-text">Like Your Own HR Team</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
                        Build custom hiring workflows in minutes. No coding required.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {workflows.map((workflow, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="glass-effect rounded-2xl p-8 hover:border-accent/30 transition-all"
                        >
                            <h3 className="text-2xl font-bold text-white/90 mb-6">
                                {workflow.title}
                            </h3>

                            <div className="space-y-4 mb-8">
                                {workflow.steps.map((step, stepIdx) => (
                                    <div key={stepIdx} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-1/10 flex items-center justify-center text-accent-1">
                                            {step.icon}
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <p className="text-white/80">{step.text}</p>
                                        </div>
                                        {stepIdx < workflow.steps.length - 1 && (
                                            <ArrowRight className="w-4 h-4 text-white/30 mt-2" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="px-4 py-3 bg-accent/10 rounded-lg border border-accent/20">
                                <p className="text-sm text-accent font-semibold text-center">
                                    ✨ {workflow.benefit}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
