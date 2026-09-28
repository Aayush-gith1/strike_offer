import { useEffect, useState } from "react";
import type { MembershipPlanTier, SpecialPromotionalOffer } from "@/types";

const toNumber = (v: number | string) => Math.round(Number(v) || 0);

const PROMO_24H_STORAGE_KEY = "strike_plan_promo_offer_expires";
const DURATION_24H_MS = 24 * 60 * 60 * 1000;

export function getRollingOfferExpiry(targetTimestamp?: Date | string | number | null): number {
  const now = Date.now();
  if (typeof window === "undefined") return now + DURATION_24H_MS;

  const saved = localStorage.getItem(PROMO_24H_STORAGE_KEY);
  if (saved) {
    const parsed = parseInt(saved, 10);
    if (!isNaN(parsed) && parsed > now) {
      return parsed;
    }
  }

  // If ended or not set, initialize to 24 hours again
  const newExpiry = now + DURATION_24H_MS;
  localStorage.setItem(PROMO_24H_STORAGE_KEY, newExpiry.toString());
  return newExpiry;
}

export function isSaleWindowLive(offer: SpecialPromotionalOffer | null | undefined): boolean {
  if (!offer) return false;
  if (offer.isActive === false) return false;
  const now = Date.now();
  if (offer.startAt && new Date(offer.startAt).getTime() > now) return false;
  return true;
}

export function getActiveSaleOffer(
  plan: MembershipPlanTier | null | undefined
): SpecialPromotionalOffer | null {
  const live = (plan?.offers || []).filter((o) => {
    if (o.discountType !== "PERCENTAGE") return false;
    if (!o.isActive) return false;
    if (!o.discountValue || o.discountValue <= 0) return false;
    return isSaleWindowLive(o);
  });
  return live.length > 0 ? live[0] : null;
}

export function getSalePercent(offer: SpecialPromotionalOffer | null | undefined): number {
  return offer ? Math.round(Number(offer.discountValue) || 0) : 0;
}

export function computeSalePrice(
  sellingPrice: number | string,
  offer: SpecialPromotionalOffer | null | undefined
): number {
  const base = toNumber(sellingPrice);
  const percent = getSalePercent(offer);
  if (percent <= 0) return base;
  return Math.round(base * (1 - percent / 100));
}

type RemainingTime = { hours: number; minutes: number; seconds: number };

const calculateRemaining = (diffMs: number): RemainingTime => {
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

export function useCountdown(targetTimestamp: Date | string | number | null | undefined): RemainingTime {
  const [targetTime, setTargetTime] = useState<number>(() => getRollingOfferExpiry(targetTimestamp));

  const [remaining, setRemaining] = useState<RemainingTime>(() =>
    calculateRemaining(targetTime - Date.now())
  );

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      let diff = targetTime - now;

      // If timer ended, make it 24 hours again!
      if (diff <= 0) {
        const nextExpiry = now + DURATION_24H_MS;
        if (typeof window !== "undefined") {
          localStorage.setItem(PROMO_24H_STORAGE_KEY, nextExpiry.toString());
        }
        setTargetTime(nextExpiry);
        diff = DURATION_24H_MS;
      }

      setRemaining(calculateRemaining(diff));
    };

    const intervalId = setInterval(tick, 1000);
    tick();
    return () => clearInterval(intervalId);
  }, [targetTime]);

  return remaining;
}

export const pad = (val: number) => String(val).padStart(2, "0");
