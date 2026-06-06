"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "Is this tool free to use?",
    answer: "Yes, the basic vault features including unlimited links and snippets are completely free for individual developers.",
  },
  {
    question: "How do you generate the link previews?",
    answer: "Our backend automatically scrapes metadata, OpenGraph tags, and thumbnails when you save a new URL, ensuring your vault looks beautiful and scannable.",
  },
  {
    question: "Can I store sensitive information like API keys?",
    answer: "While we use industry-standard encryption, we do not recommend storing sensitive API keys or credentials in snippets. This tool is designed primarily for learning resources, documentation, and non-sensitive code blocks.",
  },
  {
    question: "Is there a browser extension available?",
    answer: "We are currently developing extensions for Chrome and Firefox so you can save resources directly from any page with one click. Stay tuned!",
  },
  {
    question: "Can I export my data?",
    answer: "Absolutely! You own your data. You can export your entire vault as a clean JSON file at any time from your settings.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-32 relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed font-mono">
            Everything you need to know about the platform.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={false}
                className={cn(
                  "border border-border/50 rounded-xl overflow-hidden transition-colors duration-300",
                  isOpen ? "bg-card border-primary/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]" : "bg-card/30 hover:bg-card/80 hover:border-border"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full shrink-0 ml-4 transition-colors",
                      isOpen ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    )}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
