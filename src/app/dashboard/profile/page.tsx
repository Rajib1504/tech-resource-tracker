"use client";

import { useState } from "react";
import { User2, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      toast.success("Password updated successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-4xl mx-auto w-full">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-sans">Profile Settings</h1>
        <p className="text-muted-foreground font-mono">
          Manage your account security and password.
        </p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/40">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-sans">Change Password</h2>
            <p className="text-sm text-muted-foreground font-mono">Update your account password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Current Password</label>
            <input
              type="password"
              required
              value={formData.oldPassword}
              onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">New Password</label>
            <input
              type="password"
              required
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Confirm New Password</label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full font-mono font-bold group"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
