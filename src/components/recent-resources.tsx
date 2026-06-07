"use client";

import { useEffect, useState } from "react";
import { getRecentResources } from "@/app/actions/resource-actions";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "./resource-card";

export function RecentResources() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentResources(4).then((data) => {
      setResources(data.resources);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-20 relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Recently Added
            </h2>
            <p className="text-muted-foreground font-mono">
              Loading the vault...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse max-w-7xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[300px] bg-card/50 rounded-xl border border-border/50"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (resources.length === 0) {
    return null; // Hide section if no resources are in the database
  }

  return (
    <section
      id="recent-resources"
      className="py-20 relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Live Feed
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Recently Added to the Vault
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed font-mono">
            Discover the latest resources and snippets shared by the community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {resources.map((resource, i) => (
            <ResourceCard key={resource.id} resource={resource} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/resources">
            <Button
              size="lg"
              className="font-mono gap-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all bg-primary hover:bg-primary/90"
            >
              View All Resources <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
