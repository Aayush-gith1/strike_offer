import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code, PenTool, Wrench, X } from "lucide-react";
import { useUserSessionStore } from "@/store/userSessionStore";

/**
 * Floating Quick Tools action button with draggable toggle
 */
export const FloatingQuickTools: React.FC = () => {
  const isAuthenticated = useUserSessionStore((state) => state.isAuthenticated);

  const [showFabMenu, setShowFabMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showHideZone, setShowHideZone] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showFabMenu) {
        setShowFabMenu(false);
      }
    };

    if (showFabMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showFabMenu]);

  return (
    <>
      {/* Drop Zone to hide tools */}
      <AnimatePresence>
        {showHideZone && isDragging && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99] pointer-events-none"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-500/30 to-red-600/30 backdrop-blur-sm border-2 border-red-500/50 flex items-center justify-center shadow-xl"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-500/50 flex items-center justify-center">
                  <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-white font-medium whitespace-nowrap bg-zinc-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20"
              >
                Drop to Hide
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden pill indicator on the right edge */}
      <AnimatePresence>
        {isHidden && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => setIsHidden(false)}
            className="fixed right-0 top-20 sm:top-24 z-[100] cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            <motion.div whileHover={{ x: -4, scale: 1.05 }} className="relative">
              <div
                className="h-20 sm:h-24 w-2 bg-gradient-to-b from-white/60 via-white to-white/60 rounded-l-full shadow-lg hover:w-3 transition-all duration-200"
                style={{ boxShadow: "-2px 0 12px rgba(255,255,255,0.4)" }}
              />
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-900/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 shadow-xl whitespace-nowrap pointer-events-none"
              >
                <p className="text-xs sm:text-sm text-white font-medium flex items-center gap-2">
                  <Wrench className="w-3 h-3 sm:w-4 sm:h-4" />
                  Click to Show Tools
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      {!isHidden && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={{
            top: 0,
            left: -window.innerWidth + 100,
            right: 0,
            bottom: window.innerHeight - 100,
          }}
          onDragStart={() => {
            setIsDragging(true);
            setShowFabMenu(false);
            setShowHideZone(true);
          }}
          onDragEnd={(event) => {
            setTimeout(() => setIsDragging(false), 100);
            setShowHideZone(false);

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const centerX = screenWidth / 2;
            const bottomY = screenHeight - 100;

            const rect = (event.target as HTMLElement).getBoundingClientRect();
            const elementX = rect.left + rect.width / 2;
            const elementY = rect.top + rect.height / 2;

            const distanceFromCenter = Math.abs(elementX - centerX);
            const distanceFromBottom = Math.abs(elementY - bottomY);

            if (distanceFromCenter < 100 && distanceFromBottom < 100) {
              setIsHidden(true);
            }
          }}
          animate={{ x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          initial={{ x: 0, y: 0 }}
          className="fixed top-20 sm:top-24 right-3 sm:right-6 z-[100]"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                if (!isDragging) {
                  setShowFabMenu((prev) => !prev);
                }
              }}
              aria-label="Open developer tools"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: showFabMenu ? 90 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all border border-white/20"
            >
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Menu Popup */}
            <AnimatePresence>
              {showFabMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-14 sm:top-[72px] right-0 flex flex-col items-stretch gap-2 sm:gap-3 min-w-[170px] sm:min-w-[200px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.a
                    href="#drawing"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setShowFabMenu(false)}
                    className="bg-gradient-to-br from-zinc-950/80 to-zinc-900/50 border border-white/10 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 hover:border-white/20 hover:bg-white/5 transition-all backdrop-blur-sm group cursor-pointer text-left w-full"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-transform shadow-lg">
                      <PenTool className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold">Drawing</span>
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default FloatingQuickTools;
