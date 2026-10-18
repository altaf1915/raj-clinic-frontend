import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Doctors", to: "/doctors" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const services = [
  "General Medicine",
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Diagnostics",
];

function Footer() {
  return (
    <footer className="bg-[#0d2638] text-white">
      <div className="container-clinic py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-mint"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clinic-mint font-display text-lg font-extrabold text-clinic-navy">
                R
              </span>

              <span>
                <span className="block font-display text-xl font-bold tracking-tight">
                  Raj Clinic
                </span>

                <span className="mt-0.5 block text-xs text-white/60">
                  Modern Medicine. Personal Care.
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              A thoughtfully designed healthcare experience centered on
              clear communication, personal attention, and patient wellbeing.
            </p>

            <Link
              to="/book-appointment"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-clinic-navy transition hover:bg-clinic-mint"
            >
              Book an Appointment
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-display text-base font-bold">
              Quick Links
            </h2>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/65 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-display text-base font-bold">
              Our Services
            </h2>

            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-white/65 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-mint"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-display text-base font-bold">
              Contact Information
            </h2>

            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm leading-6 text-white/65">
                <Phone
                  size={17}
                  className="mt-1 shrink-0 text-clinic-mint"
                  aria-hidden="true"
                />
                <a
                  href="tel:+919876543210"
                  className="hover:text-white"
                >
                  +91 98765 43210
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm leading-6 text-white/65">
                <Mail
                  size={17}
                  className="mt-1 shrink-0 text-clinic-mint"
                  aria-hidden="true"
                />
                <a
                  href="mailto:hello@rajclinic.example"
                  className="break-all hover:text-white"
                >
                  rajclinic@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm leading-6 text-white/65">
                <MapPin
                  size={17}
                  className="mt-1 shrink-0 text-clinic-mint"
                  aria-hidden="true"
                />
                <span>Clinic address to be confirmed</span>
              </li>

              <li className="flex items-start gap-3 text-sm leading-6 text-white/65">
                <Clock3
                  size={17}
                  className="mt-1 shrink-0 text-clinic-mint"
                  aria-hidden="true"
                />
                <span>Mon–Sat · 9:00 AM–6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Raj Clinic. All rights reserved.
          </p>

          <p>Designed with care for better healthcare experiences.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;