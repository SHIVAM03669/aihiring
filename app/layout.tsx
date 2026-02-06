import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "RecruiterAI - AI-Powered Recruiting Platform",
    description: "Hire better, faster with AI. Automate screening, scheduling, and interviews. Join 500+ companies hiring smarter.",
    keywords: "AI recruiting, recruitment software, hiring automation, applicant tracking",
    openGraph: {
        title: "RecruiterAI - AI-Powered Recruiting Platform",
        description: "Hire better, faster with AI. Automate screening, scheduling, and interviews.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <LenisProvider>{children}</LenisProvider>
            </body>
        </html>
    );
}
