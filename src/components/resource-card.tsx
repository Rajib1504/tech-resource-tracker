"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Code2, ExternalLink, Calendar, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";

interface ResourceCardProps {
  resource: any;
  index?: number;
  showActions?: boolean;
}

export function ResourceCard({ resource, index = 0, showActions = false }: ResourceCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(resource.snippet);
      setIsCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        nativeButton={false}
        render={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-colors shadow-sm relative cursor-pointer text-left"
          />
        }
      >
          <div className="h-40 bg-muted/40 relative overflow-hidden flex items-center justify-center border-b border-border/50">
            {resource.thumbnailUrl ? (
              <img
                src={resource.thumbnailUrl}
                alt={resource.title}
                className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-muted/50 to-background">
                {resource.type === "LINK" ? (
                  <Link2 className="w-10 h-10 text-muted-foreground/30" />
                ) : (
                  <Code2 className="w-10 h-10 text-muted-foreground/30" />
                )}
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
              {resource.type === "LINK" ? (
                <Link2 className="w-3.5 h-3.5 text-indigo-400" />
              ) : (
                <Code2 className="w-3.5 h-3.5 text-green-400" />
              )}
              <span className="font-mono">
                {new Date(resource.createdAt).toLocaleDateString()}
              </span>
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
                    <img
                      src={resource.user.imageUrl}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    resource.user?.name?.[0]?.toUpperCase() || "U"
                  )}
                </div>
                <span className="text-xs text-muted-foreground font-mono truncate max-w-[100px]">
                  {resource.user?.name || "Unknown"}
                </span>
              </div>
              <div className="p-2 text-muted-foreground group-hover:text-primary transition-colors">
                 <span className="sr-only">View Details</span>
                 <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </div>
            </div>
          </div>
        </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-card border-border/50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {resource.category && (
              <span className="bg-primary/10 text-primary text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded">
                {resource.category.name}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <Calendar className="w-3 h-3" />
              {new Date(resource.createdAt).toLocaleDateString()}
            </span>
          </div>
          <DialogTitle className="text-xl md:text-2xl font-bold font-sans">
            {resource.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {resource.thumbnailUrl && (
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden border border-border/50 relative bg-muted/40">
              <img
                src={resource.thumbnailUrl}
                alt={resource.title}
                className="w-full h-full object-contain p-2"
              />
            </div>
          )}

          {resource.description && (
            <div className="text-sm text-muted-foreground leading-relaxed">
              {resource.description}
            </div>
          )}

          {resource.type === "SNIPPET" && resource.snippet && (
            <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto border border-border/50 font-mono text-sm relative group">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-md bg-background/80 backdrop-blur hover:bg-background text-muted-foreground hover:text-foreground border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
                title="Copy snippet"
              >
                {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre>
                <code>{resource.snippet}</code>
              </pre>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold overflow-hidden border border-primary/20">
                {resource.user?.imageUrl ? (
                  <img
                    src={resource.user.imageUrl}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  resource.user?.name?.[0]?.toUpperCase() || "U"
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  {resource.user?.name || "Unknown"}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  Added by
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {showActions && (
                <>
                  <Link
                    href={`/dashboard/edit/${resource.id}`}
                    className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors font-medium text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      if (!confirm("Are you sure you want to delete this resource?")) return;
                      try {
                        const res = await fetch(`/api/resources/${resource.id}`, { method: "DELETE" });
                        if (!res.ok) throw new Error("Failed to delete");
                        toast.success("Resource deleted!");
                        window.location.reload();
                      } catch (err) {
                        toast.error("Failed to delete resource");
                      }
                    }}
                    className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-md hover:bg-red-500/20 transition-colors font-medium text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
              {resource.type === "LINK" && resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-px hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)]"
                >
                  Visit <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
