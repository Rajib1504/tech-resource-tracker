import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export const metadata = {
  title: "Dashboard | DevVault",
  description: "Manage your developer resources and snippets.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-background flex flex-col flex-1 relative overflow-hidden">
        {/* Same Neo-brutalist dot pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border/40 bg-background/80 backdrop-blur-md px-4 relative z-20">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border/40 mr-2" />
          <h1 className="text-sm font-bold font-mono text-muted-foreground uppercase tracking-wider">Dashboard</h1>
        </header>
        
        <div className="relative z-10 flex-1 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
