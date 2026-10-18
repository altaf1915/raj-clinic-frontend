import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "From booking to treatment, the entire experience felt thoughtful and professional. I always felt listened to and well cared for.",
    name: "Ananya Sharma",
    detail: "Patient",
  },
  {
    quote:
      "The team explained everything clearly and made what could have been a stressful experience feel simple and comfortable.",
    name: "Rahul Mehta",
    detail: "Patient",
  },
  {
    quote:
      "I appreciated how much time the doctor spent understanding my concerns instead of rushing through the consultation.",
    name: "Priya Kapoor",
    detail: "Patient",
  },
];

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="section-padding-lg bg-clinic-navy text-white">
      <div className="container-clinic">
        <div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <span className="eyebrow !text-clinic-mint">
              Patient Stories
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Care that people remember for the right reasons.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-white/65">
              Fictional testimonials for this demo website. Replace these
              with verified patient reviews before production use.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-clinic-mint"
              >
                <ChevronLeft size={19} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-clinic-mint"
              >
                <ChevronRight size={19} aria-hidden="true" />
              </button>

              <div className="ml-2 flex gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={index === activeIndex}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-7 bg-clinic-mint"
                        : "w-2 bg-white/25"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 -top-5 hidden h-16 w-16 items-center justify-center rounded-2xl bg-clinic-teal/20 text-clinic-mint lg:flex">
              <Quote size={28} aria-hidden="true" />
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm sm:p-10">
              <div
                className="flex gap-1"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill="currentColor"
                    className="text-clinic-mint"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div className="mt-8 min-h-[210px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <blockquote className="font-display text-2xl font-semibold leading-relaxed tracking-tight text-white sm:text-3xl">
                      “{activeTestimonial.quote}”
                    </blockquote>

                    <div className="mt-8">
                      <p className="font-semibold text-white">
                        {activeTestimonial.name}
                      </p>

                      <p className="mt-1 text-sm text-white/50">
                        {activeTestimonial.detail}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;