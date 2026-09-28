import React, { useState } from "react";
import { motion } from "motion/react";
import { mentorProfilesData } from "@/data/mentorProfilesData";

export const MentorProfiles: React.FC = () => {
  const [hoveredMentor, setHoveredMentor] = useState<number | null>(null);

  const handleStartLearning = () => {
    const coursesSection = document.getElementById("courses");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="instructors" className="py-12 sm:py-16 md:py-20" aria-label="Meet our mentors">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-audiowide text-gray-100 font-black"
            style={{ fontFamily: "'Audiowide', cursive" }}
          >
            Meet With Our Mentors
          </h2>
        </div>

        {/* Mentors Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 justify-center items-center">
          {mentorProfilesData.map((instructor, index) => {
            const showDetails = hoveredMentor === index;

            return (
              <div
                key={instructor.id}
                className="relative w-full sm:w-[350px] md:w-[380px] lg:w-[400px] h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px] border border-zinc-800 bg-[#0d0f12]/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 overflow-hidden shadow-2xl hover:border-zinc-700"
                onMouseEnter={() => setHoveredMentor(index)}
                onMouseLeave={() => setHoveredMentor(null)}
              >
                {/* ── Front Face: Avatar, Name & Role ── */}
                <div
                  className={`absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center transition-all duration-300 ${
                    showDetails ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full border-2 sm:border-3 md:border-4 border-zinc-700 overflow-hidden mb-4 sm:mb-5 md:mb-6 shadow-xl">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl md:text-2xl font-bold text-white mb-2 font-audiowide text-center px-2"
                    style={{ fontFamily: "'Audiowide', cursive" }}
                  >
                    {instructor.name}
                  </h3>
                  <p className="text-gray-400 text-base sm:text-lg text-center px-2">
                    {instructor.role}
                  </p>
                </div>

                {/* ── Back Face: Details, Biography, Badges & Actions ── */}
                <motion.div
                  className={`absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-[#0a0c0f] ${
                    showDetails ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                  initial="hidden"
                  animate={showDetails ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.05,
                      },
                    },
                  }}
                >
                  <div className="space-y-3 sm:space-y-4 md:space-y-5">
                    {/* Header */}
                    <motion.div
                      className="text-center mb-2 sm:mb-3"
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1 },
                      }}
                    >
                      <h3
                        className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 font-audiowide"
                        style={{ fontFamily: "'Audiowide', cursive" }}
                      >
                        {instructor.name}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base">
                        {instructor.role}
                      </p>
                    </motion.div>

                    {/* Biography text */}
                    <motion.p
                      className="text-gray-300 text-xs sm:text-sm leading-relaxed text-center sm:text-left"
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1 },
                      }}
                    >
                      {instructor.description}
                    </motion.p>

                    {/* Credentials / Badges */}
                    <motion.div
                      className="flex flex-wrap gap-2 justify-center pt-1"
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: { staggerChildren: 0.06 },
                        },
                      }}
                    >
                      <motion.span
                        variants={{ hidden: { scale: 0.85, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                        className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-zinc-700 to-zinc-800 border border-zinc-600/40 text-white text-[11px] sm:text-xs rounded-full shadow-sm"
                      >
                        {instructor.company}
                      </motion.span>
                      <motion.span
                        variants={{ hidden: { scale: 0.85, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                        className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-zinc-600 to-zinc-700 border border-zinc-500/40 text-white text-[11px] sm:text-xs rounded-full shadow-sm"
                      >
                        {instructor.education}
                      </motion.span>
                      <motion.span
                        variants={{ hidden: { scale: 0.85, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                        className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-zinc-500 to-zinc-600 border border-zinc-400/40 text-white text-[11px] sm:text-xs rounded-full shadow-sm"
                      >
                        {instructor.package}
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-4 sm:mt-6"
                    variants={{
                      hidden: { y: 15, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleStartLearning}
                      className="px-4 sm:px-5 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all text-xs sm:text-sm w-full sm:w-1/2 cursor-pointer shadow-md hover:scale-105 active:scale-95 duration-200"
                    >
                      Start Learning
                    </button>
                    <a
                      href={instructor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 sm:px-5 py-2 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all text-xs sm:text-sm w-full sm:w-1/2 text-center cursor-pointer shadow-md hover:scale-105 active:scale-95 duration-200 flex items-center justify-center"
                    >
                      Know More
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MentorProfiles;
