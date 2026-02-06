import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Official RecruiterAI Color Palette
                accent: {
                    DEFAULT: "#3B82F6", // Primary
                    1: "#A5D8FF", // Light blue - icons, indicators
                    2: "#D0BCFF", // Lavender - metrics, highlights
                    3: "#B197FC", // Purple - hover states
                },
                primary: "#3B82F6",
                dark: {
                    bg: "#000000", // Main background
                    "bg-secondary": "#404040", // Cards, blocks
                    secondary: "#737373", // Borders, dividers
                },
                light: {
                    secondary: "#F3F4F6",
                },
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.6s ease-out",
                "slide-in": "slideIn 0.6s ease-out",
                "scroll": "scroll 40s linear infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideIn: {
                    "0%": { transform: "translateX(-20px)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                scroll: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
