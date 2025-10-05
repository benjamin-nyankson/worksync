'use client';

import { UnprotectedLayout } from '@/components/layout/UnprotectedLayout';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for individuals starting out.',
    features: [
      '1 user seat',
      'Limited leave requests',
      'Basic calendar view',
      'Community support',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9/mo',
    description: 'Ideal for small teams and growing startups.',
    features: [
      'Up to 10 user seats',
      'Unlimited leave requests',
      'Advanced calendar analytics',
      'Priority email support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations needing full control.',
    features: [
      'Unlimited users',
      'Custom integrations',
      'Dedicated account manager',
      '24/7 premium support',
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
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
        // ease: 'easeOut',
      },
    },
  };

  return (
    <UnprotectedLayout>
      <motion.section
        className="min-h-screen bg-background text-foreground py-20 "
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h1 className="text-4xl font-bold mb-3" variants={itemVariants}>
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            className="text-foreground/70 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Choose the plan that fits your organization’s needs and scale easily
            as you grow. No hidden fees, no surprises.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8  mx-auto"
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-2xl border border-foreground/10 p-8 shadow-md hover:shadow-lg transition-all ${
                plan.highlighted
                  ? 'bg-primary text-background scale-[1.02]'
                  : 'bg-background text-foreground'
              }`}
              variants={cardVariants}
              custom={index}
            >
              {/* Most Popular Tag */}
              {plan.highlighted && (
                <span className="absolute top-3 right-3 bg-secondary text-background text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div>
                <h2
                  className={`text-2xl font-bold mb-2 ${
                    plan.highlighted ? 'text-background' : 'text-primary'
                  }`}
                >
                  {plan.name}
                </h2>
                <p
                  className={`text-3xl font-semibold mb-2 ${
                    plan.highlighted ? 'text-background' : 'text-foreground'
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`text-sm mb-6 ${
                    plan.highlighted
                      ? 'text-background/90'
                      : 'text-foreground/70'
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2
                        size={18}
                        className={
                          plan.highlighted ? 'text-background' : 'text-primary'
                        }
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Button
                  variant={plan.highlighted ? 'secondary' : 'primary'}
                  size="md"
                  className="w-full"
                >
                  {plan.highlighted ? 'Get Started' : 'Choose Plan'}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="max-w-4xl mx-auto mt-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl font-semibold mb-4"
            variants={itemVariants}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p className="text-foreground/70 mb-8" variants={itemVariants}>
            Still unsure which plan fits best? We’ve got answers to common
            questions.
          </motion.p>

          <motion.div
            className="grid sm:grid-cols-2 gap-6 text-left"
            variants={containerVariants}
          >
            <motion.div
              className="p-6 rounded-xl border border-foreground/10 bg-background/50 hover:shadow-md transition"
              variants={itemVariants}
            >
              <h3 className="font-semibold mb-2 text-primary">
                Can I switch plans later?
              </h3>
              <p className="text-sm text-foreground/70">
                Absolutely! You can upgrade or downgrade at any time from your
                dashboard.
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl border border-foreground/10 bg-background/50 hover:shadow-md transition"
              variants={itemVariants}
            >
              <h3 className="font-semibold mb-2 text-primary">
                Is there a free trial?
              </h3>
              <p className="text-sm text-foreground/70">
                Yes, all new accounts start with a 14-day free trial of our Pro
                plan.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </UnprotectedLayout>
  );
}