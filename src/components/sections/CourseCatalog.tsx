import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, BookOpen, Users, ArrowRight } from "lucide-react";
import { courseCatalogData } from "@/data/courseCatalogData";

export const CourseCatalog: React.FC = () => {
  return (
    <section
      id="courses"
      className="w-full py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-8 bg-black border-t border-b border-zinc-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header: Clean, Human, Editorial ── */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Curated Learning Tracks</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            What We Offer
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Industry-tested curriculums taught from first principles, structured to take you from foundational fundamentals to production-scale engineering.
          </p>
        </div>

        {/* ── Cards Grid: Clean, Matte, Editorial ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {courseCatalogData.map((course) => (
            <motion.div
              key={course.courseId}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Link
                to={`/course/${course.courseId}`}
                aria-label={`View ${course.title}`}
                className="group flex flex-col justify-between h-full rounded-2xl bg-[#111216] border border-zinc-800/80 hover:border-zinc-700 overflow-hidden transition-all duration-200 cursor-pointer"
              >
                <div>
                  {/* Course Thumbnail Banner */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-transparent to-black/20" />

                    {/* Status Pill (Live / Upcoming) */}
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          course.badgeLabel === "Upcoming" ? "bg-amber-400" : "bg-emerald-400"
                        }`}
                      />
                      <span>{course.badgeLabel || "Live Cohort"}</span>
                    </span>

                    {/* Popular Pill */}
                    {course.isPopular && (
                      <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md bg-amber-400 text-zinc-950 font-bold text-[10px]">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Course Content Details */}
                  <div className="p-5 sm:p-6">
                    {/* Meta Row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-3">
                      {course.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{course.duration}</span>
                        </span>
                      )}
                      {course.stats && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{course.stats}</span>
                        </span>
                      )}
                      {course.level && (
                        <span className="text-[11px] text-zinc-500 truncate max-w-[150px]">
                          • {course.level}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 leading-snug group-hover:text-amber-400 transition-colors">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 sm:px-6 py-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Users className="w-3.5 h-3.5" />
                    <span>{course.enrolledStudents} enrolled</span>
                  </div>

                  <span className="font-medium text-zinc-300 group-hover:text-amber-400 transition-colors flex items-center gap-1">
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCatalog;
