import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import AboutSection from "../sections/AboutSection";
import DoctorsSection from "../sections/DoctorsSection";
import ServicesSection from "../sections/ServicesSection";
import StatsSection from "../sections/StatsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import WhyChooseUsSection from "../sections/WhyChooseUsSection";
import ContactSection from "../sections/ContactSection";


const heroImage =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85";

function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[760px] overflow-hidden bg-clinic-background pt-20">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-clinic-mint/60 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-white blur-3xl"
        />

        <div className="container-clinic relative">
          <div className="grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-20">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* Eyebrow */}
              <div className="eyebrow">
                <span className="h-2 w-2 rounded-full bg-clinic-teal" />
                Trusted Healthcare
              </div>

              {/* Heading */}
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-[-0.045em] text-clinic-navy sm:text-6xl lg:text-7xl">
                Healthcare
                <span className="block text-clinic-teal">
                  Designed Around You.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-xl text-base leading-8 text-clinic-muted sm:text-lg">
                Expert medical care, advanced technology, and a team that puts
                your wellbeing first. Experience healthcare that feels
                personal, thoughtful, and genuinely human.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/book-appointment"
                  className="clinic-button clinic-button-primary group"
                >
                  Book an Appointment

                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                <Link
                  to="/services"
                  className="clinic-button clinic-button-secondary group"
                >
                  Explore Our Services

                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Trust Indicator */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex items-center gap-1 text-clinic-teal">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <div className="h-5 w-px bg-clinic-border" />

                <div>
                  <p className="text-sm font-bold text-clinic-navy">
                    Trusted by 5,000+ patients
                  </p>

                  <p className="mt-0.5 text-xs text-clinic-muted">
                    Quality care. Every visit.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              {/* Main image frame */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2 shadow-[0_30px_80px_rgba(18,48,71,0.14)]">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <img
                    src={heroImage}
                    alt="Doctor providing professional medical care"
                    className="aspect-[4/4.6] w-full object-cover sm:aspect-[4/4.2]"
                  />

                  {/* Image overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-clinic-navy/35 via-transparent to-transparent"
                  />

                  {/* Image label */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                    <div>
                      <p className="text-sm font-bold text-clinic-navy">
                        Patient-first care
                      </p>

                      <p className="mt-1 text-xs text-clinic-muted">
                        Focused on what matters most — you.
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clinic-mint text-clinic-teal">
                      <ShieldCheck size={20} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating appointment card */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                  ease: "easeOut",
                }}
                className="absolute -bottom-7 -left-3 hidden w-64 rounded-2xl border border-clinic-border bg-white p-4 shadow-[0_20px_50px_rgba(18,48,71,0.14)] sm:block lg:-left-8"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                    <CheckCircle2 size={21} aria-hidden="true" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-clinic-navy">
                      Easy appointments
                    </p>

                    <p className="mt-1 text-xs leading-5 text-clinic-muted">
                      Convenient scheduling designed around your routine.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating experience card */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.95,
                  ease: "easeOut",
                }}
                className="absolute -right-2 top-8 hidden rounded-2xl border border-white/80 bg-white/95 px-5 py-4 shadow-[0_20px_50px_rgba(18,48,71,0.12)] backdrop-blur-md sm:block lg:-right-7"
              >
                <p className="font-display text-2xl font-bold text-clinic-navy">
                  15+
                </p>

                <p className="mt-1 text-xs font-medium text-clinic-muted">
                  Years of experience
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-clinic-border bg-white">
        <div className="container-clinic">
          <div className="grid divide-y divide-clinic-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-0 py-6 sm:px-6 sm:first:pl-0">
              <p className="text-sm font-bold text-clinic-navy">
                Experienced Specialists
              </p>

              <p className="mt-1 text-sm text-clinic-muted">
                Dedicated professionals across specialties.
              </p>
            </div>

            <div className="px-0 py-6 sm:px-6">
              <p className="text-sm font-bold text-clinic-navy">
                Modern Facilities
              </p>

              <p className="mt-1 text-sm text-clinic-muted">
                Thoughtfully designed for comfort and care.
              </p>
            </div>

            <div className="px-0 py-6 sm:px-6 sm:last:pr-0">
              <p className="text-sm font-bold text-clinic-navy">
                Personal Attention
              </p>

              <p className="mt-1 text-sm text-clinic-muted">
                Care that treats the person, not just the condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <DoctorsSection />
      <ContactSection />
    </main>
  );
}

export default Home;
