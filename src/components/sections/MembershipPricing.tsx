import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, Check, Flame, Timer } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import { membershipPlansData } from "@/data/membershipPlansData";
import { computeSalePrice, getActiveSaleOffer, getSalePercent, isSaleWindowLive, useCountdown, pad } from "@/lib/pricingCalculator";
import { useSaleExperience } from "@/store/saleExperienceStore";
import type { MembershipPlanTier, SpecialPromotionalOffer } from "@/types";

const toNumber = (v: number | string) => Math.round(Number(v) || 0);

interface PromoBannerProps {
  offer: SpecialPromotionalOffer;
  isGold?: boolean;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ offer, isGold = false }) => {
  const percent = getSalePercent(offer);
  const { hours, minutes, seconds } = useCountdown(offer.endAt);
  const expired = hours <= 0 && minutes <= 0 && seconds <= 0;
  if (expired) return null;

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${
        isGold ? "border-amber-300/20 bg-amber-950/20" : "border-white/10 bg-white/5"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
          isGold
            ? "border-amber-300/30 bg-amber-400/10 text-amber-300"
            : "border-white/10 bg-white/5 text-zinc-300"
        }`}
      >
        <Flame className="h-3.5 w-3.5" />
      </span>

      <div className="min-w-0 flex-1 text-left">
        <p className={`text-xs font-semibold leading-tight ${isGold ? "text-amber-200" : "text-zinc-100"}`}>
          {offer.name}
        </p>
        <p className={`text-[10px] leading-tight ${isGold ? "text-amber-300/70" : "text-zinc-400"}`}>
          Extra {percent}% off membership
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-2 py-1">
        <Timer className="h-3 w-3 text-zinc-400" />
        <span className={`text-[11px] font-semibold tabular-nums ${isGold ? "text-amber-200" : "text-white"}`}>
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </span>
      </div>
    </div>
  );
};

const PlanTierCard: React.FC<{ plan: MembershipPlanTier }> = ({ plan }) => {
  const isGold = plan.isMostPopular;
  const variants = plan.variants || [];

  const [durIndex, setDurIndex] = useState(() => {
    const best = variants.findIndex((v) => v.isBestValue);
    return best >= 0 ? best : 0;
  });

  const selected = variants[durIndex] || variants[0];
  const features = plan.features || [];

  const price = selected ? toNumber(selected.sellingPrice) : 0;
  const originalPrice = selected ? toNumber(selected.originalPrice) : 0;

  const saleOffer = getActiveSaleOffer(plan);
  const saleLive = isSaleWindowLive(saleOffer);

  const { isCouponApplied, isExpired, couponCode } = useSaleExperience();
  const hasDiwaliBounty = isCouponApplied && !isExpired;

  // If Diwali Bounty coupon is applied, apply 40% discount
  const displayPrice = hasDiwaliBounty
    ? Math.round(price * 0.6)
    : saleLive && saleOffer
    ? computeSalePrice(price, saleOffer)
    : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden flex flex-col"
      style={
        isGold
          ? {
              background: "linear-gradient(160deg, #1c1200 0%, #120d00 50%, #0a0800 100%)",
              border: "1px solid rgba(212,160,23,0.35)",
              boxShadow: "0 0 0 1px rgba(212,160,23,0.1), 0 32px 80px rgba(0,0,0,0.8), 0 0 70px rgba(212,160,23,0.12)",
            }
          : {
              background: "linear-gradient(160deg, #141414 0%, #0a0a0a 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6)",
            }
      }
    >
      {/* Visual Image Banner */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950">
        {plan.imageUrl ? (
          <img
            src={plan.imageUrl}
            alt={plan.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-zinc-900" />
        )}

        {isGold && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, rgba(245,200,66,0.3) 0%, rgba(212,160,23,0.2) 100%)",
                border: "1px solid rgba(212,160,23,0.5)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 text-[10px] font-bold uppercase tracking-widest">
                {plan.popularLabel || "Most Popular"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Body Details */}
      <div className="relative z-10 flex flex-col flex-1 px-6 pt-6 pb-6 text-left">
        <div className="mb-4">
          <p className={`text-[10px] uppercase tracking-[0.2em] font-semibold mb-1 ${isGold ? "text-amber-400/80" : "text-zinc-500"}`}>
            Membership Plan
          </p>
          <h3 className="text-2xl sm:text-3xl font-audiowide text-white leading-tight tracking-tight">
            {plan.name}
          </h3>
          {plan.tagline && (
            <p className={`text-[13px] mt-1.5 leading-relaxed ${isGold ? "text-amber-100/70" : "text-zinc-400"}`}>
              {plan.tagline}
            </p>
          )}
        </div>

        {/* Duration Selector */}
        {variants.length > 0 && (
          <div className="mb-5">
            <p className={`text-[10px] uppercase tracking-widest mb-2 ${isGold ? "text-amber-200/60" : "text-zinc-500"}`}>
              Select Duration
            </p>
            <div
              className="inline-flex rounded-xl p-1 gap-1"
              style={
                isGold
                  ? { background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.15)" }
                  : { background: "rgba(24,24,24,0.9)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {variants.map((v, i) => (
                <button
                  key={v.label}
                  onClick={() => setDurIndex(i)}
                  className="relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer"
                  style={
                    durIndex === i
                      ? isGold
                        ? { background: "linear-gradient(135deg, #f5c842 0%, #d4a017 100%)", color: "#000" }
                        : { background: "#fff", color: "#000" }
                      : isGold
                      ? { color: "rgba(212,160,23,0.6)" }
                      : { color: "rgba(255,255,255,0.45)" }
                  }
                >
                  {v.label}
                  {v.bestValueLabel && (
                    <span className={`ml-1 text-[9px] font-bold ${durIndex === i ? "opacity-75" : "text-amber-400"}`}>
                      {v.bestValueLabel}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Promotional Sale Bar */}
        {saleLive && saleOffer && !hasDiwaliBounty && (
          <div className="mb-5">
            <PromoBanner offer={saleOffer} isGold={isGold} />
          </div>
        )}

        {/* Diwali Bounty Applied Badge */}
        {hasDiwaliBounty && (
          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{couponCode} APPLIED (-40% DIWALI BOUNTY)</span>
            </div>
          </div>
        )}

        {/* Pricing Display with CountUp */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-light ${isGold ? "text-amber-500/70" : "text-zinc-500"}`}>₹</span>
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-audiowide">
              <CountUp to={displayPrice} duration={0.8} separator="," />
            </span>
            {(originalPrice > displayPrice || (hasDiwaliBounty && price > displayPrice)) && (
              <span className="text-base sm:text-lg line-through text-zinc-500 ml-2">
                ₹{(hasDiwaliBounty && price > displayPrice ? price : originalPrice).toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            {hasDiwaliBounty
              ? "⚡ 40% Festive Discount Applied • One-time payment"
              : "One-time payment • Access includes all batch updates"}
          </p>
        </div>

        {/* Features Checklist */}
        <div className="space-y-3 mb-8 flex-1">
          {features.map((feat) => (
            <div key={feat.name} className="flex items-start gap-2.5">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                  isGold
                    ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                    : "bg-white/10 text-white border border-white/20"
                }`}
              >
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <span className={`text-xs sm:text-[13px] leading-snug ${isGold ? "text-amber-100/90" : "text-zinc-300"}`}>
                {feat.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group/btn w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer shadow-xl hover:scale-[1.02]"
          style={
            isGold
              ? {
                  background: "linear-gradient(135deg, #f5c842 0%, #d4a017 100%)",
                  color: "#000",
                  boxShadow: "0 0 30px rgba(212,160,23,0.35)",
                }
              : {
                  background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }
          }
        >
          <span>Get {plan.name}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export const MembershipPricing: React.FC = () => {
  return (
    <section id="membership" className="relative py-20 md:py-32 px-4 sm:px-6 bg-[#050505] overflow-hidden">
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(212,160,23,0.55), rgba(255,255,255,0.2), transparent)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 sm:mb-18"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-400/80 text-[10px] uppercase tracking-[0.35em] font-semibold mb-3">
            The Strike Membership
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-audiowide text-white mb-4 leading-tight">
            Membership{" "}
            <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              Plans
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            One focused investment in your engineering career.
            <br />
            <span className="text-zinc-500">Every course. Present and future. Pay once, learn forever.</span>
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {membershipPlansData.map((plan) => (
            <PlanTierCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-zinc-600 text-xs mt-12">
          Prices inclusive of GST • One-time payment • No recurring subscriptions
        </p>
      </div>
    </section>
  );
};

export default MembershipPricing;
