import React, { Suspense, useEffect, useState } from "react";
import { TooltipProvider } from "./components/ui/tooltip";
import { HeaderNav } from "./components/sections/HeaderNav";
import { MainFooter } from "./components/sections/MainFooter";
import LandingPage from "./pages/index";
import { FloatingQuickTools } from "./components/FloatingQuickTools";
import { SocialProofToast } from "./components/SocialProofToast";
import { BrahmastraArrowEffect } from "./components/sale/BrahmastraArrowEffect";
import { DiwaliBountyModal } from "./components/sale/DiwaliBountyModal";
import { DiwaliBountyFloatingSeal } from "./components/sale/DiwaliBountyFloatingSeal";
import { Toaster } from "react-hot-toast";
import { useScrollToTop } from "./hooks/useScrollToTop";

export function App() {
  useScrollToTop();
  const [showAuxiliaryWidgets, setShowAuxiliaryWidgets] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setShowAuxiliaryWidgets(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <div className="relative min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white">
        {/* Floating Header Navigation */}
        <HeaderNav />

        {/* Main Landing Sections */}
        <LandingPage />

        {/* Main Application Footer */}
        <MainFooter />

        {/* Brahmastra Arrow Kinetic Strike Effect */}
        <BrahmastraArrowEffect />

        {/* Interactive Diwali Bounty Reveal Modal */}
        <DiwaliBountyModal />

        {/* Minimized Floating Seal Badge (Reopen Anytime) */}
        <DiwaliBountyFloatingSeal />

        {/* Interactive Floating Tools and Notifications */}
        {showAuxiliaryWidgets && (
          <Suspense fallback={null}>
            <FloatingQuickTools />
            <SocialProofToast />
          </Suspense>
        )}

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-zinc-900 text-white border border-zinc-800",
            duration: 4000,
          }}
        />
      </div>
    </TooltipProvider>
  );
}

export default App;
