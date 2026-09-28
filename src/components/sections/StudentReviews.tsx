import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  CheckCircle2,
  ArrowRight,
  X,
  Briefcase,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { studentReviewsData } from "@/data/studentReviewsData";
import type { StudentReview } from "@/types";

export const StudentReviews: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeReview, setActiveReview] = useState<StudentReview | null>(null);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    if (selectedFilter === "all") return studentReviewsData;
    return studentReviewsData.filter((r) => r.category === selectedFilter);
  }, [selectedFilter]);

  // Split into two staggered rows for rich continuous stream
  const rowOne = useMemo(() => {
    return filteredReviews.filter((_, idx) => idx % 2 === 0);
  }, [filteredReviews]);

  const rowTwo = useMemo(() => {
    return filteredReviews.filter((_, idx) => idx % 2 !== 0);
  }, [filteredReviews]);

  // Ensure enough items for seamless infinite marquee loop (minimum 6 items per half)
  const marqueeRowOne = useMemo(() => {
    if (rowOne.length === 0) return [];
    let items = [...rowOne];
    while (items.length < 6) {
      items = [...items, ...rowOne];
    }
    return [...items, ...items];
  }, [rowOne]);

  const marqueeRowTwo = useMemo(() => {
    if (rowTwo.length === 0) return [];
    let items = [...rowTwo];
    while (items.length < 6) {
      items = [...items, ...rowTwo];
    }
    return [...items, ...items];
  }, [rowTwo]);

  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-24 bg-black border-t border-b border-zinc-900 overflow-hidden"
      aria-label="Student Testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* ── Section Header: Clean, Human, Editorial ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Alumni Career Outcomes</span>
          </div>

          {/* Clean Heading without tacky multi-color gradients */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Real Stories, Real Success
          </h2>

          {/* Thoughtful, Human Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            See how our guided curriculums helped students crack top product companies,
            switch branches, and land life-changing career opportunities.
          </p>

          {/* Understated Trust Metrics Strip */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400 border-t border-b border-zinc-800/60 py-3.5">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.95/5</span>
              <span>from 3,500+ reviews</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white">88%</span>
              <span>placement & switch rate</span>
            </div>

            <div className="flex items-center gap-1.5 hidden sm:flex">
              <span className="font-semibold text-white">₹38 LPA</span>
              <span>top verified package</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
            {[
              { id: "all", label: "All Stories" },
              { id: "faang", label: "FAANG & Tier 1" },
              { id: "switch", label: "Career Switchers" },
              { id: "fresher", label: "Non-CS / Freshers" },
              { id: "high-package", label: "High CTC (20+ LPA)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedFilter === tab.id
                    ? "bg-zinc-800 text-white border border-zinc-700"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right-to-Left Marquee Tracks (Smooth continuous glide) ── */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle Edge Gradient Fade Masks blending into pure black */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-20" />

        <div className="flex flex-col gap-4 py-2">
          {/* Row 1 (Right to Left) */}
          <div className="w-full overflow-hidden">
            <div className="animate-testimonial-left flex gap-4 pl-4">
              {marqueeRowOne.map((review, index) => (
                <TestimonialCard
                  key={`row1-${review.id}-${index}`}
                  review={review}
                  onSelect={() => setActiveReview(review)}
                />
              ))}
            </div>
          </div>

          {/* Row 2 (Right to Left, slightly offset pace) */}
          <div className="w-full overflow-hidden">
            <div className="animate-testimonial-left-slow flex gap-4 pl-4">
              {marqueeRowTwo.map((review, index) => (
                <TestimonialCard
                  key={`row2-${review.id}-${index}`}
                  review={review}
                  onSelect={() => setActiveReview(review)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quiet footer hint */}
        <div className="text-center pt-3">
          <span className="text-[11px] text-zinc-500">
            Click any story for full interview breakdown & placement journey
          </span>
        </div>
      </div>

      {/* ── Story Spotlight Modal: Human & Clean ── */}
      <AnimatePresence>
        {activeReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setActiveReview(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative z-10 w-full max-w-xl bg-[#111216] border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveReview(null)}
                className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer"
                aria-label="Close story"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Student Header */}
              <div className="flex items-start gap-4 pb-5 border-b border-zinc-800/80">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.name}
                  className="w-14 h-14 rounded-full object-cover border border-zinc-700 shrink-0"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{activeReview.name}</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Alumni
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 mt-0.5 font-medium">
                    {activeReview.role}
                    {activeReview.company && (
                      <span className="text-zinc-400"> @ {activeReview.company}</span>
                    )}
                  </p>

                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{activeReview.cohort}</span>
                  </p>
                </div>
              </div>

              {/* Career Milestone Summary */}
              <div className="grid grid-cols-3 gap-2.5 my-5">
                <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-zinc-400" />
                    <span>Previous</span>
                  </div>
                  <div className="text-xs font-medium text-zinc-200 truncate">
                    {activeReview.previousRole || "Fresher"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-amber-400" />
                    <span>Offer</span>
                  </div>
                  <div className="text-xs font-semibold text-white truncate">
                    {activeReview.package || "Product Offer"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                    Career Jump
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 truncate">
                    {activeReview.hike || "Placed"}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 mb-5">
                <Quote className="w-5 h-5 text-zinc-600 mb-2 rotate-180" />
                <p className="text-sm text-zinc-200 leading-relaxed italic">
                  "{activeReview.testimonial}"
                </p>
              </div>

              {/* Skills Mastered */}
              {activeReview.skills && activeReview.skills.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Key Topics Mastered
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeReview.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-zinc-400 ml-1">5.0 Verified Review</span>
                </div>

                <a
                  href="#courses"
                  onClick={() => setActiveReview(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>View Curriculums</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ── Testimonial Card Component (Matte, Editorial, Human) ──
interface CardProps {
  review: StudentReview;
  onSelect: () => void;
}

const TestimonialCard: React.FC<CardProps> = ({ review, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group relative w-[340px] sm:w-[380px] shrink-0 rounded-xl bg-[#111216] border border-zinc-800/90 hover:border-zinc-700 p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Card Header: Avatar, Name, Company Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <img
              src={review.avatar}
              alt={review.name}
              loading="lazy"
              decoding="async"
              className="w-10 h-10 rounded-full object-cover border border-zinc-700 shrink-0"
            />
            <div>
              <h4 className="text-white text-sm font-semibold leading-tight group-hover:text-amber-300 transition-colors">
                {review.name}
              </h4>
              <p className="text-[12px] text-zinc-400 mt-0.5">{review.role}</p>
            </div>
          </div>

          {/* Clean Neutral Company Pill */}
          {review.company && (
            <span className="shrink-0 px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
              {review.company}
            </span>
          )}
        </div>

        {/* Transition Path (Clean & Subtle) */}
        {review.previousRole && (
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800 mb-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="truncate">{review.previousRole}</span>
            <ArrowRight className="w-2.5 h-2.5 text-zinc-500 shrink-0" />
            <span className="text-white font-medium truncate">
              {review.role} @ {review.company}
            </span>
          </div>
        )}

        {/* 5-Star Rating (Clean gold stars, no gaudy drop shadow) */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Testimonial Quote */}
        <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed italic line-clamp-3 mb-4">
          "{review.testimonial}"
        </p>
      </div>

      {/* Card Footer: Clean Package & Read Link */}
      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          {review.package && (
            <span className="font-semibold text-white font-mono text-[11px] bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700/60">
              {review.package}
            </span>
          )}
          {review.hike && (
            <span className="text-[11px] text-emerald-400 font-medium">
              {review.hike}
            </span>
          )}
        </div>

        <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 transition-colors flex items-center gap-1">
          <span>Read story</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};

export default StudentReviews;
