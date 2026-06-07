"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { TerminalSquare, User2, LayoutDashboard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { IconLogo } from "./icon-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-border/40 bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <IconLogo className="h-6 w-auto text-primary transition-transform group-hover:scale-105" />
          <span className="font-mono font-bold tracking-tight">DevVault</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-mono text-muted-foreground">
            <Link href="/#features" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="/#reviews" className="hover:text-foreground transition-colors">
              Reviews
            </Link>
            <Link href="/#faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-2 border-l border-border/40 pl-4">
            <ThemeToggle />
            
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse ml-2" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none ml-2">
                  <Avatar className="h-8 w-8 rounded-full border border-border/50 transition-opacity hover:opacity-80">
                    <AvatarImage src={user?.imageUrl} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user?.name?.[0]?.toUpperCase() || <User2 className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 font-mono rounded-xl border-border/50 shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-card">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-bold leading-none">{user?.name || "Unknown"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || "unknown@email.com"}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-border/40" />
                  <DropdownMenuItem render={<Link href="/dashboard" />} className="cursor-pointer focus:bg-primary/10 focus:text-primary">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/40" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500 font-bold">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ml-2"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
