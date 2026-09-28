import { create } from "zustand";

const STORAGE_KEY_EXPIRES = "strike_diwali_sale_expires";
const STORAGE_KEY_UNLOCKED = "strike_diwali_sale_unlocked";
const STORAGE_KEY_APPLIED = "strike_diwali_coupon_applied";

// 24 Hours in milliseconds
export const SALE_DURATION_MS = 24 * 60 * 60 * 1000;

interface SaleExperienceState {
  isArrowLaunching: boolean;
  isBountyModalOpen: boolean;
  isUnlocked: boolean;
  isCouponApplied: boolean;
  isDismissed: boolean;
  couponCode: string;
  discountPercent: number;
  expiresAt: number;
  isExpired: boolean;

  // Actions
  triggerArrowStrike: () => void;
  openBountyModal: () => void;
  closeBountyModal: () => void;
  applyCouponToPlans: () => void;
  checkExpiryStatus: () => void;
  resetTimer: () => void;
}

const getInitialExpiresAt = (): number => {
  const now = Date.now();
  if (typeof window === "undefined") return now + SALE_DURATION_MS;
  const saved = localStorage.getItem(STORAGE_KEY_EXPIRES);
  if (saved) {
    const parsed = parseInt(saved, 10);
    // If saved timer hasn't expired yet, continue counting down
    if (!isNaN(parsed) && parsed > now) return parsed;
  }
  // If timer ended or was not initialized, make it 24 hours again
  const newExpiry = now + SALE_DURATION_MS;
  localStorage.setItem(STORAGE_KEY_EXPIRES, newExpiry.toString());
  return newExpiry;
};

const getInitialUnlocked = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY_UNLOCKED) === "true";
};

const getInitialApplied = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY_APPLIED) === "true";
};

export const useSaleExperience = create<SaleExperienceState>((set, get) => {
  const expiresAt = getInitialExpiresAt();

  return {
    isArrowLaunching: false,
    isBountyModalOpen: false,
    isUnlocked: getInitialUnlocked(),
    isCouponApplied: getInitialApplied(),
    isDismissed: false,
    couponCode: "THUNDER40",
    discountPercent: 40,
    expiresAt,
    isExpired: false,

    triggerArrowStrike: () => {
      // Ensure timer is valid 24h window; if ended, make it 24 again
      const now = Date.now();
      if (now >= get().expiresAt) {
        const newExpiry = now + SALE_DURATION_MS;
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY_EXPIRES, newExpiry.toString());
        }
        set({ expiresAt: newExpiry, isExpired: false });
      }

      set({ isArrowLaunching: true });

      // Save unlock state to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_UNLOCKED, "true");
      }

      // Snappy, polished cinematic arrow sequence (900ms), then open Bounty Modal
      setTimeout(() => {
        set({
          isArrowLaunching: false,
          isUnlocked: true,
          isBountyModalOpen: true,
          isDismissed: false,
        });
      }, 900);
    },

    openBountyModal: () => {
      const now = Date.now();
      if (now >= get().expiresAt) {
        const newExpiry = now + SALE_DURATION_MS;
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY_EXPIRES, newExpiry.toString());
        }
        set({ expiresAt: newExpiry, isExpired: false });
      }
      set({ isBountyModalOpen: true, isDismissed: false, isExpired: false });
    },

    closeBountyModal: () => {
      set({ isBountyModalOpen: false, isDismissed: true });
    },

    applyCouponToPlans: () => {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_APPLIED, "true");
      }
      set({ isCouponApplied: true, isBountyModalOpen: false, isDismissed: true });

      // Smooth scroll to membership section
      const membershipSection = document.getElementById("membership");
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },

    checkExpiryStatus: () => {
      const now = Date.now();
      // If timer reached 0 / ended, make it 24 hours again!
      if (now >= get().expiresAt) {
        const newExpiry = now + SALE_DURATION_MS;
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY_EXPIRES, newExpiry.toString());
        }
        set({ expiresAt: newExpiry, isExpired: false });
      } else {
        set({ isExpired: false });
      }
    },

    resetTimer: () => {
      const newExpiry = Date.now() + SALE_DURATION_MS;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_EXPIRES, newExpiry.toString());
      }
      set({ expiresAt: newExpiry, isExpired: false });
    },
  };
});
