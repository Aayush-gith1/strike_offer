import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import { useUserSession } from "@/store/userSessionStore";
import { useSaleExperience } from "@/store/saleExperienceStore";
import { trackButtonClick } from "@/lib/metaPixel";

const STATIC_ASSISTANT = {
  suggestions: [
    {
      title: "Refactor welcome()",
      hint: "Extract user fetch and logging into separate utils for better testability.",
    },
    {
      title: "Add input validation",
      hint: "Validate user.level against enum: Beginner | Advanced | Expert.",
    },
    {
      title: "Improve typing",
      hint: "Define User type and return type for getUser and welcome functions.",
    },
    {
      title: "Implement error handling",
      hint: "Add try-catch blocks and custom error messages for async operations.",
    },
    {
      title: "Add loading states",
      hint: "Show skeleton loaders while fetching user data for better UX.",
    },
    {
      title: "Optimize re-renders",
      hint: "Wrap components with React.memo and use useMemo for expensive calculations.",
    },
  ],
  thoughts: [
    "Consider debouncing setDisplayedCode typing to save renders.",
    "Memoize highlightCode with code length as key for performance.",
    "Split regex patterns into precompiled list outside component.",
  ],
};

const STATIC_BUGS = [
  {
    id: "BUG-241",
    title: "Terminal doesn't auto-focus after run",
    severity: "medium" as const,
    fix: "Call inputRef.current?.focus() in setTimeout after setIsExecuting(false).",
  },
  {
    id: "BUG-198",
    title: "Syntax highlight overlaps on template tokens",
    severity: "low" as const,
    fix: "Run template expression match before string match.",
  },
];

// Syntax highlight tokens with warm, refined Diwali festive tones
const HIGHLIGHT_PATTERNS = [
  { regex: /\/\/.*$/g, className: "text-[#8a8075] italic" },
  { regex: /`[^`]*`/g, className: "text-[#f59e0b]" },
  { regex: /\$\{[^}]*\}/g, className: "text-[#fbbf24] font-medium" },
  { regex: /"[^"]*"|'[^']*'/g, className: "text-[#fb923c]" },
  {
    regex: /\b(const|let|var|async|await|function|return)\b/g,
    className: "text-[#38bdf8] font-semibold",
  },
  { regex: /\b(console|log|name|level|status|user)\b/g, className: "text-[#93c5fd]" },
  { regex: /\b(welcome|getUser)\b/g, className: "text-[#facc15] font-semibold" },
  { regex: /[{}[\]()]/g, className: "text-[#fde047]" },
];

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = React.memo(({ active, onClick, children }: TabButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 text-xs rounded-md transition cursor-pointer ${
      active
        ? "bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.18)]"
        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
    }`}
  >
    {children}
  </button>
));

interface SeverityBadgeProps {
  level: "low" | "medium" | "high";
}

const SeverityBadge = React.memo(({ level }: SeverityBadgeProps) => {
  const map = {
    low: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    medium: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    high: "bg-rose-500/20 text-rose-300 border-rose-400/30",
  }[level];
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] border ${map} uppercase tracking-wide`}>
      {level}
    </span>
  );
});

export const DiwaliStrikeEditor: React.FC = () => {
  const { user, isAuthenticated } = useUserSession();
  const triggerArrowStrike = useSaleExperience((state) => state.triggerArrowStrike);
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Welcome to Strike Terminal! ✨",
    "Hint: Type 'unlock' to release the Celestial Arrow & claim Diwali Bounty 🏹",
    "",
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [activeRightTab, setActiveRightTab] = useState<"assistant" | "bugs">("assistant");

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const userName = useMemo(() => {
    if (isAuthenticated && user) {
      return user.name || user.username || "Developer";
    }
    return "Guest User";
  }, [isAuthenticated, user]);

  const userLevel = useMemo(() => {
    if (isAuthenticated && user) {
      return user.role === "PRO_MEMBER" ? "Expert" : user.role === "STUDENT" ? "Advanced" : "Beginner";
    }
    return "Beginner";
  }, [isAuthenticated, user]);

  const fullCode = useMemo(
    () => `// Strike Platform - Welcome Code
const welcome = async () => {
    const user = await getUser();
    console.log(\`Welcome \${user.name}!\`);
    console.log(\`Level: \${user.level}\`);
    return { status: "success" };
};

const getUser = async () => ({
    name: "${userName}",
    level: "${userLevel}"
});

welcome();`,
    [userName, userLevel]
  );

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Typing effect animation
  useEffect(() => {
    if (currentIndex < fullCode.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode((prev) => prev + fullCode[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullCode]);

  // Syntax highlighting
  const highlightedCode = useMemo(() => {
    return displayedCode.split("\n").map((line, idx) => {
      if (!line.trim()) {
        return (
          <div key={`line-${idx}`} className="h-5">
            &nbsp;
          </div>
        );
      }

      const tokens: React.ReactNode[] = [];
      let currentPos = 0;
      const matches: Array<{
        start: number;
        end: number;
        className: string;
        text: string;
      }> = [];

      HIGHLIGHT_PATTERNS.forEach(({ regex, className }) => {
        let match;
        const re = new RegExp(regex.source, regex.flags);
        while ((match = re.exec(line)) !== null) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            className,
            text: match[0],
          });
        }
      });

      matches.sort((a, b) => a.start - b.start);

      const filtered = matches.filter((match, i) => {
        if (i === 0) return true;
        return match.start >= matches[i - 1].end;
      });

      filtered.forEach((match, i) => {
        if (match.start > currentPos) {
          tokens.push(
            <span key={`text-${idx}-${i}`} className="text-[#e2e8f0]">
              {line.slice(currentPos, match.start)}
            </span>
          );
        }
        tokens.push(
          <span key={`match-${idx}-${i}`} className={match.className}>
            {match.text}
          </span>
        );
        currentPos = match.end;
      });

      if (currentPos < line.length) {
        tokens.push(
          <span key={`text-${idx}-end`} className="text-[#e2e8f0]">
            {line.slice(currentPos)}
          </span>
        );
      }

      return (
        <div key={`line-${idx}`} className="flex items-center hover:bg-amber-500/[0.04] px-2 rounded transition-colors">
          <span className="w-8 sm:w-10 text-right pr-3 sm:pr-4 text-[#78716c] select-none text-xs">
            {idx + 1}
          </span>
          <div className="flex-1 font-mono">{tokens.length > 0 ? tokens : line}</div>
        </div>
      );
    });
  }, [displayedCode]);

  const handleRunButton = () => {
    setIsExecuting(true);
    trackButtonClick("Run Code", "Hero Editor Diwali");
    setTerminalOutput((prev) => [
      ...prev,
      "$ node strike.js",
      "Starting JavaScript execution in Diwali Sandbox...",
      "Running welcome function...",
    ]);

    setTimeout(() => {
      setTerminalOutput((prev) => [
        ...prev,
        "",
        `Welcome ${userName}! ✨`,
        `Level: ${userLevel}`,
        "🪔 Happy Diwali! Program executed successfully with 0 errors.",
        "",
      ]);
      setIsExecuting(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }, 1200);
  };

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    let response: string[] = [];

    switch (cmd) {
      case "help":
        response = [
          "Available commands:",
          "  help, clear, run, status, version, diwali, unlock",
        ];
        break;
      case "clear":
        setTerminalOutput([]);
        return;
      case "unlock":
      case "bounty":
      case "arrow":
      case "offer":
        response = [
          "🏹 Brahmastra Celestial Arrow Summoned!",
          "✨ Releasing Thunder Diwali Bounty across the platform...",
        ];
        triggerArrowStrike();
        break;
      case "run":
        response = [
          `Welcome ${userName}! ✨`,
          `Level: ${userLevel}`,
          "🪔 Execution complete. Happy Diwali from Strike Team!",
        ];
        break;
      case "status":
        response = ["System Status: ✅ All systems operational • Diwali Mode Active"];
        break;
      case "diwali":
        response = [
          "🪔 May your code be bug-free and your Diwali be bright and prosperous!",
        ];
        break;
      case "version":
        response = ["Strike IDE — Diwali Edition v2.4.0 (Node 20 / Sandbox)"];
        break;
      default:
        response = [`Command '${command}' not found. Type 'help' for commands.`];
    }

    setTerminalOutput((prev) => [...prev, `$ ${command}`, ...response]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      executeCommand(currentCommand);
      setCurrentCommand("");
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* ── Background: Very Subtle Diwali Atmosphere Behind Editor Only ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Soft Diya-like warm bokeh glows */}
        <div className="absolute -top-12 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[160px]" />

        {/* Faint floating warm amber particles */}
        <div className="absolute top-10 left-[15%] w-1.5 h-1.5 rounded-full bg-amber-400/30 blur-[1px] animate-pulse" />
        <div className="absolute top-24 right-[20%] w-2 h-2 rounded-full bg-amber-300/25 blur-[1px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-16 left-[30%] w-1.5 h-1.5 rounded-full bg-amber-400/20 blur-[1px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-[15%] w-2 h-2 rounded-full bg-amber-300/30 blur-[1px] animate-pulse" style={{ animationDelay: "1.5s" }} />

        {/* Extremely faint Indian geometric / rangoli mandala watermark pattern */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] text-amber-500/[0.028]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <circle cx="100" cy="100" r="90" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="75" />
          <circle cx="100" cy="100" r="55" strokeDasharray="2 2" />
          <circle cx="100" cy="100" r="35" />
          <circle cx="100" cy="100" r="18" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="10"
              x2="100"
              y2="190"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* ── Main Editor Container with Subtle Warm Golden Glow ── */}
      <div
        className="relative z-10 w-full overflow-hidden border border-amber-500/25 sm:border-2 sm:border-amber-500/30 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-300"
        style={{
          boxShadow:
            "0 0 50px -10px rgba(245, 158, 11, 0.16), 0 25px 90px -20px rgba(0, 0, 0, 0.95)",
        }}
      >
        <div className="relative w-full flex flex-col">
          {/* Top Window Header Bar */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 bg-[#18181b]/95 border-b border-amber-500/20">
            {/* Left Header: Traffic Lights + Active Tab */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Traffic Light Dots with Warm Sheen */}
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-600/90 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-600/70 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm" />
              </div>

              {/* Active Tab: strike.js with Amber/Gold Top Accent & Subtle Diya Flame */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#23211f]/90 rounded-lg border border-amber-500/25 border-t-2 border-t-amber-400 shadow-sm">
                {/* Subtle Diya / Flame Icon */}
                <svg
                  className="w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c1.1 2.9 4 6.5 4 10 0 3.3-2.7 6-6 6s-6-2.7-6-6c0-3.5 2.9-7.1 4-10 1-1 3-1 4 0z" />
                  <ellipse cx="10" cy="14" rx="2" ry="3" fill="#fef08a" />
                </svg>

                <span className="text-xs sm:text-sm text-zinc-100 font-medium tracking-wide">
                  strike.js
                </span>

                {/* Pulsing Golden Status Dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-md shadow-amber-400/60" />
              </div>
            </div>

            {/* Right Controls: Diwali Mode Badge + Ready + Run Code */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Developer-Tool Status Badge: DIWALI MODE */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase font-mono font-semibold tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.18)]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>DIWALI MODE</span>
              </div>

              {/* Functional Status Indicator (Preserved Green) */}
              <div
                className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-semibold tracking-wide ${
                  isExecuting
                    ? "bg-amber-500/10 text-amber-300 border border-amber-400/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                    : "bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                }`}
              >
                {isExecuting ? "Running" : "Ready"}
              </div>

              {/* Run Code Button */}
              <button
                type="button"
                onClick={handleRunButton}
                disabled={isExecuting}
                className={`px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 border border-amber-500/25 text-white rounded-lg hover:from-zinc-600 hover:to-zinc-700 hover:border-amber-400/50 transition-all shadow-lg flex items-center gap-2 active:scale-95 duration-200 cursor-pointer ${
                  isExecuting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 ${isExecuting ? "animate-spin text-amber-400" : "text-amber-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  {isExecuting ? (
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
                {isExecuting ? "Running..." : "Run Code"}
              </button>
            </div>
          </div>

          {/* Main Grid: Code + Terminal (Left) vs AI Assistant (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-0">
            {/* Left Pane: Code Editor + Terminal (Pinned to Bottom) */}
            <div className="flex flex-col h-full justify-between border-b lg:border-b-0 lg:border-r border-amber-500/20 bg-[#090b0e]">
              {/* Code Editor View */}
              <div className="flex-1 min-h-[250px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[420px] p-3 sm:p-4 md:p-5 lg:p-6 font-mono text-[11px] sm:text-[12.5px] lg:text-[13.5px] leading-5 sm:leading-5 md:leading-6 overflow-auto scrollbar-thin scrollbar-thumb-amber-900/40">
                <pre className="overflow-hidden">
                  <code className="block">
                    {highlightedCode}
                    <span className="inline-block w-2 h-4 bg-gradient-to-r from-amber-200 to-amber-400 animate-pulse ml-0.5 align-middle shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  </code>
                </pre>
              </div>

              {/* Terminal Section: Attached Flush to Bottom */}
              <div className="border-t sm:border-t-2 border-amber-500/20 bg-[#121316]/95 backdrop-blur-sm h-[130px] sm:h-[150px] md:h-[180px] lg:h-[200px] flex flex-col flex-shrink-0 mt-auto">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#17181c] flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Terminal
                    </span>
                  </div>

                  <span className="text-[10px] text-amber-400/70 font-mono hidden sm:inline">
                    Diwali Sandbox ✨
                  </span>
                </div>

                <div
                  ref={terminalRef}
                  onClick={() => inputRef.current?.focus()}
                  className="flex-1 px-4 py-2 sm:py-2.5 font-mono text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700/60 cursor-text"
                >
                  {terminalOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className={`${
                        line.startsWith("$")
                          ? "text-green-400 font-medium"
                          : line.includes("Welcome") || line.includes("✨")
                          ? "text-cyan-400 font-medium"
                          : line.includes("Diwali") || line.includes("🪔")
                          ? "text-amber-300 font-semibold drop-shadow-[0_0_8px_rgba(245,158,11,0.35)]"
                          : "text-gray-300"
                      }`}
                    >
                      {line || "\u00A0"}
                    </div>
                  ))}

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-green-400 font-medium">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentCommand}
                      onChange={(e) => setCurrentCommand(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isExecuting}
                      className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono text-xs caret-amber-400"
                      placeholder="Type 'run', 'diwali', 'help', or 'status'..."
                      spellCheck={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Pane: AI Assistant & Suggestions */}
            <aside className="bg-[#0f1114]/90 flex flex-col h-full min-h-0">
              {/* Tab Header with Golden Glow on Active Tab */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-amber-500/20 bg-[#14161a] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <TabButton
                    active={activeRightTab === "assistant"}
                    onClick={() => setActiveRightTab("assistant")}
                  >
                    AI Assistant
                  </TabButton>
                  <TabButton
                    active={activeRightTab === "bugs"}
                    onClick={() => setActiveRightTab("bugs")}
                  >
                    Bug Shots
                  </TabButton>
                </div>
                <span className="text-[10px] text-amber-400/80 uppercase font-mono tracking-wider">
                  Diwali Static
                </span>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 scrollbar-thin scrollbar-thumb-zinc-700/60 text-xs">
                {activeRightTab === "assistant" ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-amber-400/90 mb-2 font-semibold">
                        Quick Suggestions
                      </h4>
                      <div className="space-y-2">
                        {STATIC_ASSISTANT.suggestions.map((s, i) => (
                          <div
                            key={i}
                            className="rounded-lg border border-amber-500/15 bg-amber-500/[0.02] p-3 hover:border-amber-500/35 hover:bg-amber-500/[0.04] transition shadow-sm"
                          >
                            <div className="text-xs font-semibold text-zinc-200">{s.title}</div>
                            <div className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{s.hint}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-amber-400/90 mb-2 font-semibold">
                        Thoughts
                      </h4>
                      <ul className="space-y-2">
                        {STATIC_ASSISTANT.thoughts.map((t, i) => (
                          <li
                            key={i}
                            className="text-[11px] text-zinc-300 bg-amber-500/[0.02] border border-amber-500/15 rounded-lg p-2.5 leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-amber-400 font-bold leading-none mt-0.5">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {STATIC_BUGS.map((b) => (
                      <div
                        key={b.id}
                        className="rounded-lg border border-amber-500/15 bg-amber-500/[0.02] p-3 hover:border-amber-500/30 transition"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-zinc-200">{b.id}: {b.title}</span>
                          <SeverityBadge level={b.severity} />
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          <span className="text-amber-400/80 font-medium">Fix:</span> {b.fix}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiwaliStrikeEditor;
