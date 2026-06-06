"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Link2, Code2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EditResourcePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
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
    const fetchData = async () => {
      try {
        const [catRes, resRes] = await Promise.all([
          fetch("/api/categories"),
          fetch(`/api/resources/${id}`)
        ]);

        const catData = await catRes.json();
        if (catRes.ok) setCategories(catData.data || []);

        const resData = await resRes.json();
        if (resRes.ok) {
          const r = resData.data;
          setType(r.type);
          setFormData({
            title: r.title || "",
            url: r.url || "",
            description: r.description || "",
            categoryId: r.categoryId || "",
            snippet: r.snippet || "",
          });
        } else {
          toast.error("Failed to load resource data");
          router.push("/dashboard/vault");
        }
      } catch (error) {
        toast.error("Error loading edit page.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.categoryId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/resources/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update resource");
      }

      toast.success("Resource updated successfully!");
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
        <h1 className="text-3xl font-bold tracking-tight font-sans">Edit Resource</h1>
        <p className="text-muted-foreground font-mono">
          Update the details of your saved resource.
        </p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        
        {/* Type Selector (Disabled in edit) */}
        <div className="flex p-1 bg-muted/50 border border-border/50 rounded-lg mb-6 w-fit opacity-70 cursor-not-allowed">
          <button
            type="button"
            disabled
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold font-mono rounded-md transition-colors ${
              type === "LINK" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <Link2 className="w-4 h-4" /> Link
          </button>
          <button
            type="button"
            disabled
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold font-mono rounded-md transition-colors ${
              type === "SNIPPET" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
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
              disabled
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1 font-mono">Categories cannot be changed after creation.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-sans text-sm transition-all min-h-[80px]"
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
              />
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full font-mono font-bold"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full font-mono font-bold group"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
