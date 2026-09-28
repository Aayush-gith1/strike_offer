import React, { useState, useEffect, useRef } from "react";
import { Link } from "@/utils";
import { motion, AnimatePresence } from "motion/react";
import { useUserSession } from "@/store/userSessionStore";
import { useOnboardingTour } from "@/hooks/useOnboardingTour";

interface NavLinkItem {
  label: string;
  to: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", to: "/#home" },
  { label: "Courses", to: "/#courses" },
  { label: "Practice", to: "/practice" },
  { label: "CodeArena", to: "/codearena" },
  { label: "Quiz", to: "/quiz" },
  { label: "System Design", to: "/system-design" },
  { label: "Contests", to: "/contests" },
];

export const HeaderNav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);

  const { isAuthenticated, user } = useUserSession();
  const { startOnboardingTour } = useOnboardingTour();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 150) {
        setIsScrollingDown(currentScrollY > lastScrollY.current + 8);
      } else {
        setIsScrollingDown(false);
      }
      lastScrollY.current = currentScrollY;

      // Active section detection
      const sections = ["home", "membership", "courses", "why-choose-us", "faqs"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (to: string) => {
    setIsMobileMenuOpen(false);
    if (to.startsWith("/#")) {
      const targetId = to.substring(2);
      setActiveSection(targetId);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 mx-auto w-full z-[100] px-2 sm:px-4 pt-4 sm:pt-6 pointer-events-none">
      <AnimatePresence mode="wait">
        {!isScrollingDown && (
          <motion.div
            className="pointer-events-auto relative max-w-5xl xl:max-w-6xl mx-auto border rounded-full bg-background/80 backdrop-blur-xl border-zinc-800 z-[101] shadow-xl shadow-black/40"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
              {/* Brand Logo */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/"
                  className="relative shrink-0 no-underline group flex items-center select-none"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <span
                    className="text-xl sm:text-2xl font-bold tracking-wider font-audiowide text-foreground transition-all duration-300 group-hover:text-white"
                    style={{ fontFamily: "'Audiowide', cursive" }}
                  >
                    STRIKE
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-auto">
                <div
                  className="flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full"
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {NAV_LINKS.map((item, idx) => {
                    const isActive =
                      item.to === `/#${activeSection}` ||
                      (item.to === "/#home" && activeSection === "home");
                    return (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.to)}
                        onMouseEnter={() => setHoveredLink(idx)}
                        className={`relative px-3 py-1 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                          isActive
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        {isActive && (
                          <motion.div
                            className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full"
                            layoutId="activePillDot"
                            style={{ x: "-50%" }}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        {hoveredLink === idx && !isActive && (
                          <motion.div
                            className="absolute inset-0 bg-white/5 rounded-full -z-0"
                            layoutId="navHoverPill"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Action Buttons */}
              <div className="hidden lg:flex lg:items-center lg:gap-3">
                <button
                  onClick={startOnboardingTour}
                  className="px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2 text-sm sm:text-base font-semibold transition-all duration-300 rounded-full hover:scale-105 bg-gradient-to-r from-zinc-100 to-zinc-300 text-black shadow-lg hover:shadow-white/20 cursor-pointer active:scale-95"
                >
                  Get Started
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center gap-2">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden px-4 pt-2 pb-6 border-t border-zinc-800/80 bg-zinc-950/95 rounded-b-3xl backdrop-blur-xl"
                >
                  <div className="flex flex-col space-y-2">
                    {NAV_LINKS.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.to)}
                        className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                    <div className="pt-3 border-t border-zinc-800">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          startOnboardingTour();
                        }}
                        className="w-full py-2.5 text-center font-semibold rounded-full bg-white text-black text-sm hover:bg-zinc-200 transition"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderNav;
