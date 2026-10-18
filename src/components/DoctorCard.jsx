import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function DoctorCard({ doctor, index }) {

//akash
  //const ViewDoctorProfile = () => {}

  //Altaf
  const ViewDoctorProfile = () => {}
  const name= "Akash Mahto"


  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
      }}
      className="group clinic-card overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_55px_rgba(18,48,71,0.12)]"
    >
      {/* Doctor Image */}
      <div className="relative overflow-hidden bg-clinic-mint">
        <img
          src={doctor.image}
          alt={`${doctor.name}, ${doctor.specialty}`}
          className="aspect-[4/4.3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-clinic-navy/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Social Buttons */}
        <div className="absolute bottom-4 right-4 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {/* Email */}
          <a
            href={`mailto:${doctor.email}`}
            aria-label={`Email ${doctor.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-clinic-navy shadow-lg transition hover:bg-clinic-mint"
          >
            <Mail size={16} aria-hidden="true" />
          </a>

          {/* LinkedIn */}
          <a
            href={doctor.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${doctor.name} on LinkedIn`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-clinic-navy shadow-lg transition hover:bg-clinic-mint"
          >
            in
          </a>
        </div>
      </div>

      {/* Doctor Information */}
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-clinic-teal">
          {doctor.specialty}
        </p>

        <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-clinic-navy">
          {doctor.name}
        </h3>

        <p className="mt-2 text-sm text-clinic-muted">
          {doctor.experience} of experience
        </p>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-clinic-muted">
          {doctor.bio}
        </p>

        <Link
          to={`/doctors/${doctor.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-clinic-navy"
        >
          View Profile

          <ArrowUpRight
            size={17}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export default DoctorCard;