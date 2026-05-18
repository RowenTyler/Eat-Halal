"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import BlogCreationMenu from "@/components/admin/BlogCreationMenu";
import {
  LayoutDashboard,
  Store,
  Star,
  Users,
  BarChart3,
  Settings,
  Megaphone,
  UtensilsCrossed,
  Shield,
  FileCheck,
  Copy,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const reviewerNavItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/my-reviews", label: "My Reviews", icon: Star },
  { href: "/favorites", label: "Favorites", icon: Store },
  { href: "/profile-settings", label: "Settings", icon: Settings },
];

const ownerNavItems: NavItem[] = [
  { href: "/restaurant-dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/menu-management", label: "Menu", icon: UtensilsCrossed },
  { href: "/review-management", label: "Reviews", icon: Star },
  { href: "/restaurant-analytics", label: "Analytics", icon: BarChart3 },
  { href: "/promotions-manager", label: "Promotions", icon: Megaphone },
  { href: "/profile-settings", label: "Settings", icon: Settings },
];

const adminPrimaryNavItems: NavItem[] = [
  { href: "/admin-dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin-dashboard/restaurants", label: "Restaurants", icon: Store },
];

const adminSecondaryNavItems: NavItem[] = [
  { href: "/admin-dashboard/claims", label: "Claims", icon: FileCheck },
  { href: "/admin-dashboard/verification", label: "Verification", icon: Shield },
  { href: "/admin-dashboard/duplicates", label: "Duplicates", icon: Copy },
  { href: "/admin-dashboard/users", label: "Users", icon: Users },
  { href: "/admin-dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardSidebarProps {
  role?: "reviewer" | "owner" | "admin";
}

export function DashboardSidebar({ role = "reviewer" }: DashboardSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const renderNavItem = (item: NavItem) => (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive(item.href)
          ? "bg-[#1a6b3c] text-white"
          : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  );

  return (
    <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-1">
        {role === "admin" ? (
          <>
            {adminPrimaryNavItems.map(renderNavItem)}
            <BlogCreationMenu />
            {adminSecondaryNavItems.map(renderNavItem)}
          </>
        ) : role === "owner" ? (
          ownerNavItems.map(renderNavItem)
        ) : (
          reviewerNavItems.map(renderNavItem)
        )}
      </nav>
    </aside>
  );
}
