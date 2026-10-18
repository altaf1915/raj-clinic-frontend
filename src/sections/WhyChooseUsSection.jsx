import {
  CalendarCheck,
  HeartHandshake,
  MessageCircle,
  Microscope,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Stethoscope,
    title: "Experienced Specialists",
    description:
      "A multidisciplinary team focused on thoughtful diagnosis and personalized treatment.",
  },
  {
    icon: Microscope,
    title: "Modern Facilities",
    description:
      "Access to modern medical technology and diagnostic capabilities in one place.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-First Approach",
    description:
      "Every decision starts with understanding your needs, concerns, and wellbeing.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Appointments",
    description:
      "A simple appointment experience designed to save time and reduce unnecessary stress.",
  },
  {
    icon: ShieldCheck,
    title: "Personalized Care",
    description:
      "Care plans are designed around each patient's individual health goals and circumstances.",
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    description:
      "Straightforward communication so you can feel informed and confident about your care.",
  },
];

function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-clinic-background">
      <div className="container-clinic">
        <div className="max-w-2xl">
          <span className="eyebrow">Why Raj Clinic</span>

          <h2 className="section-title mt-4">
            Healthcare built around trust, clarity, and comfort.
          </h2>

          <p className="section-description mt-5">
            From your first appointment to ongoing follow-up, we focus on
            making every part of your healthcare experience feel considered
            and personal.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                className="clinic-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(18,48,71,0.1)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal transition-colors duration-300 group-hover:bg-clinic-navy group-hover:text-white">
                  <Icon size={22} aria-hidden="true" />
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-clinic-navy">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-clinic-muted">
                  {reason.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;