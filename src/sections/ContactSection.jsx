
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, Mail, MapPin, Phone, } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../utils/contact.schema";
import { saveContactMessage } from "../services/ContactService";


const labelClass = "block text-sm font-semibold text-clinic-navy";

const inputClass =
  "mt-2 w-full rounded-xl border border-clinic-border bg-white px-4 py-3 text-sm text-clinic-text outline-none transition placeholder:text-clinic-muted/70 focus:border-clinic-teal focus:ring-4 focus:ring-clinic-teal/10 disabled:cursor-not-allowed disabled:bg-gray-100";

function ContactSection() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { register: contact, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm({

    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    saveContactMessage(data).then((res) => {
      console.log(res);
      setSuccessMessage(
        res.message || "Your message has been sent successfully."
      );
      reset();
    }).catch((error) => {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "We couldn't confirm that your message was saved. Please try again."
      );
    })
  }



  return (
    <section
      id="contact"
      className="section-padding-lg bg-clinic-background"
    >
      <div className="container-clinic">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Get in Touch</span>
            <h2 className="section-title mt-5">
              We’re here to help you feel your best.
            </h2>
            <p className="section-description mt-5">
              Have a question or need help with your visit? Send us a message
              and our team can follow up.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                  <Phone size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-clinic-navy">Call us</h3>
                  <a
                    href="tel:+919876543210"
                    className="mt-1 block text-sm text-clinic-muted hover:text-clinic-teal"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-clinic-navy">Email us</h3>
                  <a
                    href="mailto:hello@rajclinic.example"
                    className="mt-1 block break-all text-sm text-clinic-muted hover:text-clinic-teal"
                  >
                    hello@rajclinic.example
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                  <MapPin size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-clinic-navy">Visit us</h3>
                  <p className="mt-1 text-sm text-clinic-muted">
                    Clinic address to be confirmed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                  <Clock3 size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-clinic-navy">
                    Opening hours
                  </h3>
                  <p className="mt-1 text-sm text-clinic-muted">
                    Monday – Saturday, 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/book-appointment"
              className="clinic-button clinic-button-primary mt-8"
            >
              Request an Appointment
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-clinic-border bg-white p-6 shadow-[0_20px_60px_rgba(18,48,71,0.06)] sm:p-8 lg:p-10"
          >
            <p className="text-sm font-bold text-clinic-teal">CONTACT OUR TEAM</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-clinic-navy">
              Send us a message
            </h3>
            <p className="mt-2 text-sm leading-6 text-clinic-muted">
              Fill in the details below. Fields marked with * are required.
            </p>

            {successMessage && (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <p>{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
              >
                {errorMessage}
              </div>
            )}

            <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <label className={labelClass} htmlFor="contact-name">
                  Full name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  className={inputClass}
                  {...contact("name")}
                  placeholder="Enter your full name"
                  maxLength={100}
                  required
                  disabled={isSubmitting}

                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="contact-email">
                  Email address *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  {...contact("email")}
                  placeholder="you@example.com"
                  maxLength={254}
                  required
                  disabled={isSubmitting}

                />

                <p
                  id="contact-email-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors?.email?.message}
                </p>

              </div>

              <div>
                <label className={labelClass} htmlFor="contact-phone">
                  Phone number (optional)
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass}
                  {...contact("phone")}
                  placeholder="Enter your phone number"
                  maxLength={20}
                  disabled={isSubmitting}

                />
                <p
                  id="contact-phone-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors?.phone?.message}
                </p>
              </div>

              <div>
                <label className={labelClass} htmlFor="contact-message">
                  Your message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`${inputClass} min-h-36 resize-y`}
                  {...contact("message")}
                  placeholder="How can our team help you?"
                  rows={5}
                  maxLength={2000}
                  required
                  disabled={isSubmitting}

                />
                <p
                  id="contact-message-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors?.message?.message}
                </p>

              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="clinic-button clinic-button-primary w-full justify-center"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>


      </div>
    </section>
  );
}

export default ContactSection;
