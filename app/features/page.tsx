"use client";

import {
  CheckCircle2,
  Users,
  Calendar,
  Clock,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { UnprotectedLayout } from "@/components/layout/UnprotectedLayout";
import { motion } from "framer-motion";
import { appName } from "@/constants/constant";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Smart Leave Calendar",
      description:
        "Visualize all employee leaves in a single, interactive calendar view. Get instant clarity on team availability.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Team Collaboration",
      description:
        "Coordinate efficiently — see who’s on leave, plan ahead, and ensure smooth workflow coverage.",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Automated Tracking",
      description:
        appName + " keeps an accurate record of all leave types, durations, and approvals — no spreadsheets needed.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Insightful Analytics",
      description:
        "Gain insights with beautiful charts showing leave trends, department summaries, and usage statistics.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Role-Based Access",
      description:
        "Separate dashboards for Admins and Employees — control permissions and actions securely.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Lightning Fast UI",
      description:
        "Built with modern tech (Next.js + Tailwind + GraphQL) for a seamless, responsive, and delightful experience.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        // ease: "Easing",
      },
    },
  };

  return (
    <UnprotectedLayout>
      <section className="bg-background text-foreground min-h-screen py-20 px-6">
        {/* Hero Section */}
        <motion.div
          className="max-w-5xl mx-auto text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            variants={itemVariants}
          >
            Powerful Features for a Smarter Workforce
          </motion.h1>
          <motion.p
            className="text-foreground/70 max-w-2xl mx-auto mb-8 text-lg"
            variants={itemVariants}
          >
            {appName} makes managing employee leaves simple, transparent, and
            efficient — saving your team time and keeping everyone in sync.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/register">
              <Button variant="primary" size="lg" className=" px-8">
                Get Started for Free
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        {/* Features Grid */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-8 border border-foreground/10 rounded-2xl bg-background hover:bg-primary/5 hover:shadow-lg transition-all duration-300"
              variants={cardVariants}
            >
              <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">
                {feature.title}
              </h3>
              <p className="text-sm text-foreground/70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="max-w-5xl mx-auto text-center mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-3xl border border-foreground/10 bg-primary/5 py-16 px-6 md:px-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Start Simplifying Your Leave Management Today
            </h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join teams already using {appName} to streamline workflows and
              improve transparency.
            </p>
            <Link href="/register">
              <Button variant="primary" size="lg" className="rounded-full px-8">
                Try {appName} Free
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Highlight Section */}
        <motion.div
          className="max-w-6xl mx-auto mt-24"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-10 md:p-16 text-center shadow-xl border border-foreground/10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              Everything You Need — Nothing You Don’t
            </h3>
            <p className="text-foreground/70 max-w-3xl mx-auto mb-8">
              From automated leave tracking to role-based permissions and
              real-time analytics, {appName} helps your team stay organized,
              productive, and happy.
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 text-sm text-foreground/80"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                "Fast setup",
                "Secure authentication",
                "Intuitive UI",
                "Dark mode ready",
                "Real-time updates",
                "Cross-device support",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-foreground/10 hover:border-primary transition"
                  variants={itemVariants}
                >
                  <CheckCircle2 size={16} className="text-primary" />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </UnprotectedLayout>
  );
}