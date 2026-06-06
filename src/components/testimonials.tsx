"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Senior Frontend Engineer",
    content: "This tool completely replaced my messy bookmarks folder. The automatic metadata scraping and syntax highlighting for snippets is a game-changer.",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah Chen",
    role: "Fullstack Developer",
    content: "Finally, a resource manager built for developers. I love how I can tag my resources and search through them instantly with ⌘K.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    content: "The JSON export feature gives me peace of mind. Beautiful UI, lightning fast, and I don't have to worry about vendor lock-in.",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    name: "Emily Watson",
    role: "UI/UX Designer",
    content: "Even as a designer who codes, I find the visual link previews incredibly helpful for organizing my design system references.",
    avatar: "https://i.pravatar.cc/150?u=emily",
  },
  {
    name: "James Thorne",
    role: "Engineering Manager",
    content: "I use this to build onboarding paths for my junior devs. Being able to organize docs, videos, and snippets into categories is brilliant.",
    avatar: "https://i.pravatar.cc/150?u=james",
  },
  {
    name: "Maria Garcia",
    role: "Open Source Maintainer",
    content: "The deep dark mode and developer-focused identity matrix makes this my most-used tool outside of VS Code.",
    avatar: "https://i.pravatar.cc/150?u=maria",
  },
];

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 md:py-32 relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-md overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-4">
            Wall of Love
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Developers
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed font-mono">
            See what the community is saying about the vault.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col gap-4 relative group hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full bg-muted border border-border/50"
                  loading="lazy"
                />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-foreground">{testimonial.name}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{testimonial.role}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10 text-left">
                &quot;{testimonial.content}&quot;
              </p>
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
