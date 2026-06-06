"use client";

import { useEffect, useState } from "react";
import { getRecentResources } from "@/app/actions/resource-actions";
import { motion } from "framer-motion";
import { Link2, Code2, ExternalLink } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RecentResources() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentResources(5).then((data) => {
      setResources(data.resources);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-20 relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Recently Added</h2>
            <p className="text-muted-foreground font-mono">Loading the vault...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse max-w-7xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[300px] bg-card/50 rounded-xl border border-border/50" />
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
    <section id="recent-resources" className="py-20 relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-md">
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
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-colors shadow-sm relative"
            >
              <div className="h-40 bg-muted relative overflow-hidden flex items-center justify-center border-b border-border/50">
                {resource.thumbnailUrl ? (
                  <img src={resource.thumbnailUrl} alt={resource.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-muted/50 to-background">
                    {resource.type === "LINK" ? <Link2 className="w-10 h-10 text-muted-foreground/30" /> : <Code2 className="w-10 h-10 text-muted-foreground/30" />}
                  </div>
                )}
                {resource.category && (
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md border border-border/50 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider text-primary shadow-sm">
                    {resource.category.name}
                  </div>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  {resource.type === "LINK" ? <Link2 className="w-3.5 h-3.5 text-indigo-400" /> : <Code2 className="w-3.5 h-3.5 text-green-400" />}
                  <span className="font-mono">{new Date(resource.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="font-bold text-foreground line-clamp-2 text-base mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                {resource.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
                    {resource.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold overflow-hidden border border-primary/20">
                      {resource.user?.imageUrl ? (
                        <img src={resource.user.imageUrl} alt="user" className="w-full h-full object-cover" />
                      ) : (
                        resource.user?.name?.[0]?.toUpperCase() || "U"
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground font-mono truncate max-w-[100px]">
                      {resource.user?.name || "Unknown"}
                    </span>
                  </div>
                  {resource.type === "LINK" && resource.url && (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/resources">
            <Button size="lg" className="font-mono gap-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all bg-primary hover:bg-primary/90">
              View All Resources <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
