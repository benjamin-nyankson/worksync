"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { HomeIcon, AlertTriangle } from "lucide-react";
import { UnprotectedLayout } from "@/components/layout/UnprotectedLayout";

export default function NotFoundPage() {
  return (
    <UnprotectedLayout>
      <div
        className={cn(
          "flex flex-col items-center justify-center min-h-screen text-center bg-background text-foreground p-6"
        )}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-6"
        >
          <AlertTriangle className="w-16 h-16 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold mb-3"
        >
          404 – Page Not Found
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-foreground/70 max-w-md mb-8"
        >
          Oops! The page you’re looking for doesn’t exist or may have been
          moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/">
            <Button
              variant="primary"
              size="md"
              className="inline-flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        
      </div>
    </UnprotectedLayout>
  );
}
