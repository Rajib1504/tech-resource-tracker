"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Code2,
  Database,
  Terminal,
  Cpu,
  Layout,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { FaqSection } from "@/components/faq";
import { TestimonialsSection } from "@/components/testimonials";
import { RecentResources } from "@/components/recent-resources";
import { HeroBackground } from "@/components/hero-background";
import { WorkflowDemo } from "@/components/workflow-demo";

const YoutubePreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl relative overflow-hidden group">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop')",
      }}
    />
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
      <p className="text-white text-xs font-bold truncate">
        Build a Next.js 14 App in 2 Hours
      </p>
      <p className="text-white/70 text-[10px]">youtube.com</p>
    </div>
  </div>
);

const CodeSnippetPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#1e1e1e] p-4 border border-border/50 flex-col overflow-hidden">
    <div className="flex gap-1.5 mb-3">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
    </div>
    <pre className="text-[10px] font-mono leading-tight">
      <span className="text-pink-400">const</span>{" "}
      <span className="text-blue-400">fetchResource</span>{" "}
      <span className="text-white">=</span>{" "}
      <span className="text-pink-400">async</span>{" "}
      <span className="text-yellow-300">()</span>{" "}
      <span className="text-pink-400">{"=>"}</span>{" "}
      <span className="text-yellow-300">{"{"}</span>
      {"\n  "}
      <span className="text-pink-400">const</span>{" "}
      <span className="text-blue-400">res</span>{" "}
      <span className="text-white">=</span>{" "}
      <span className="text-pink-400">await</span>{" "}
      <span className="text-yellow-200">fetch</span>
      <span className="text-purple-400">{"("}</span>
      <span className="text-orange-300">"/api/resources/id"</span>
      <span className="text-purple-400">{")"}</span>
      <span className="text-white">;</span>
      {"\n  "}
      <span className="text-pink-400">return</span>{" "}
      <span className="text-blue-400">res</span>
      <span className="text-white">.</span>
      <span className="text-yellow-200">json</span>
      <span className="text-purple-400">()</span>
      <span className="text-white">;</span>
      {"\n"}
      <span className="text-yellow-300">{"}"}</span>
    </pre>
  </div>
);

const CategoryPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-muted to-muted/50 border border-border/50 p-4 flex-col justify-center gap-3">
    <div className="flex items-center justify-between w-full p-2 rounded bg-background/50 border border-border/50 backdrop-blur-sm">
      <span className="text-xs font-bold text-primary">frontend</span>
      <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
        14 links
      </span>
    </div>
    <div className="flex items-center justify-between w-full p-2 rounded bg-background/50 border border-border/50 backdrop-blur-sm ml-4">
      <span className="text-xs font-bold text-green-500">database</span>
      <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
        8 links
      </span>
    </div>
    <div className="flex items-center justify-between w-full p-2 rounded bg-background/50 border border-border/50 backdrop-blur-sm">
      <span className="text-xs font-bold text-orange-500">system-design</span>
      <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
        3 links
      </span>
    </div>
  </div>
);

const SearchPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#09090b] border border-border/50 p-4 flex-col justify-center items-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
    <div className="w-full max-w-[90%] bg-muted/80 backdrop-blur-md rounded-lg border border-border/50 p-2 flex items-center gap-2 shadow-2xl relative z-10">
      <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-[10px] text-muted-foreground flex-1">
        Search 'React context'...
      </span>
      <span className="text-[8px] bg-background px-1.5 py-0.5 rounded text-muted-foreground border border-border/50 font-mono">
        ⌘K
      </span>
    </div>
  </div>
);

const IdentityPreview = () => {
  const dots = Array.from({ length: 28 });
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#09090b] to-muted border border-border/50 p-4 flex-col justify-center gap-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full shrink-0 bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
          <Cpu className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-white truncate">
            Level 12 Developer
          </span>
          <span className="text-[9px] text-indigo-400 truncate">
            Top Skills: React, Node.js
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-1">
        {dots.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-sm shrink-0 ${(i * 7) % 10 > 5 ? "bg-indigo-500" : "bg-muted-foreground/20"}`}
          />
        ))}
      </div>
    </div>
  );
};

const DocsPreview = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl relative overflow-hidden group">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop')",
      }}
    />
    <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors" />
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="bg-background/90 backdrop-blur-md border border-border/50 p-3 rounded-lg w-full transform group-hover:-translate-y-1 transition-transform">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-3 h-3 text-indigo-400" />
          <span className="text-[10px] font-bold text-white">Prisma Docs</span>
        </div>
        <div className="w-3/4 h-1.5 bg-muted rounded mb-1.5" />
        <div className="w-1/2 h-1.5 bg-muted rounded" />
      </div>
    </div>
  </div>
);

const items = [
  {
    title: "Rich Link Previews",
    description:
      "Save a YouTube or article link, and we automatically extract the metadata and generate a beautiful preview card.",
    header: <YoutubePreview />,
    icon: <Database className="h-4 w-4 text-primary" />,
  },
  {
    title: "Code Snippets",
    description: "Store code blocks with full syntax highlighting.",
    header: <CodeSnippetPreview />,
    icon: <Code2 className="h-4 w-4 text-primary" />,
  },
  {
    title: "Smart Categorization",
    description:
      "Organize your vault with custom categories and tags to find exactly what you need.",
    header: <CategoryPreview />,
    icon: <Layout className="h-4 w-4 text-primary" />,
  },
  {
    title: "Global Search",
    description:
      "Instantly search through your links, descriptions, and categories.",
    header: <SearchPreview />,
    icon: <Terminal className="h-4 w-4 text-primary" />,
  },
  {
    title: "Developer Identity",
    description:
      "Track your learning journey and build a matrix of your technical skills.",
    header: <IdentityPreview />,
    icon: <Cpu className="h-4 w-4 text-primary" />,
  },
  {
    title: "Documentation Links",
    description:
      "Link directly to official documentation or custom guides with rich visual references.",
    header: <DocsPreview />,
    icon: <BookOpen className="h-4 w-4 text-primary" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-36 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
              v0.1.0-alpha is now live
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl font-sans">
              The operating system for your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">
                tech resources
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-mono">
              Stop losing links in Slack. A developer-centric vault for your
              code snippets, API docs, architecture diagrams, and skill
              matrices.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
              >
                Initialize Vault
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto font-mono"
              >
                Explore Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-20 md:py-32 relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How the Platform Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-mono">
              Save resources directly from your browser. We'll handle the
              organization.
            </p>
          </div>
          <WorkflowDemo />
        </div>
      </section>

      <RecentResources />

      <section
        id="features"
        className="py-20 md:py-32 relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Architecture & Features
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-mono">
                Built with precision. Designed for speed. Everything a developer
                needs to organize their knowledge base.
              </p>
            </div>
          </div>

          <BentoGrid className="max-w-5xl mx-auto">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={i === 0 || i === 3 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      <TestimonialsSection />
      <FaqSection />
    </div>
  );
}
