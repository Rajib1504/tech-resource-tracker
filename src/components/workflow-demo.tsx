"use client";

import { motion } from "framer-motion";
import { Link2, Database, Search, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const HandDrawnBox = ({
  children,
  className,
  delay = 0,
  rotation = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  rotation?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotate: rotation - 5 }}
    whileInView={{ opacity: 1, y: 0, rotate: rotation }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, type: "spring", bounce: 0.4 }}
    whileHover={{ scale: 1.05, rotate: 0 }}
    className={cn(
      "border-2 border-foreground/80 rounded-xl bg-card p-6 flex flex-col items-center justify-center text-center gap-3 relative z-10 w-full max-w-[220px] mx-auto",
      "shadow-[4px_4px_0_0_rgba(99,102,241,0.4)] md:shadow-[6px_6px_0_0_rgba(99,102,241,0.4)]",
      className
    )}
  >
    {children}
  </motion.div>
);

const DrawnArrowRight = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn("hidden md:block absolute text-primary origin-left", className)}
  >
    <svg width="100" height="40" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
      <path d="M0 20 Q 50 5 95 20" strokeDasharray="6 6" />
      <path d="M 85 10 L 98 21 L 85 30" />
    </svg>
  </motion.div>
);

const DrawnArrowDown = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scaleY: 0 }}
    whileInView={{ opacity: 1, scaleY: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn("md:hidden flex justify-center text-primary origin-top my-2", className)}
  >
    <svg width="40" height="60" viewBox="0 0 40 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
      <path d="M20 0 Q 30 30 20 55" strokeDasharray="6 6" />
      <path d="M 10 45 L 20 58 L 30 45" />
    </svg>
  </motion.div>
);

export function WorkflowDemo() {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 font-mono relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative">
        
        {/* Step 1 */}
        <div className="relative w-full md:w-1/4">
          <HandDrawnBox rotation={-2} delay={0.1}>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
              <Link2 className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-bold text-foreground font-sans">1. Capture</h3>
            <p className="text-xs text-muted-foreground">
              Paste a URL or drop a code snippet.
            </p>
          </HandDrawnBox>
        </div>

        <DrawnArrowDown delay={0.3} />
        <DrawnArrowRight delay={0.3} className="left-[23%] top-[40%] w-[12%]" />

        {/* Step 2 */}
        <div className="relative w-full md:w-1/4">
          <HandDrawnBox rotation={3} delay={0.4} className="border-indigo-500/50 shadow-[4px_4px_0_0_rgba(99,102,241,0.6)]">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
              <Cpu className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="font-bold text-foreground font-sans">2. Process</h3>
            <p className="text-xs text-muted-foreground">
              We scrape metadata, thumbnails, and syntax.
            </p>
          </HandDrawnBox>
        </div>

        <DrawnArrowDown delay={0.6} />
        <DrawnArrowRight delay={0.6} className="left-[49%] top-[30%] w-[12%]" />

        {/* Step 3 */}
        <div className="relative w-full md:w-1/4">
          <HandDrawnBox rotation={-1} delay={0.7} className="border-purple-500/50 shadow-[4px_4px_0_0_rgba(168,85,247,0.6)]">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
              <Database className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-bold text-foreground font-sans">3. Vault</h3>
            <p className="text-xs text-muted-foreground">
              Stored securely with categories and tags.
            </p>
          </HandDrawnBox>
        </div>

        <DrawnArrowDown delay={0.9} />
        <DrawnArrowRight delay={0.9} className="left-[75%] top-[50%] w-[12%]" />

        {/* Step 4 */}
        <div className="relative w-full md:w-1/4">
          <HandDrawnBox rotation={2} delay={1.0} className="border-green-500/50 shadow-[4px_4px_0_0_rgba(34,197,94,0.6)]">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
              <Search className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-bold text-foreground font-sans">4. Retrieve</h3>
            <p className="text-xs text-muted-foreground">
              Instant global search whenever you need it.
            </p>
          </HandDrawnBox>
        </div>

      </div>
    </div>
  );
}
