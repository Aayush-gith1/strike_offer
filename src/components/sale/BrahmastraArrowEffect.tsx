import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSaleExperience } from "@/store/saleExperienceStore";

export const BrahmastraArrowEffect: React.FC = () => {
  const isArrowLaunching = useSaleExperience((state) => state.isArrowLaunching);

  // Subtle, delicate golden stardust embers (refined, micro-sparkles)
  const sparkles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i * (360 / 18) + (i % 2) * 10) * (Math.PI / 180);
      const distance = 80 + ((i * 23) % 110);
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const size = i % 3 === 0 ? 3 : 2;
      const delay = 0.34 + (i % 3) * 0.02;

      return { id: i, tx, ty, size, delay };
    });
  }, []);

  if (!isArrowLaunching) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] pointer-events-none flex items-center justify-center overflow-hidden select-none">
        {/* Sleek, understated cinematic vignette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.7, 0] }}
          transition={{ duration: 0.9, times: [0, 0.15, 0.7, 1], ease: "easeInOut" }}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        />

        {/* ── High-Speed Celestial Light Beam (From Ram's Bow across to Ravan) ── */}
        <div className="absolute left-[54%] sm:left-[58%] right-[14%] sm:right-[18%] top-[45%] sm:top-[46%] -translate-y-1/2 overflow-hidden h-6 flex items-center pointer-events-none">
          <motion.div
            initial={{ scaleX: 0, originX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 0],
              originX: [0, 0, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.38,
              times: [0, 0.7, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-[2px] bg-gradient-to-r from-amber-400 via-yellow-200 to-white shadow-[0_0_20px_#fde047]"
          />
        </div>

        {/* ── Refined Celestial Detonation on Ravan (Right Side) ── */}
        <div className="absolute right-[14%] sm:right-[17%] md:right-[18%] top-[44%] sm:top-[45%] -translate-y-1/2 flex items-center justify-center pointer-events-none">
          {/* Crisp, pinpoint flash */}
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: [0.1, 2.2, 0], opacity: [0, 1, 0] }}
            transition={{ delay: 0.32, duration: 0.35, ease: "easeOut" }}
            className="w-20 h-20 rounded-full bg-white blur-sm shadow-[0_0_60px_#ffffff]"
          />

          {/* Primary crisp golden shockwave ring */}
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: [0.1, 3.2, 4.5], opacity: [0, 0.9, 0] }}
            transition={{ delay: 0.33, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-36 h-36 rounded-full border border-amber-300/80 shadow-[0_0_35px_rgba(251,191,36,0.6)]"
          />

          {/* Secondary delicate outer ring */}
          <motion.div
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{ scale: [0.15, 2.6, 3.8], opacity: [0, 0.6, 0] }}
            transition={{ delay: 0.37, duration: 0.45, ease: "easeOut" }}
            className="w-32 h-32 rounded-full border border-yellow-200/50 shadow-[0_0_25px_rgba(254,240,138,0.4)]"
          />

          {/* Delicate golden stardust sparkles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {sparkles.map((s) => (
              <motion.div
                key={`sparkle-${s.id}`}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: [0, s.tx],
                  y: [0, s.ty],
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  delay: s.delay,
                  duration: 0.42,
                  ease: "easeOut",
                }}
                style={{ width: `${s.size}px`, height: `${s.size}px` }}
                className="absolute rounded-full bg-amber-200 shadow-[0_0_8px_#fde047]"
              />
            ))}
          </div>

          {/* Soft ambient golden warmth that melts into the modal */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 2, 0], opacity: [0, 0.4, 0] }}
            transition={{ delay: 0.34, duration: 0.5, ease: "easeOut" }}
            className="w-64 h-64 rounded-full bg-amber-400/20 blur-3xl"
          />
        </div>

        {/* Subtle, fast ambient flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.25, 0] }}
          transition={{ delay: 0.33, duration: 0.22, ease: "easeOut" }}
          className="absolute inset-0 bg-amber-300/15 pointer-events-none"
        />
      </div>
    </AnimatePresence>
  );
};

export default BrahmastraArrowEffect;
