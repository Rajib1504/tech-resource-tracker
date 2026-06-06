"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Code2, Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AddResourcePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [type, setType] = useState<"LINK" | "SNIPPET">("LINK");
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    categoryId: "",
    snippet: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (res.ok) {
          setCategories(data.data || []);
          if (data.data?.length > 0) {
            setFormData(prev => ({ ...prev, categoryId: data.data[0].id }));
          }
        }
      } catch (error) {
        toast.error("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.categoryId) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (type === "LINK" && !formData.url) {
      toast.error("URL is required for links.");
      return;
    }
    if (type === "SNIPPET" && !formData.snippet) {
      toast.error("Code snippet is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add resource");
      }

      toast.success("Resource added successfully!");
      router.push("/dashboard/vault");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-10">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-3xl mx-auto w-full">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-sans">Add Resource</h1>
        <p className="text-muted-foreground font-mono">
          Save a new link or code snippet to your vault.
        </p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        
        {/* Type Selector */}
        <div className="flex p-1 bg-background border border-border/50 rounded-lg mb-6 w-fit">
          <button
            type="button"
            onClick={() => setType("LINK")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold font-mono rounded-md transition-colors ${
              type === "LINK" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Link2 className="w-4 h-4" /> Link
          </button>
          <button
            type="button"
            onClick={() => setType("SNIPPET")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold font-mono rounded-md transition-colors ${
              type === "SNIPPET" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Code2 className="w-4 h-4" /> Snippet
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-sans text-sm transition-all"
              placeholder="e.g. Complete Guide to Next.js App Router"
            />
          </div>

          {type === "LINK" && (
            <div className="space-y-2">
              <label className="text-sm font-medium font-mono">URL <span className="text-red-500">*</span></label>
              <input
                type="url"
                required={type === "LINK"}
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
                placeholder="https://..."
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Category <span className="text-red-500">*</span></label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-sans text-sm transition-all"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="text-xs text-red-500 mt-1 font-mono">You need to create a category first!</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-sans text-sm transition-all min-h-[80px]"
              placeholder="What is this resource about?"
            />
          </div>

          {type === "SNIPPET" && (
            <div className="space-y-2">
              <label className="text-sm font-medium font-mono">Code Snippet <span className="text-red-500">*</span></label>
              <textarea
                required={type === "SNIPPET"}
                value={formData.snippet}
                onChange={(e) => setFormData({ ...formData, snippet: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all min-h-[200px]"
                placeholder="const example = () => { ... }"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full font-mono font-bold group"
            disabled={isSubmitting || categories.length === 0}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
            {isSubmitting ? "Saving..." : "Save Resource"}
          </Button>
        </form>
      </div>
    </div>
  );
}
