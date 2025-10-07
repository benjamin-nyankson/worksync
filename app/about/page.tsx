"use client";

import { UnprotectedLayout } from "@/components/layout/UnprotectedLayout";
import { Button } from "@/components/ui/Button";
import {
  Users,
  Target,
  HeartHandshake,
  Rocket,
  Code,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { APP_NAME } from "@/constants/constant";

export default function AboutPage() {
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
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <UnprotectedLayout>
      <motion.section
        className="min-h-screen bg-background text-foreground"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div
          className="relative overflow-hidden py-20 px-6 md:px-10 lg:px-16"
          variants={itemVariants}
        >
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <motion.h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              variants={itemVariants}
            >
              Building <span className="text-primary">{APP_NAME}</span> — A
              Better Way to Manage Teams
            </motion.h1>
            <motion.p
              className="text-foreground/70 max-w-2xl mx-auto text-lg"
              variants={itemVariants}
            >
              Our mission is simple — to empower organizations with tools that
              make teamwork, transparency, and time management effortless.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/register">
                <Button variant="primary" size="lg" className="px-8">
                  Join the Journey
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Background Glow */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 -z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="max-w-6xl mx-auto py-20 px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
        >
          <motion.div className="space-y-5" variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-foreground/70 leading-relaxed">
              {APP_NAME} was born out of a simple frustration — tracking leaves,
              team schedules, and availability shouldn’t be this hard. We set
              out to create a system that simplifies workforce management
              without sacrificing flexibility or user experience.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Since then, we’ve been on a mission to build tools that help teams
              work smarter, not harder. Every line of code, every pixel, and
              every decision is guided by our commitment to clarity,
              collaboration, and continuous improvement.
            </p>
          </motion.div>

          <motion.div
            className="relative flex justify-center items-center"
            variants={itemVariants}
          >
            <div className="absolute -inset-2 bg-primary/10 blur-2xl rounded-full" />
            <motion.img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80"
              alt="Team collaboration"
              className="relative z-10 rounded-2xl shadow-lg border border-foreground/10 object-cover w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            />
          </motion.div>
        </motion.div>

        {/* Mission & Values Section */}
        <motion.div className="bg-primary/5 py-20 px-6" variants={itemVariants}>
          <div className="max-w-6xl mx-auto text-center space-y-10">
            <h2 className="text-3xl font-bold">Our Mission & Values</h2>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              We believe that great teams are built on trust, transparency, and
              time well spent. Our values guide us in building solutions that
              make that possible for everyone.
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
              variants={containerVariants}
            >
              {[
                {
                  icon: <Target className="h-6 w-6 text-primary" />,
                  title: "Purpose-Driven Design",
                  desc: "We design with intention — every feature serves a real problem faced by teams today.",
                },
                {
                  icon: <HeartHandshake className="h-6 w-6 text-primary" />,
                  title: "Collaboration First",
                  desc: "We thrive on teamwork, both in our product and our culture. Collaboration drives innovation.",
                },
                {
                  icon: <Rocket className="h-6 w-6 text-primary" />,
                  title: "Continuous Growth",
                  desc: "We iterate fast, learn faster, and always aim to deliver more value than yesterday.",
                },
                {
                  icon: <Code className="h-6 w-6 text-primary" />,
                  title: "Built by Developers, for Teams",
                  desc:
                    APP_NAME +
                    " is crafted by passionate engineers who understand the balance between logic and empathy.",
                },
                {
                  icon: <Users className="h-6 w-6 text-primary" />,
                  title: "People Over Processes",
                  desc: "Our users aren’t just data points — they’re people who deserve tools that work for them.",
                },
                {
                  icon: <Sparkles className="h-6 w-6 text-primary" />,
                  title: "Delight in the Details",
                  desc: "Small touches matter — from smooth animations to intuitive layouts, we sweat the details.",
                },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  className="p-6 border border-foreground/10 rounded-2xl bg-background hover:shadow-lg hover:border-primary/30 transition-all"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="mb-3">{value.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div className="py-20 px-6 text-center" variants={itemVariants}>
          <div className="max-w-4xl mx-auto rounded-3xl bg-primary/1 py-16 px-6 md:px-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-4">
              Join Us on Our Journey 🚀
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
              Whether you’re a company looking to simplify workforce management
              or a developer excited about building the future of work —
              {APP_NAME} welcomes you.
            </p>
            <div className="flex flex-col justify-center md:flex-row lg:flex-row gap-4">
              <Link href="/register">
                <Button variant="primary" size="lg" className="w-full px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </UnprotectedLayout>
  );
}
