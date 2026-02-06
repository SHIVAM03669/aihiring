"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with optimal settings
        const lenis = new Lenis({
            duration: 1.2, // Smooth scroll duration  
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing (expo out)
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            autoResize: true, // Automatically resize on window resize
        });

        lenisRef.current = lenis;

        // RAF loop for Lenis - Single source of scroll truth
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
