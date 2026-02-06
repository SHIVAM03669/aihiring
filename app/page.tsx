import RecruiterScroll from "@/components/RecruiterScroll";
import HowItWorks from "@/components/HowItWorks";
import ImpactMetrics from "@/components/ImpactMetrics";
import LogoSlider from "@/components/LogoSlider";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <main className="min-h-screen bg-black">
            {/* Navigation */}
            <Navbar />

            {/* Section 1: Scrollytelling Hero */}
            <RecruiterScroll />

            {/* Section 2: How RecruiterAI Solves This */}
            <div id="how-it-works">
                <HowItWorks />
            </div>

            {/* Section 3: Impact & Results */}
            <div id="features">
                <ImpactMetrics />
            </div>

            {/* Section 4: Hire From Anywhere */}
            <LogoSlider />

            {/* Section 5: Testimonials */}
            <div id="testimonials">
                <Testimonials />
            </div>

            {/* Section 6: FAQ */}
            <FAQ />

            {/* Section 7: Final CTA */}
            <FinalCTA />

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-white/10 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto text-center text-white/40 text-sm">
                    <p>© 2026 RecruiterAI. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
