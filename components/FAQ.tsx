"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "How does AI screening work?",
            answer:
                "Our AI analyzes resumes against your job requirements, scoring candidates on skills, experience, and culture fit. You can customize screening criteria and the AI learns from your decisions.",
        },
        {
            question: "Does RecruiterAI integrate with ATS?",
            answer:
                "Yes, we integrate with major ATS platforms including Greenhouse, Lever, and Workday. You can also use RecruiterAI as a standalone solution.",
        },
        {
            question: "What's the pricing structure?",
            answer:
                "We offer flexible pricing based on hiring volume. Plans start at $299/month for up to 100 applications. Contact us for custom enterprise pricing.",
        },
        {
            question: "How long does setup take?",
            answer:
                "Most teams are up and running in under 30 minutes. Simply connect your email, define your hiring workflow, and start screening candidates.",
        },
        {
            question: "Is candidate data secure?",
            answer:
                "Absolutely. We're SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest and in transit.",
        },
    ];

    return (
        <section className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-4">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="text-xl text-white/60">
                        Everything you need to know about RecruiterAI
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="glass-effect rounded-xl overflow-hidden hover:border-accent/30 transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg font-semibold text-white/90 pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-accent-3 flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-white/70 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
