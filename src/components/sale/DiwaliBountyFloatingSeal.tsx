import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Clock, ArrowUpRight } from "lucide-react";
import { useSaleExperience, SALE_DURATION_MS } from "@/store/saleExperienceStore";

export const DiwaliBountyFloatingSeal: React.FC = () => {
  const {
    isUnlocked,
    isBountyModalOpen,
    isArrowLaunching,
    expiresAt,
    isExpired,
    openBountyModal,
    checkExpiryStatus,
  } = useSaleExperience();

  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!isUnlocked) return;

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
  }, [isUnlocked, expiresAt, checkExpiryStatus]);

  if (!isUnlocked || isBountyModalOpen || isArrowLaunching) {
    return null;
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.95 }}
        className="fixed bottom-6 left-6 z-[100] cursor-pointer select-none"
        onClick={openBountyModal}
      >
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-200 ${
            isExpired
              ? "bg-zinc-900 border-zinc-800 text-zinc-500"
              : "bg-[#111215] border-zinc-800 hover:border-amber-500/40 text-white"
          }`}
        >
          {/* Clean Tag Icon */}
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              isExpired
                ? "bg-zinc-800 text-zinc-500"
                : "bg-amber-400/10 border border-amber-400/20 text-amber-400"
            }`}
          >
            {isExpired ? <Clock className="w-3.5 h-3.5" /> : <Tag className="w-3.5 h-3.5" />}
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs font-semibold text-white">
                {isExpired ? "Offer Expired" : "THUNDER40"}
              </span>
              {!isExpired && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-zinc-950 font-bold">
                  40% OFF
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-1">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span className="font-mono tabular-nums">
                {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
              </span>
              <span className="text-[10px] text-zinc-400 flex items-center ml-0.5 hover:text-white">
                View <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiwaliBountyFloatingSeal;
