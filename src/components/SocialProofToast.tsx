import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { X, User } from "lucide-react";
import { useUserSessionStore } from "@/store/userSessionStore";

const MOCK_COMMUNITY_MEMBERS = [
  "Aarav Sharma",
  "Rohan Verma",
  "Priya Patel",
  "Ananya Roy",
  "Vikram Malhotra",
  "Aditya Kulkarni",
  "Neha Gupta",
  "Ishaan Sengupta",
  "Tanvi Deshmukh",
  "Rahul Nair",
];

const getRandomIntervalMs = () => {
  return Math.floor(Math.random() * (120000 - 45000 + 1)) + 45000;
};

/**
 * Social proof join notification toast for landing engagement
 */
export const SocialProofToast: React.FC = () => {
  const isAuthenticated = useUserSessionStore((state) => state.isAuthenticated);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  const displayNextToast = () => {
    if (isAuthenticated) return;

    const nextUser = MOCK_COMMUNITY_MEMBERS[currentIndexRef.current % MOCK_COMMUNITY_MEMBERS.length];
    currentIndexRef.current += 1;

    toast.custom(
      (t) => (
        <div
          className={`relative overflow-hidden flex items-center gap-3.5 bg-[#0e1410] text-white border border-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.22)] rounded-2xl min-w-[290px] max-w-[360px] p-3 pl-3.5 pr-11 transition-all duration-300 ${
            t.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"
          }`}
        >
          {/* Top accent progress line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
              style={{ animation: "toastProgress 4.8s linear forwards" }}
            />
          </div>

          {/* User Icon Circle */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00c950] to-[#009e3e] flex items-center justify-center shrink-0 shadow-md shadow-emerald-950/40">
            <User className="w-5 h-5 text-white fill-white" />
          </div>

          {/* User Details */}
          <div className="flex flex-col text-left justify-center">
            <p className="font-bold text-white text-[14px] leading-tight tracking-tight">
              {nextUser}
            </p>
            <p className="text-gray-300 text-[12px] leading-tight mt-1 flex items-center gap-1 font-normal">
              just joined Strike! <span className="text-[13px]">🎉</span>
            </p>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>

          <style>{`
            @keyframes toastProgress {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}</style>
        </div>
      ),
      {
        id: "social-proof-toast",
        position: "bottom-right",
        duration: 4800,
      }
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      toast.dismiss("social-proof-toast");
      return;
    }

    const scheduleTimer = () => {
      const delay = getRandomIntervalMs();
      timeoutRef.current = setTimeout(() => {
        displayNextToast();
        scheduleTimer();
      }, delay);
    };

    // First toast after 20s
    timeoutRef.current = setTimeout(() => {
      displayNextToast();
      scheduleTimer();
    }, 20000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      toast.dismiss("social-proof-toast");
    };
  }, [isAuthenticated]);

  return null;
};

export default SocialProofToast;
