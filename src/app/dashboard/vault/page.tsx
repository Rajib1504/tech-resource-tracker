"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Loader2 } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { toast } from "sonner";

export default function VaultPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("/api/resources");
        const data = await res.json();
        if (res.ok) {
          setResources(data.data || []);
        } else {
          toast.error("Failed to fetch resources");
        }
      } catch (error) {
        toast.error("An error occurred while loading your vault");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-sans">My Vault</h1>
        <p className="text-muted-foreground font-mono">
          Browse and manage all of your saved resources.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] mt-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-sans mb-2">Your vault is empty</h2>
          <p className="text-sm text-muted-foreground font-mono max-w-[400px]">
            Start adding resources to see them appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {resources.map((resource, i) => (
            <ResourceCard key={resource.id} resource={resource} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
