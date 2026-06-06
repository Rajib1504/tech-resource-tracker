"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Plus, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (res.ok) {
        setCategories(data.data || []);
      }
    } catch (error) {
      toast.error("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setIsSubmitting(true);
    // Auto-generate slug from name
    const slug = newCategoryName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName, slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create category");
      }

      toast.success("Category created successfully!");
      setNewCategoryName("");
      fetchCategories(); // Refresh the list
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-sans">
          Categories
        </h1>
        <p className="text-muted-foreground font-mono">
          Manage the organizational tags for your resources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <div className="lg:col-span-1 h-fit bg-card border border-border/50 rounded-xl p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            New Category
          </h2>
          <form onSubmit={handleCreateCategory} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium font-mono uppercase text-muted-foreground">
                Category Name
              </label>
              <input
                type="text"
                required
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
                placeholder="e.g. Next.js"
              />
            </div>
            <Button
              type="submit"
              className="w-full font-mono font-bold group"
              disabled={isSubmitting || !newCategoryName.trim()}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 bg-card border border-border/50 rounded-xl p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-primary" />
            Existing Categories
          </h2>

          {loading ? (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center p-10 border border-dashed border-border/50 rounded-lg">
              <p className="text-muted-foreground font-mono text-sm">
                No categories exist yet. Create your first one!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:border-primary/50 transition-colors bg-background"
                >
                  <div className="flex flex-col">
                    <span className="font-bold font-sans capitalize">
                      {category.name}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {category.slug}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
