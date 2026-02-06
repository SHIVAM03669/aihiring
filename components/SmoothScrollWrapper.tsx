"use client";

import { useEffect, ReactNode } from "react";

export default function SmoothScrollWrapper({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Simple smooth scroll using CSS
        document.documentElement.style.scrollBehavior = "smooth";

        return () => {
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return <>{children}</>;
}
