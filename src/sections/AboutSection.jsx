import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  HeartPulse,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const aboutImage =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85";

const benefits = [
  "Personalized treatment plans",
  "Experienced medical specialists",
  "Modern diagnostic technology",
  "Continuous follow-up support",
];

function AboutSection() {
  return (
    <section className="section-padding-lg overflow-hidden bg-white">
      <div className="container-clinic">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-clinic-border bg-clinic-background p-2 shadow-[0_25px_70px_rgba(18,48,71,0.10)]">
              <img
                src={aboutImage}
                alt="Healthcare professional speaking with a patient"
                className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="absolute -bottom-6 right-4 max-w-[250px] rounded-2xl border border-clinic-border bg-white p-5 shadow-[0_20px_50px_rgba(18,48,71,0.12)] sm:right-8"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                  <HeartPulse size={21} aria-hidden="true" />
                </div>

                <div>
                  <p className="text-sm font-bold text-clinic-navy">
                    Care with purpose
                  </p>

                  <p className="mt-1 text-xs leading-5 text-clinic-muted">
                    Every decision starts with the patient's needs.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="eyebrow">
              About Raj Clinic
            </span>

            <h2 className="section-title mt-5">
              Care that goes beyond treatment.
            </h2>

            <p className="section-description mt-6">
              We believe great healthcare is about more than
              treating symptoms. It is about listening carefully,
              understanding every patient's needs, and creating a
              care experience built around trust.
            </p>

            <p className="mt-5 max-w-xl text-base leading-8 text-clinic-muted">
              Our multidisciplinary team combines medical
              expertise, modern technology, and a human approach
              to help patients make confident decisions about
              their health.
            </p>

            {/* Benefits */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-clinic-teal"
                    aria-hidden="true"
                  />

                  <span className="text-sm font-semibold leading-6 text-clinic-navy">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9">
              <Link
                to="/about"
                className="clinic-button clinic-button-primary group"
              >
                Discover Our Approach

                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            {/* Small credibility item */}
            <div className="mt-9 flex items-center gap-3 border-t border-clinic-border pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-clinic-mint text-clinic-teal">
                <UsersRound size={19} aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-bold text-clinic-navy">
                  Patient-first approach
                </p>

                <p className="text-xs text-clinic-muted">
                  Built around comfort, clarity, and trust.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;