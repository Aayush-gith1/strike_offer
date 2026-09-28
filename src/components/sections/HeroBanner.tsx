import React from "react";
import { motion } from "motion/react";
import { useUserSession } from "@/store/userSessionStore";
import { useOnboardingTour } from "@/hooks/useOnboardingTour";
import { useSaleExperience } from "@/store/saleExperienceStore";
import { trackButtonClick } from "@/lib/metaPixel";

export const HeroBanner: React.FC = () => {
  const { isAuthenticated } = useUserSession();
  const { startOnboardingTour } = useOnboardingTour();
  const isArrowLaunching = useSaleExperience((state) => state.isArrowLaunching);
  const triggerArrowStrike = useSaleExperience((state) => state.triggerArrowStrike);

  const handleJoinClick = () => {
    trackButtonClick("Join Us", "Hero Section");
    const element = document.getElementById("courses");
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      startOnboardingTour();
    }
  };

  const handleWatchVideoClick = () => {
    trackButtonClick("Watch Video", "Hero Section");
    const element = document.getElementById("courses");
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-start overflow-hidden bg-black select-none">
      {/* ── Background Graphic: Ramayana Battle Scene (Ram on Left, Ravan on Right) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/newbg.png"
          alt="Diwali Strike Battle - Lord Ram and Ravan"
          className="w-full h-full object-cover object-[40%_center] md:object-center"
          fetchPriority="high"
        />

        {/* Subtle cinematic radial vignette to keep Ram and Ravan in full glorious focus */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.35) 90%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Top gradient to seamlessly blend under the navbar */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/85 via-black/30 to-transparent pointer-events-none" />

        {/* Bottom gradient to blend into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* ── Hero Foreground Content Styled Exactly as Screenshot ── */}
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:pl-16 xl:pl-20 pt-20 sm:pt-24 pb-8 pointer-events-none">
        <div className="relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[540px] xl:max-w-[580px] text-left">
          {/* Ambient Contrast Scrim behind text */}
          <div className="absolute -inset-10 bg-gradient-to-r from-black/90 via-black/60 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Eyebrow: THIS DIWALI — */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,1)]"
          >
            <span className="text-[#f5c358] text-xs sm:text-sm tracking-[0.3em] font-bold uppercase font-sans">
              THIS DIWALI
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-gradient-to-r from-[#f5c358] to-transparent" />
          </motion.div>

          {/* Main Heading: Audiowide with Cyan/Teal Glowing Backdrop Box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 sm:mb-5 font-audiowide select-none"
          >
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-[34px] text-[#9ca3af] font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Take control of your
            </span>

            <div className="relative inline-block mt-2 sm:mt-3">
              {/* Cyan / Ice-Blue Glow Halo matching user's screenshot */}
              <div
                className="absolute -inset-x-6 -inset-y-3 rounded-lg pointer-events-none -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(38, 92, 102, 0.55) 0%, rgba(18, 52, 60, 0.3) 55%, transparent 80%)",
                  filter: "blur(14px)",
                }}
              />
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-wide leading-tight drop-shadow-[0_0_24px_rgba(125,211,252,0.35)] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                Future With Strike
              </span>
            </div>
          </motion.div>

          {/* Subtitle from the screenshot */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="text-zinc-300 text-xs sm:text-sm md:text-base font-sans font-light leading-relaxed mb-6 sm:mb-7 max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,1)]"
          >
            Master DSA, System Design & AI with interactive coding environments
          </motion.p>

          {/* Action Buttons: Join Us + Watch Video */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5 mb-6 pointer-events-auto"
          >
            <button
              onClick={handleJoinClick}
              className="px-8 py-2.5 sm:px-9 sm:py-3 rounded-full text-white font-medium text-xs sm:text-sm bg-gradient-to-b from-[#2e3238] via-[#1d2024] to-[#121316] hover:from-[#3a3f47] hover:to-[#1a1c20] border border-white/20 hover:border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.85)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Join Us
            </button>

            <button
              onClick={handleWatchVideoClick}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-zinc-300 hover:text-white font-medium text-xs sm:text-sm bg-black/50 hover:bg-black/80 border border-white/15 hover:border-white/30 backdrop-blur-md shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2.5 group"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-white/30 group-hover:border-amber-400 group-hover:bg-amber-400/15 transition-all duration-300">
                <svg className="w-2.5 h-2.5 fill-white ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>Watch Video</span>
            </button>
          </motion.div>

          {/* Quote with Glowing Golden Vertical Accent */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="border-l-2 border-[#f5c358] pl-3.5 sm:pl-4 py-1 max-w-sm drop-shadow-[0_4px_16px_rgba(0,0,0,1)]"
          >
            <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed font-light font-sans">
              “Defeat your{" "}
              <span className="text-[#f5c358] font-normal not-italic">
                inner Ravan
              </span>
              ,<br />
              Ignite a{" "}
              <span className="text-[#f5c358] font-normal not-italic">
                brighter you
              </span>{" "}
              this Diwali.”
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Interactive Brahmastra in Lord Ram's Bow (Aimed Right at Ravan) ── */}
      <div className="absolute left-[50%] sm:left-[54%] md:left-[58%] lg:left-[61%] xl:left-[62%] top-[46%] sm:top-[47%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto select-none">
        <div
          onClick={() => {
            if (!isArrowLaunching) triggerArrowStrike();
          }}
          role="button"
          tabIndex={0}
          aria-label="Brahmastra - Tap to Unleash towards Ravan"
          className="group relative flex flex-col items-center cursor-pointer outline-none"
        >
          {/* Subtle Divine Golden Ambient Warmth around Ram's Bow */}
          <div
            className={`absolute -inset-8 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-400/10 to-transparent blur-3xl pointer-events-none transition-all duration-500 ${
              isArrowLaunching ? "opacity-0 scale-150" : "opacity-60 group-hover:opacity-100"
            }`}
          />

          {/* Brahmastra Arrow - Perfectly seated in Ram's Bow */}
          <div
            className={`relative flex items-center justify-center transition-all ${
              isArrowLaunching
                ? "translate-x-16 opacity-0 scale-110 duration-200 ease-out"
                : "translate-x-0 opacity-100 duration-500 group-hover:translate-x-3 group-hover:scale-[1.03]"
            }`}
          >
            {/* The Authentic Brahmastra Arrow Asset - Pointing RIGHT towards Ravan */}
            <img
              src="/brahmastra-arrow.png"
              alt="Brahmastra Celestial Arrow in Ram's Bow"
              className="w-48 sm:w-56 md:w-68 lg:w-76 xl:w-80 max-w-none h-auto object-contain drop-shadow-[0_2px_12px_rgba(245,158,11,0.55)] group-hover:drop-shadow-[0_4px_22px_rgba(251,191,36,0.85)] transition-all duration-300"
            />
          </div>

          {/* Ultra-Clean, Sleek Glassmorphic CTA Capsule */}
          <div
            className={`mt-3 sm:mt-4 px-4 py-1.5 rounded-full bg-black/60 group-hover:bg-black/85 border border-white/15 group-hover:border-amber-400/50 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.85)] group-hover:shadow-[0_8px_30px_rgba(245,158,11,0.25)] transition-all duration-300 flex items-center gap-2.5 select-none ${
              isArrowLaunching ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.18em] font-semibold text-amber-300/90 uppercase">
                BRAHMASTRA
              </span>
            </div>

            <span className="w-1 h-1 rounded-full bg-white/20" />

            <div className="flex items-center gap-1.5 text-xs font-sans text-zinc-300 group-hover:text-white transition-colors">
              <span className="font-medium tracking-wide">Tap to Unleash</span>
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
