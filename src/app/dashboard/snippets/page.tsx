"use client";

import { useEffect, useState } from "react";
import { Code2, Loader2 } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { toast } from "sonner";

export default function SnippetsPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("/api/resources");
        const data = await res.json();
        if (res.ok) {
          const snippets = (data.data || []).filter((r: any) => r.type === "SNIPPET");
          setResources(snippets);
        } else {
          toast.error("Failed to fetch resources");
        }
      } catch (error) {
        toast.error("An error occurred while loading snippets");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-sans">Code Snippets</h1>
        <p className="text-muted-foreground font-mono">
          A dedicated collection of your reusable code blocks.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-green-500/50" />
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] mt-8">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
            <Code2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-sans mb-2">No snippets yet</h2>
          <p className="text-sm text-muted-foreground font-mono max-w-[400px]">
            Save and organize useful code blocks here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {resources.map((resource, i) => (
            <ResourceCard key={resource.id} resource={resource} index={i} showActions={true} />
          ))}
        </div>
      )}
    </div>
  );
}
