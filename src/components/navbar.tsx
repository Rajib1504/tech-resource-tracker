import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { TerminalSquare } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-border/40 bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <TerminalSquare className="h-5 w-5" />
          </div>
          <span className="font-mono font-bold tracking-tight">DevVault</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-mono text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="#reviews" className="hover:text-foreground transition-colors">
              Reviews
            </Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-2 border-l border-border/40 pl-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
