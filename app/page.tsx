'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { LinkButton } from '@/components/ui/LinkButton';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
      },
    },
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <motion.section
          className="flex flex-col items-center justify-center text-center py-20 px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            Manage Your Leaves <span className="text-primary">Smarter</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-8"
            variants={itemVariants}
          >
            A simple and powerful platform to request, track, and approve leave
            with ease.
          </motion.p>
          <motion.div className="flex gap-4" variants={itemVariants}>
            <LinkButton href="register" variant="primary" size="lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </LinkButton>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </motion.div>
        </motion.section>

        {/* Features */}
        <motion.section
          id="features"
          className="py-16 px-6 bg-foreground/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              className="p-6 bg-background rounded-xl shadow"
              variants={cardVariants}
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">
                Easy Requests
              </h3>
              <p className="text-foreground/80">
                Submit leave requests in seconds with our intuitive form and
                calendar.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-background rounded-xl shadow"
              variants={cardVariants}
            >
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Admin Control
              </h3>
              <p className="text-foreground/80">
                Approve or reject requests quickly, and keep everything
                organized.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-background rounded-xl shadow"
              variants={cardVariants}
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">
                Track Progress
              </h3>
              <p className="text-foreground/80">
                View leave history and upcoming schedules with a powerful
                dashboard.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="py-20 px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={itemVariants}
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            className="text-lg text-foreground/80 mb-8"
            variants={itemVariants}
          >
            Join now and simplify leave management for your team.
          </motion.p>
          <motion.div variants={itemVariants}>
            <LinkButton href="register" variant="primary" size="lg">
              Sign Up Today
            </LinkButton>
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
