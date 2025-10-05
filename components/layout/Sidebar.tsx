"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { appName } from "@/constants/constant";

/**
 * Sidebar navigation item definition
 */

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("worksync_role");
    setRole(storedRole || "");
  });

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      show: true,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: ShieldCheck,
      show: role === "admin",
    },
  ];
  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-background border-r border-foreground/10 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-foreground/10">
        {!collapsed && (
          <span className="font-bold text-lg text-primary transition-all">
            {appName}
          </span>
        )}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-2 rounded-md hover:bg-foreground/5 transition"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-foreground/70" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-foreground/70" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(({ label, href, icon: Icon, show }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center rounded-md p-2 text-sm font-medium transition-colors",
                "hover:bg-primary/10 hover:text-primary",
                isActive ? "bg-primary/15 text-primary" : "text-foreground/70",
                show ? "flex" : "hidden"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 flex-shrink-0 transition-all",
                  collapsed ? "mx-auto" : "mr-3"
                )}
              />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-foreground/10 text-xs text-foreground/60">
        {!collapsed && (
          <p>
            © {new Date().getFullYear()} {appName}
          </p>
        )}
      </div>
    </aside>
  );
}
