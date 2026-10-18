
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Users,
  Activity,
  CheckCircle2,
} from "lucide-react";

const values = [
  {
    icon: HeartPulse,
    title: "Patient-First Care",
    description:
      "We put patients first by focusing on individual needs, clear communication, and compassionate care.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "We believe in honest conversations, clear explanations, and helping patients make informed decisions.",
  },
  {
    icon: Users,
    title: "Care That Connects",
    description:
      "We aim to build lasting relationships through respect, understanding, and a welcoming experience.",
  },
];

const highlights = [
  "A welcoming and patient-focused environment",
  "Clear communication throughout your care",
  "A commitment to responsible medical practice",
  "Convenient access to healthcare services",
];

function About() {
  return (
    <main className="overflow-hidden bg-white text-clinic-navy">
      {/* Hero */}
      <section className="relative bg-clinic-mint/40 px-5 py-20 sm:py-28">
        <div className="container-clinic mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-clinic-teal">
              Get to Know Us Akash
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Healthcare with a
              <span className="text-clinic-teal">
                {" "}human touch.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-clinic-muted sm:text-lg">
              At Raj Clinic, we believe healthcare should feel personal,
              understandable, and centered on you. Discover our approach to
              thoughtful, patient-focused care.
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
                to="/doctors"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-clinic-navy/15 bg-white px-7 py-4 font-semibold transition hover:bg-clinic-mint"
              >
                Meet Our Doctors Hello
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding-lg px-5">
        <div className="container-clinic mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=1000&q=85"
              alt="Welcoming modern healthcare consultation space"
              loading="lazy"
              className="h-[420px] sm:h-[480px] w-full rounded-3xl object-cover object-top shadow-xl"
            />

            <div className="absolute -bottom-5 left-4 rounded-2xl border border-white/70 bg-white p-5 shadow-xl sm:left-7 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                  <HeartPulse size={25} />
                </div>
                <div>
                  <p className="font-bold text-clinic-navy">
                    Care With Compassion
                  </p>
                  <p className="mt-1 text-sm text-clinic-muted">
                    Your wellbeing matters
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="pt-5 lg:pt-0"
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-clinic-teal">
              Who We Are
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Modern medicine.
              <br />
              Personal care..
            </h2>

            <p className="mt-6 leading-8 text-clinic-muted">
              Raj Clinic is designed around a simple idea: every patient
              deserves to be heard, respected, and supported. We aim to make
              each step of the healthcare journey easier to understand.
            </p>

            <p className="mt-4 leading-8 text-clinic-muted">
              From finding the right service to connecting with a healthcare
              professional, our goal is to create a welcoming experience
              built on communication, consideration, and trust.
            </p>

            <div className="mt-7 space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-clinic-teal"
                  />
                  <p className="text-clinic-navy">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding-lg bg-clinic-mint/30 px-5">
        <div className="container-clinic mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-clinic-teal">
              What Guides Us
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              The values behind your care
            </h2>

            <p className="mt-4 leading-7 text-clinic-muted">
              A better healthcare experience begins with listening, respect,
              and a genuine commitment to each patient's wellbeing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="rounded-3xl border border-white bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-clinic-mint text-clinic-teal">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold">{value.title}</h3>

                  <p className="mt-4 leading-7 text-clinic-muted">
                    {value.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding-lg px-5">
        <div className="container-clinic mx-auto max-w-5xl rounded-3xl bg-clinic-navy px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Activity size={29} />
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Your health deserves thoughtful care.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/75">
            Explore our healthcare services or take the next step toward
            arranging an appointment with our team.
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
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
