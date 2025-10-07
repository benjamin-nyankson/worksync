"use client";

import { APP_NAME } from "@/constants/constant";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground/5 text-foreground/80 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-primary">{APP_NAME}</h3>
          <p className="mt-2 text-sm">
            Simplifying leave management for teams.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="space-y-1 text-sm">
            <li>
              Email: <span className="lowercase">support@{APP_NAME}.com</span>
            </li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-foreground/10 text-center py-4 text-xs">
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
}

export const quickLinks = [
  {
    name: "Features",
    href: "features",
  },
  {
    name: "Pricing",
    href: "pricing",
  },
  {
    name: "About",
    href: "about",
  },
  {
    name: "Contact",
    href: "contact",
  },
];
