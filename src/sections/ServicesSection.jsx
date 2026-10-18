import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Bone,
  Brain,
  HeartPulse,
  Microscope,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "General Medicine",
    description:
      "Comprehensive healthcare for everyday medical needs.",
    icon: Stethoscope,
  },
  {
    title: "Cardiology",
    description:
      "Advanced heart and cardiovascular care.",
    icon: HeartPulse,
  },
  {
    title: "Pediatrics",
    description:
      "Compassionate healthcare designed for children.",
    icon: Baby,
  },
  {
    title: "Dermatology",
    description:
      "Specialized care for skin and hair conditions.",
    icon: Brain,
  },
  {
    title: "Orthopedics",
    description:
      "Treatment and management of bone and joint conditions.",
    icon: Bone,
  },
  {
    title: "Diagnostics",
    description:
      "Modern diagnostic services for accurate evaluation.",
    icon: Microscope,
  },
];

const featuredBenefits = [
  "Personalized treatment",
  "Modern diagnostics",
  "Experienced specialists",
  "Follow-up support",
];

const featuredImage =
  "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=85";

function ServicesSection() {
  return (
    <section className="overflow-hidden bg-clinic-background">
      {/* Services */}
      <div className="section-padding-lg">
        <div className="container-clinic">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="eyebrow">
              Our Services
            </span>

            <h2 className="section-title mt-5">
              Complete care, thoughtfully delivered.
            </h2>

            <p className="section-description mt-6">
              From everyday healthcare to specialized treatment,
              our services are designed to give every patient
              access to trusted medical expertise in one place.
            </p>
          </motion.div>

          {/* Service cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  whileHover={{ y: -5 }}
                  className="group clinic-card flex min-h-[270px] flex-col p-6 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(18,48,71,0.11)] sm:p-7"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal transition-colors duration-300 group-hover:bg-clinic-navy group-hover:text-white">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="mt-7 font-display text-xl font-bold tracking-tight text-clinic-navy">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-clinic-muted">
                    {service.description}
                  </p>

                  {/* Link */}
                  <Link
                    to="/services"
                    className="mt-auto flex items-center gap-2 pt-7 text-sm font-bold text-clinic-navy"
                  >
                    Learn More

                    <ArrowRight
                      size={17}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          {/* All services CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-clinic-teal transition-colors hover:text-clinic-navy"
            >
              View all healthcare services
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Featured Service */}
      <div className="section-padding-lg bg-white">
        <div className="container-clinic">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-[2rem] border border-clinic-border bg-clinic-background p-2 shadow-[0_25px_70px_rgba(18,48,71,0.10)]">
                <img
                  src={featuredImage}
                  alt="Medical professional preparing equipment for patient care"
                  className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
                />
              </div>

              {/* Small floating detail */}
              <div className="absolute -bottom-5 right-4 rounded-2xl border border-clinic-border bg-white px-5 py-4 shadow-[0_15px_40px_rgba(18,48,71,0.12)] sm:right-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-clinic-teal">
                  Patient focused
                </p>

                <p className="mt-1 text-sm font-bold text-clinic-navy">
                  Care at every step
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow">
                Featured Care
              </span>

              <h2 className="section-title mt-5">
                Your health deserves a deeper level of attention.
              </h2>

              <p className="section-description mt-6">
                Great healthcare isn't just about having access to
                specialists. It's about having a team that listens,
                explains clearly, and stays connected throughout
                your care journey.
              </p>

              {/* Benefits */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {featuredBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clinic-mint text-clinic-teal">
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                      />
                    </div>

                    <span className="text-sm font-semibold text-clinic-navy">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
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
                  className="clinic-button clinic-button-secondary"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;