"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate random positions and delays for the floating tech symbols
  const symbols = ["{ }", "< />", "();", "$", "&&", "||", "=>", "[]", "01"];
  const floatingElements = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Animated Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-primary/20 blur-[100px]"
      />

      {/* Floating Code Symbols */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [-20, -100],
            x: Math.sin(el.id) * 20,
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear",
          }}
          className="absolute text-muted-foreground/30 font-mono text-sm font-bold select-none"
          style={{ left: el.left, top: el.top }}
        >
          {el.symbol}
        </motion.div>
      ))}
    </div>
  );
}
