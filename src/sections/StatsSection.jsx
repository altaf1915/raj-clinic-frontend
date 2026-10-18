import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  HeartHandshake,
  Stethoscope,
  Users,
} from "lucide-react";

const stats = [
  {
    value: 5000,
    suffix: "+",
    label: "Patients Served",
    description: "Patients cared for with dedication",
    icon: Users,
  },
  {
    value: 15,
    suffix: "+",
    label: "Years of Experience",
    description: "Years of clinical expertise",
    icon: Award,
  },
  {
    value: 25,
    suffix: "+",
    label: "Medical Specialists",
    description: "Experienced healthcare professionals",
    icon: Stethoscope,
  },
  {
    value: 98,
    suffix: "%",
    label: "Patient Satisfaction",
    description: "Committed to a better care experience",
    icon: HeartHandshake,
  },
];

function AnimatedNumber({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1400;
    const startTime = performance.now();

    let animationFrame;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setCount(
        Math.floor(easedProgress * value)
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatsSection() {
  return (
    <section className="section-padding bg-clinic-navy">
      <div className="container-clinic">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="eyebrow text-clinic-mint">
            At a glance
          </span>

          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Experience and care you can count on.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/65">
            Our fictional clinic data below demonstrates how
            important trust signals can be presented clearly.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="bg-clinic-navy p-6 sm:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-clinic-mint">
                  <Icon size={21} aria-hidden="true" />
                </div>

                <p className="mt-7 font-display text-4xl font-bold tracking-tight text-white">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </p>

                <h3 className="mt-2 text-sm font-bold text-white">
                  {stat.label}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;