"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  TerminalSquare,
  LayoutDashboard,
  Bookmark,
  Settings,
  LogOut,
  ChevronUp,
  User2,
  Code2,
  FolderOpen,
  PlusCircle,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
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
        router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <Sidebar className="border-r border-border/40 font-mono">
      <SidebarHeader className="border-b border-border/40 p-4 bg-sidebar">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <TerminalSquare className="h-5 w-5" />
          </div>
          <span className="font-sans font-bold tracking-tight text-lg">
            DevVault
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase font-bold text-muted-foreground/70">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/dashboard"} render={<Link href="/dashboard" />} tooltip="Overview">
                  <LayoutDashboard />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname.startsWith("/dashboard/vault")} render={<Link href="/dashboard/vault" />} tooltip="My Vault">
                  <FolderOpen />
                  <span>My Vault</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname.startsWith("/dashboard/snippets")} render={<Link href="/dashboard/snippets" />} tooltip="Saved Snippets">
                  <Code2 />
                  <span>Snippets</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname.startsWith("/dashboard/links")} render={<Link href="/dashboard/links" />} tooltip="Saved Links">
                  <Bookmark />
                  <span>Links</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname.startsWith("/dashboard/categories")} render={<Link href="/dashboard/categories" />} tooltip="Categories">
                  <FolderOpen />
                  <span>Categories</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname.startsWith("/dashboard/add")} render={<Link href="/dashboard/add" />} tooltip="Add Resource">
                  <PlusCircle />
                  <span>Add Resource</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/" />} tooltip="Back to Home" className="mt-4 border border-border/50 bg-muted/50 hover:bg-muted">
                  <Home className="text-primary" />
                  <span className="font-bold">Return to Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border/40 bg-sidebar mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-transparent hover:border-border/50 transition-colors"
                  />
                }
              >
                <Avatar className="h-8 w-8 rounded-lg border border-border/50">
                  <AvatarImage src={user?.imageUrl} alt={user?.name} />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-bold">
                    {loading
                      ? "..."
                      : user?.name?.[0]?.toUpperCase() || (
                          <User2 className="h-4 w-4" />
                        )}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold font-sans">
                    {loading ? "Loading..." : user?.name || "Unknown"}
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground">
                    {loading ? "..." : user?.email || "unknown@email.com"}
                  </span>
                </div>
                <ChevronUp className="ml-auto size-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-border/50 shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-card"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem
                  render={<Link href="/dashboard/profile" />}
                  className="cursor-pointer font-mono text-sm focus:bg-primary/10 focus:text-primary"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/40" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer font-mono text-sm font-bold"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
