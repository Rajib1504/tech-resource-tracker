import Link from "next/link";
import { TerminalSquare } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.62-.4 7.5-1.8 7.5-8.18a5.46 5.46 0 0 0-1.5-3.8 5.1 5.1 0 0 0-.15-3.8s-1.18-.38-3.9 1.4a13.38 13.38 0 0 0-7 0C6.27 1.4 5.09 1.4 5.09 1.4a5.1 5.1 0 0 0-.15 3.8 5.46 5.46 0 0 0-1.5 3.8c0 6.36 3.88 7.77 7.5 8.18a4.8 4.8 0 0 0-1 3.02v4" />
    <path d="M9 20c-5 1.5-5-2.5-7-3" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <TerminalSquare className="h-5 w-5" />
              </div>
              <span className="font-mono font-bold tracking-tight text-lg">DevVault</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground font-mono">
              The operating system for your developer resources, snippets, and documentation.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="https://github.com/Rajib1504" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://x.com/rajib_dev1504" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <TwitterIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold font-sans uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">Sign In</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">Create Account</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold font-sans uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} DevVault Inc. All rights reserved.
          </p>
          
          {/* Developer System Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-muted/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-muted-foreground">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
