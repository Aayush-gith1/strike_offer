import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Bug, MessageSquare } from "lucide-react";
import { ReportBugModal } from "@/components/ReportBugModal";
import { FeedbackModal } from "@/components/FeedbackModal";
import { useUserSessionStore } from "@/store/userSessionStore";

interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterLinkGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Practice", href: "/practice" },
      { label: "DSA Sheet", href: "/dsa-sheet" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

/**
 * Main application footer component
 */
export const MainFooter: React.FC = () => {
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const isAuthenticated = useUserSessionStore((state) => state.isAuthenticated);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden text-foreground bg-background" aria-label="Page footer">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-90 pointer-events-none bg-gradient-to-b from-transparent via-background to-background" />

      {/* Main Footer Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 lg:ml-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-6 py-8 sm:py-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <span
                className="text-2xl sm:text-3xl font-bold tracking-wide text-foreground font-audiowide hero-audiowide"
                style={{ fontFamily: "'Audiowide', cursive" }}
              >
                STRIKE
              </span>
            </div>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md leading-relaxed text-sm sm:text-base">
              Empowering developers with cutting-edge tools and resources.
              Powered by Coder Army, Strike is your gateway to a world of
              endless coding with guided lessons, real projects, level up your
              skills.
            </p>
          </div>

          {/* Navigation Links Columns */}
          {FOOTER_COLUMNS.map((section) => (
            <div key={section.title} className="min-w-0">
              <h3 className="font-semibold text-foreground mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300 block text-xs sm:text-sm md:text-base hover:translate-x-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative w-full sm:w-[95%] lg:w-[90%] mx-auto border-t border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              &copy; {new Date().getFullYear()} STRIKE. All rights reserved.
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <>
                  <Button
                    onClick={() => setIsFeedbackOpen(true)}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1.5 sm:gap-2 hover:bg-primary hover:text-primary-foreground cursor-pointer text-xs sm:text-sm px-4 sm:px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-background/50 backdrop-blur-xl border border-border/50"
                    style={{ boxShadow: "0 4px 16px -4px rgba(0, 0, 0, 0.3)" }}
                  >
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Feedback</span>
                  </Button>

                  <Button
                    onClick={() => setIsBugReportOpen(true)}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1.5 sm:gap-2 hover:bg-accent-orange hover:text-white cursor-pointer text-xs sm:text-sm px-4 sm:px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-background/50 backdrop-blur-xl border border-border/50"
                    style={{ boxShadow: "0 4px 16px -4px rgba(0, 0, 0, 0.3)" }}
                  >
                    <Bug className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Report Bug</span>
                  </Button>
                </>
              )}

              {/* Scroll To Top */}
              <Button
                onClick={scrollToTop}
                variant="ghost"
                size="sm"
                className="flex items-center gap-1.5 sm:gap-2 hover:bg-primary hover:text-primary-foreground cursor-pointer text-xs sm:text-sm px-4 sm:px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-background/50 backdrop-blur-xl"
                style={{ boxShadow: "0 4px 16px -4px rgba(0, 0, 0, 0.3)" }}
              >
                <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline text-xs sm:text-sm">Back to</span> Top
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Modals */}
      <ReportBugModal
        isOpen={isBugReportOpen}
        onClose={() => setIsBugReportOpen(false)}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </footer>
  );
};

export default React.memo(MainFooter);
