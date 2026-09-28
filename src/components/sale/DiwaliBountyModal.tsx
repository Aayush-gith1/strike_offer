import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Clock, Tag, ArrowRight, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useSaleExperience, SALE_DURATION_MS } from "@/store/saleExperienceStore";

export const DiwaliBountyModal: React.FC = () => {
  const {
    isBountyModalOpen,
    closeBountyModal,
    couponCode,
    discountPercent,
    expiresAt,
    isExpired,
    applyCouponToPlans,
    checkExpiryStatus,
  } = useSaleExperience();

  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  // Persistent Countdown Synchronized with localStorage (Auto-renews to 24h if ended)
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      let diff = expiresAt - now;

      // If timer has ended, trigger auto-renew to 24 hours again
      if (diff <= 0) {
        checkExpiryStatus();
        diff = SALE_DURATION_MS;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, checkExpiryStatus]);

  const handleCopyCoupon = async () => {
    if (isExpired) return;
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      toast.success(`Coupon code ${couponCode} copied!`, {
        style: {
          background: "#18181b",
          color: "#fff",
          border: "1px solid #27272a",
        },
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy code.");
    }
  };

  const handleApplyAndScroll = () => {
    if (isExpired) return;
    applyCouponToPlans();
    closeBountyModal();
    toast.success("40% Diwali discount applied to all plans!", {
      style: {
        background: "#18181b",
        color: "#fff",
        border: "1px solid #27272a",
      },
    });

    const pricingSection = document.getElementById("membership");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isBountyModalOpen) return null;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        {/* Backdrop Dismiss */}
        <div className="absolute inset-0" onClick={closeBountyModal} />

        {/* ── Professional Modal Card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[480px] bg-[#101114] border border-zinc-800 rounded-2xl shadow-2xl shadow-black/90 text-white overflow-hidden"
        >
          {/* Subtle Header Accent Line */}
          <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500" />

          {/* Close Button */}
          <button
            onClick={closeBountyModal}
            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-7">
            {/* Header: Clean Tag & Human Title */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Diwali Special Offer</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {isExpired ? "Offer Expired" : "You unlocked 40% off Strike"}
              </h3>

              <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">
                {isExpired
                  ? "This limited-time festive promotion has concluded."
                  : "Enjoy 40% savings across all annual memberships, live cohorts, and interview preparation programs."}
              </p>
            </div>

            {/* Voucher Box: Clean, High-Contrast */}
            <div className="mb-5 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base tracking-wider text-white">
                      {couponCode}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {discountPercent}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Valid on all memberships & bootcamps
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyCoupon}
                disabled={isExpired}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  copied
                    ? "bg-emerald-500 text-black"
                    : isExpired
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:text-white"
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Plan Breakdown: Clean Table */}
            <div className="mb-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-3.5">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                Discounted Plan Rates
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                  <span className="text-zinc-300 font-medium">Strike Plus (Core DSA + Tech)</span>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-zinc-500 text-[11px]">₹7,999</span>
                    <span className="font-semibold text-white">₹4,799</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                  <span className="text-zinc-300 font-medium">Strike Ultra (All-Access Pass)</span>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-zinc-500 text-[11px]">₹11,999</span>
                    <span className="font-semibold text-white">₹7,199</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-zinc-300 font-medium">Thunder: 100 Days Bootcamp</span>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-zinc-500 text-[11px]">₹5,499</span>
                    <span className="font-semibold text-white">₹3,299</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Banner: Minimal & Clean */}
            <div className="mb-6 flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{isExpired ? "Promotion concluded" : "Offer expires in:"}</span>
              </span>

              {!isExpired && (
                <span className="font-mono font-semibold text-zinc-200 tabular-nums">
                  {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
                </span>
              )}
            </div>

            {/* Actions: Primary CTA + Dismiss */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleApplyAndScroll}
                disabled={isExpired}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  isExpired
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-md hover:shadow-lg active:scale-[0.99]"
                }`}
              >
                <span>{isExpired ? "Offer Expired" : "Apply 40% Discount & View Plans"}</span>
                {!isExpired && <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={closeBountyModal}
                className="w-full py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                Maybe later
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DiwaliBountyModal;
