
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  HeartPulse,
  Baby,
  Scan,
  Bone,
  Stethoscope,
  ShieldCheck,
  CalendarCheck,
  ClipboardPlus,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "General Medicine",
    description:
      "Support for common illnesses, general health concerns, preventive care, and ongoing health management.",
    color: "bg-clinic-mint text-clinic-teal",
  },
  {
    icon: HeartPulse,
    title: "Cardiology",
    description:
      "Heart-health consultations, cardiovascular risk assessment, and guidance on maintaining a healthy lifestyle.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description:
      "Child-focused healthcare designed around children's wellbeing, growth, development, and family guidance.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Dermatology",
    description:
      "Consultations for skin, hair, and nail concerns, with guidance tailored to individual needs.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description:
      "Assessment and care planning for bone, joint, muscle, and mobility-related concerns.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Scan,
    title: "Diagnostics",
    description:
      "Support in understanding recommended diagnostic tests and coordinating the next steps in care.",
    color: "bg-indigo-50 text-indigo-600",
  },
];

const benefits = [
  {
    icon: HeartPulse,
    title: "Patient-focused approach",
    description:
      "Care that respects your individual needs, questions, and preferences.",
  },
  {
    icon: CalendarCheck,
    title: "Convenient appointments",
    description:
      "A straightforward way to request an appointment through our website.",
  },
  {
    icon: ClipboardPlus,
    title: "Clear communication",
    description:
      "Understand your options and the next steps in your healthcare journey.",
  },
];

function Services() {
  return (
    <main className="overflow-hidden bg-white text-clinic-navy">
      {/* Hero */}
      <section className="bg-clinic-mint/40 px-5 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-clinic mx-auto max-w-4xl text-center"
        >
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-clinic-teal">
            Our Medical Services
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The right care for
            <span className="text-clinic-teal"> your needs.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-clinic-muted sm:text-lg">
            Explore our range of healthcare services and discover how to take
            the next step toward the care you need.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-clinic-navy px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Book an Appointment
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-clinic-navy/15 bg-white px-7 py-4 font-semibold transition hover:bg-clinic-mint"
            >
              Contact Our Team
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Service cards */}
      <section className="section-padding-lg px-5">
        <div className="container-clinic mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-clinic-teal">
              Areas of Care
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Explore our services
            </h2>

            <p className="mt-4 leading-7 text-clinic-muted">
              Find the service relevant to your needs. Contact the clinic to
              confirm availability, suitability, and appointment details.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-clinic-teal/20 hover:shadow-xl sm:p-8"
                >
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${service.color}`}
                  >
                    <Icon size={28} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-xl font-bold">{service.title}</h3>

                  <p className="mt-4 flex-1 leading-7 text-clinic-muted">
                    {service.description}
                  </p>

                  <Link
                    to="/book-appointment"
                    className="mt-7 inline-flex items-center gap-2 font-semibold text-clinic-teal transition group-hover:gap-3"
                  >
                    Request an Appointment
                    <ArrowRight size={17} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding-lg bg-clinic-mint/30 px-5">
        <div className="container-clinic mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-clinic-teal">
              The Raj Clinic Experience
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Care built around you
            </h2>

            <p className="mt-4 leading-7 text-clinic-muted">
              We aim to make your healthcare journey clear, welcoming, and
              easier to navigate.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-3xl border border-white bg-white p-7 shadow-sm sm:p-8"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-lg font-bold">{benefit.title}</h3>

                  <p className="mt-3 leading-7 text-clinic-muted">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-lg px-5">
        <div className="container-clinic mx-auto max-w-5xl rounded-3xl bg-clinic-navy px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Activity size={29} />
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Not sure where to start?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/75">
            Get in touch with Raj Clinic to ask about available services and
            the appropriate next step for your needs.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-clinic-navy transition hover:bg-clinic-mint"
            >
              Book an Appointment
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Services;
