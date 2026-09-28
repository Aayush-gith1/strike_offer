import React from "react";
import { motion } from "framer-motion";

export const ValueProps: React.FC = () => {
  return (
    <section
      id="why-choose-us"
      className="w-full py-20 sm:py-24 md:py-28 px-4 sm:px-6 bg-black border-t border-b border-zinc-900 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header: Clean, Human, Editorial ── */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Core Advantages</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Why Choose Us
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Learn smarter with first-principles teaching, guided roadmaps, and an interactive platform
            built to help you master engineering concepts faster.
          </p>
        </div>

        {/* ── 4 Feature Cards Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-6xl mx-auto">
          {/* ── Card 1: Interview Preparation (Top Left) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-[#27272a] bg-black p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[340px] sm:min-h-[380px]"
          >
            <div>
              <h3 className="text-lg sm:text-xl text-white font-normal mb-1.5 tracking-tight">
                <span className="font-bold text-white">Interview</span> Preparation
              </h3>
              <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed max-w-xs">
                Learn faster with hands-on tracks and mentor feedback.
              </p>
            </div>

            {/* Centered Line-Art Illustration */}
            <div className="relative w-full flex-1 flex items-center justify-center pt-4 pb-2 overflow-hidden">
              <img
                src="https://dolia18uq98lp.cloudfront.net/sale-icons/7ebc7314-dcfe-4e82-a2cb-677df6f9c57e.jpg"
                alt="Interview Preparation"
                className="max-h-48 sm:max-h-56 w-auto object-contain pointer-events-none"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* ── Card 2: AI Support (Top Right) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-[#27272a] bg-black p-6 sm:p-8 flex flex-col items-center justify-between overflow-hidden min-h-[340px] sm:min-h-[380px]"
          >
            <h3 className="text-lg sm:text-xl text-white font-bold text-center tracking-tight">
              AI Support
            </h3>

            {/* Centered 3D AI Robot Video */}
            <div className="relative w-full flex-1 flex items-center justify-center pt-2 overflow-hidden">
              <video
                ref={(el) => {
                  if (el) {
                    el.muted = true;
                    el.play().catch(() => {});
                  }
                }}
                src="https://dolia18uq98lp.cloudfront.net/Videos/website_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="max-h-56 sm:max-h-64 w-auto object-contain pointer-events-none"
              />
            </div>
          </motion.div>

          {/* ── Card 3: Projects Based Learning (Bottom Left) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-4 rounded-2xl sm:rounded-3xl border border-[#27272a] bg-black p-6 sm:p-8 flex flex-col items-center justify-between overflow-hidden min-h-[340px] sm:min-h-[380px]"
          >
            <h3 className="text-lg sm:text-xl text-white text-center tracking-tight">
              <span className="font-bold">Projects</span> Based Learning
            </h3>

            {/* Centered Flowchart & Robot Hand Video */}
            <div className="relative w-full flex-1 flex items-center justify-center pt-3 overflow-hidden">
              <video
                ref={(el) => {
                  if (el) {
                    el.muted = true;
                    el.play().catch(() => {});
                  }
                }}
                src="https://dolia18uq98lp.cloudfront.net/Videos/website_video2.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="max-h-52 sm:max-h-60 w-auto object-contain pointer-events-none"
              />
            </div>
          </motion.div>

          {/* ── Card 4: Track Your Progress (Bottom Right) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            className="lg:col-span-8 rounded-2xl sm:rounded-3xl border border-[#27272a] bg-black p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[340px] sm:min-h-[380px]"
          >
            {/* Header with Title and Live Badge */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Track Your Progress
                </h3>
                <p className="text-xs sm:text-[13px] font-semibold text-emerald-400 mt-0.5">
                  Grow With Strike
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 text-[11px] sm:text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span>Live Progress Tracking</span>
              </div>
            </div>

            {/* Visual Neon Green Chart Area */}
            <div className="relative w-full mt-4 flex items-end">
              <svg
                viewBox="0 0 620 220"
                className="w-full h-auto overflow-visible select-none"
                fill="none"
              >
                <defs>
                  {/* Subtle Grid Pattern */}
                  <linearGradient id="chartNeonGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                  </linearGradient>

                  <filter id="neonPulseGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Y-Axis Labels */}
                <text x="18" y="24" fill="#52525b" fontSize="10" fontFamily="sans-serif">100%</text>
                <text x="22" y="68" fill="#52525b" fontSize="10" fontFamily="sans-serif">75%</text>
                <text x="22" y="112" fill="#52525b" fontSize="10" fontFamily="sans-serif">50%</text>
                <text x="22" y="156" fill="#52525b" fontSize="10" fontFamily="sans-serif">25%</text>

                {/* Horizontal reference grid lines */}
                <line x1="56" y1="20" x2="590" y2="20" stroke="#18181b" strokeWidth="1" />
                <line x1="56" y1="64" x2="590" y2="64" stroke="#18181b" strokeWidth="1" />
                <line x1="56" y1="108" x2="590" y2="108" stroke="#18181b" strokeWidth="1" />
                <line x1="56" y1="152" x2="590" y2="152" stroke="#18181b" strokeWidth="1" />

                {/* 7 Vertical Bar Columns (Mon - Sun) */}
                {[
                  { day: "Mon", x: 88, barH: 34 },
                  { day: "Tue", x: 168, barH: 42 },
                  { day: "Wed", x: 248, barH: 30 },
                  { day: "Thu", x: 328, barH: 48 },
                  { day: "Fri", x: 408, barH: 42 },
                  { day: "Sat", x: 488, barH: 34 },
                  { day: "Sun", x: 568, barH: 52 },
                ].map((item, idx) => (
                  <g key={idx}>
                    {/* Dark pill container slot */}
                    <rect
                      x={item.x - 14}
                      y="142"
                      width="28"
                      height="58"
                      rx="7"
                      fill="#141416"
                    />
                    {/* Bright neon green bar inside slot */}
                    <rect
                      x={item.x - 14}
                      y={200 - item.barH}
                      width="28"
                      height={item.barH}
                      rx="7"
                      fill="#86efac"
                    />
                    {/* Day label */}
                    <text
                      x={item.x}
                      y="214"
                      textAnchor="middle"
                      fill="#71717a"
                      fontSize="10"
                      fontFamily="sans-serif"
                    >
                      {item.day}
                    </text>
                  </g>
                ))}

                {/* Shaded Area under glowing trend line */}
                <path
                  d="M 88 152 C 128 150, 138 142, 168 140 C 208 136, 218 122, 248 120 C 288 116, 298 102, 328 98 C 368 94, 378 84, 408 80 C 448 76, 458 66, 488 62 C 528 58, 545 32, 568 24 L 568 200 L 88 200 Z"
                  fill="url(#chartNeonGlow)"
                />

                {/* Glowing Green Progress Trend Line */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  d="M 88 152 C 128 150, 138 142, 168 140 C 208 136, 218 122, 248 120 C 288 116, 298 102, 328 98 C 368 94, 378 84, 408 80 C 448 76, 458 66, 488 62 C 528 58, 545 32, 568 24"
                  stroke="#4ade80"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 8px rgba(74,222,128,0.65))"
                />

                {/* Glowing Dots along line */}
                {[
                  { cx: 88, cy: 152 },
                  { cx: 168, cy: 140 },
                  { cx: 248, cy: 120 },
                  { cx: 328, cy: 98 },
                  { cx: 408, cy: 80 },
                  { cx: 488, cy: 62 },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="4"
                    fill="#4ade80"
                    stroke="#000"
                    strokeWidth="1.5"
                    filter="drop-shadow(0 0 5px rgba(74,222,128,0.8))"
                  />
                ))}

                {/* Final Glowing Head Node at Sunday */}
                <circle
                  cx="568"
                  cy="24"
                  r="10"
                  fill="#22c55e"
                  opacity="0.35"
                  className="animate-ping"
                />
                <circle
                  cx="568"
                  cy="24"
                  r="7"
                  fill="#4ade80"
                  opacity="0.6"
                  filter="url(#neonPulseGlow)"
                />
                <circle
                  cx="568"
                  cy="24"
                  r="4.5"
                  fill="#bbf7d0"
                  stroke="#16a34a"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
