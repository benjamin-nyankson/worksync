"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { Textarea } from "@/components/ui/TextArea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UnprotectedLayout } from "@/components/layout/UnprotectedLayout";
// import { Map } from "@/components/Map";
import dynamic from "next/dynamic";
import { appName } from "@/constants/constant";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill out all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully 🚀");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message 😢. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const Map = dynamic(() => import("@/components/Map").then((mod) => mod.Map), {
    ssr: false,
  });
  return (
    <UnprotectedLayout>
      <section className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-20 px-6 bg-gradient-to-b from-primary/10 via-background to-background"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch with <span className="text-primary">{appName}</span>
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Have questions, feedback, or partnership ideas? We’d love to hear
            from you. Let’s build something amazing together.
          </p>
        </motion.div>

        {/* Contact Section */}
        <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-foreground/70 mb-8">
              Reach out to us via the form or through any of the channels below.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="text-primary h-6 w-6" />
                <div>
                  <p className="text-sm text-foreground/70">Email</p>
                  <p className="font-medium lowercase">support@{appName}.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-primary h-6 w-6" />
                <div>
                  <p className="text-sm text-foreground/70">Phone</p>
                  <p className="font-medium">+1 (555) 234-5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-primary h-6 w-6" />
                <div>
                  <p className="text-sm text-foreground/70">Office</p>
                  <p className="font-medium">123 Sync Street, Tech City</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-semibold text-lg mb-3 text-primary">
                Follow Us
              </h3>
              <div className="flex gap-4 text-foreground/70">
                <a href="#" className="hover:text-primary transition">
                  Twitter
                </a>
                <a href="#" className="hover:text-primary transition">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-primary transition">
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background border border-foreground/10 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

            <div className="space-y-4">
              <InputField
                label="Name"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Textarea
                label="Message"
                name="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 bg-primary/5 py-16 px-6 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
          <p className="text-foreground/70 mb-10">
            Come meet our team and learn more about how {appName} can help your
            business.
          </p>
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24 bg-primary/5 py-16 px-6 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Our Offices Around the World
            </h2>
            <p className="text-foreground/70 mb-10">
              We’re growing fast — here are a few of the cities where you can
              find {appName} teams.
            </p>

            <div className="max-w-5xl mx-auto">
              <Map
                locations={[
                  {
                    lat: 5.6037,
                    lng: -0.187,
                    label: "Accra, Ghana",
                  },
                  {
                    lat: 5.2693,
                    lng: -1.0183,
                    label: "Mankessim, Ghana",
                  },
                  {
                    lat: 4.9014,
                    lng: -1.784,
                    label: "Takoradi, Ghana (HQ",
                  },
                  {
                    lat: -1.2921,
                    lng: 36.8219,
                    label: "Nairobi, Kenya",
                  },
                  {
                    lat: 51.5072,
                    lng: -0.1276,
                    label: "London, UK",
                  },
                ]}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </UnprotectedLayout>
  );
}
