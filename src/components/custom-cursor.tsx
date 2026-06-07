"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Raw mouse coordinates (no re-renders on move)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the ring (snappy)
  const springConfigRing = { damping: 25, stiffness: 300, mass: 0.2 };
  const ringX = useSpring(mouseX, springConfigRing);
  const ringY = useSpring(mouseY, springConfigRing);

  // Springs for the glowing spotlight (smooth/slow)
  const springConfigSpotlight = { damping: 40, stiffness: 100, mass: 2 };
  const spotlightX = useSpring(mouseX, springConfigSpotlight);
  const spotlightY = useSpring(mouseY, springConfigSpotlight);

  useEffect(() => {
    setIsMounted(true);
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      setRipples((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div className="hidden md:block">
      {/* 1. Glowing Spotlight */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[1] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[80px]"
        style={{
          x: spotlightX,
          y: spotlightY,
        }}
      />

      {/* 2. Sonar Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "hsl(var(--primary))" : "hsla(var(--primary), 0.5)",
          backgroundColor: isHovering ? "hsla(var(--primary), 0.1)" : "transparent",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 3. The Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[101] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 4. Click Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="pointer-events-none fixed top-0 left-0 z-[99] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => {
            setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
          }}
        />
      ))}
    </div>
  );
}
