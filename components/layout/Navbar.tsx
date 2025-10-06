"use client";

import { Button } from "@/components/ui/Button";
import { appName } from "@/constants/constant";
import { User } from "@/interface/interface";
import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Dropdown } from "../ui/Dropdown";
import { quickLinks } from "./Footer";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("user_data");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("worksync_jwt");
    localStorage.removeItem("worksync_role");
    router.push("/login");
  };

  return (
    <header className="bg-background border-b border-foreground/10 px-6">
      <div className=" py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          {appName}
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-foreground/80">
          {quickLinks.map((link) => {
            const isActive =
              pathname.split("/")[1] === link.href ||
              pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-foreground/80"
                }`}
              >
                {link.name}

                {/* Optional underline animation */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA or User Menu */}
        <div className="flex gap-2 items-center">
          {user ? (
            <>
              <span className="text-sm text-foreground/80">
                Hi, {user.name}
              </span>
              <Dropdown
                trigger={
                  <Avatar className="cursor-pointer">
                    {/* <AvatarImage src="" /> */}
                    <AvatarFallback>
                      {user?.name?.split(" ")[0][0]}
                      {user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                }
                label=""
                items={[
                  {
                    label: "Dashboard",
                    icon: <LayoutDashboard className="h-4 w-4" />,
                    onClick: () => router.push("/dashboard"),
                  },
                  {
                    label: "Logout",
                    icon: <LogOut className="h-4 w-4" />,
                    onClick: () => handleLogout(),
                  },
                ]}
              />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
