"use client";

export default function LogoSlider() {
    const platforms = [
        "LinkedIn",
        "Naukri",
        "Indeed",
        "Wellfound",
        "Glassdoor",
        "Monster",
        "Cutshort",
    ];

    return (
        <section className="py-24 px-4 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] overflow-hidden">
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-4">
                    Post Once, <span className="gradient-text">Reach Everywhere</span>
                </h2>
                <p className="text-xl text-white/60">
                    Automatically distribute your jobs across all major platforms
                </p>
            </div>

            <div className="relative">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

                {/* Scrolling container */}
                <div className="flex overflow-hidden">
                    <div className="flex animate-scroll">
                        {/* First set */}
                        {platforms.map((platform, idx) => (
                            <div
                                key={`first-${idx}`}
                                className="flex-shrink-0 mx-8 px-12 py-8 glass-effect rounded-xl grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 hover:border-accent/30"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-white/80">
                                    {platform}
                                </div>
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {platforms.map((platform, idx) => (
                            <div
                                key={`second-${idx}`}
                                className="flex-shrink-0 mx-8 px-12 py-8 glass-effect rounded-xl grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 hover:border-accent/30"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-white/80">
                                    {platform}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
