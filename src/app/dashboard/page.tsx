"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Code2, Bookmark, ArrowRight, Loader2, BarChart2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/resources");
        const data = await res.json();
        if (res.ok) {
          setResources(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch resources");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalSnippets = resources.filter((r) => r.type === "SNIPPET").length;
  const totalLinks = resources.filter((r) => r.type === "LINK").length;
  
  // Calculate category breakdown
  const categoryCounts = resources.reduce((acc: any, resource: any) => {
    if (resource.category && resource.category.name) {
      const catName = resource.category.name;
      acc[catName] = (acc[catName] || 0) + 1;
    }
    return acc;
  }, {});

  const categoryEntries = Object.entries(categoryCounts).sort((a: any, b: any) => b[1] - a[1]);

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-sans">
          Welcome to your Vault
        </h1>
        <p className="text-muted-foreground font-mono">
          Manage your resources, snippets, and account settings all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col justify-between shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Resources</span>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <FolderOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black font-sans tracking-tighter">
              {loading ? <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /> : resources.length}
            </span>
            <span className="text-sm font-mono text-muted-foreground mb-1">items saved</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col justify-between shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-wider">Snippets</span>
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black font-sans tracking-tighter">
              {loading ? <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /> : totalSnippets}
            </span>
            <span className="text-sm font-mono text-muted-foreground mb-1">code blocks</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col justify-between shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-wider">Links</span>
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
              <Bookmark className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black font-sans tracking-tighter">
              {loading ? <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /> : totalLinks}
            </span>
            <span className="text-sm font-mono text-muted-foreground mb-1">URLs saved</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Category Breakdown */}
        <div className="bg-card border border-border/50 rounded-xl p-6 md:p-8 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <BarChart2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold font-sans">Category Breakdown</h2>
          </div>
          
          {loading ? (
             <div className="flex items-center justify-center p-10">
               <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
             </div>
          ) : categoryEntries.length === 0 ? (
             <p className="text-muted-foreground font-mono text-sm border border-dashed border-border/50 p-6 rounded-lg text-center">
               No resources categorized yet.
             </p>
          ) : (
            <div className="space-y-4">
              {categoryEntries.map(([catName, count]: any) => (
                <div key={catName} className="flex items-center justify-between">
                  <span className="font-mono font-bold capitalize text-sm">{catName}</span>
                  <div className="flex items-center gap-4 w-1/2">
                    <div className="h-2 bg-primary/20 rounded-full flex-1 overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(count / resources.length) * 100}%` }} 
                      />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground font-bold w-4 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-card border border-border/50 rounded-xl p-6 md:p-8 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col justify-center">
          <h2 className="text-2xl font-bold font-sans mb-2">Ready to grow your vault?</h2>
          <p className="text-muted-foreground font-mono mb-6 max-w-[600px]">
            Start adding resources to your vault immediately. You can save code snippets, 
            external tutorial links, GitHub repos, and categorize them for easy access later.
          </p>
          <Link href="/dashboard/add">
            <Button size="lg" className="font-mono font-bold group w-full md:w-auto">
              Add New Resource 
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
