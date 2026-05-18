"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogCreationMenu() {
  const pathname = usePathname();
  const isActive = pathname?.startsWith("/admin/blog");

  return (
    <Link
      href="/admin/blog"
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-[#1a6b3c] text-white shadow-sm shadow-[#1a6b3c]/10"
          : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full",
          isActive ? "bg-[#c9a84c]/15 text-[#c9a84c]" : "bg-slate-100 text-slate-500"
        )}
      >
        <Pencil className="h-4 w-4" />
      </span>
      Blog Creation
    </Link>
  );
}
