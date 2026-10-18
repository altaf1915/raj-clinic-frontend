
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { getDoctors } from "../services/DoctorService";

const isValidEmail = (email) =>
  typeof email === "string" &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

function DoctorsDirectory() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDoctors = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getDoctors();
      setDoctors((response.doctors || []).slice(0, 5));
    } catch (err) {
      console.error("Failed to load doctors:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load doctors. Please check the backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center" role="status">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-clinic-mint border-t-clinic-teal" />
        <p className="mt-4 text-sm text-clinic-muted">
          Loading doctors...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p role="alert" className="text-sm text-red-800">
          {error}
        </p>

        <button
          type="button"
          onClick={loadDoctors}
          className="clinic-button clinic-button-primary mt-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-clinic-muted">
          No doctors are available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => {
        const email = isValidEmail(doctor.email)
          ? doctor.email.trim()
          : "";

        const contactUrl = `/contact?doctor=${encodeURIComponent(
          doctor.name || ""
        )}`;

        return (
          <article
            key={doctor._id || doctor.slug}
            className="clinic-card group overflow-hidden transition-shadow hover:shadow-[0_20px_55px_rgba(18,48,71,0.12)]"
          >
            <div className="overflow-hidden bg-clinic-mint">
              <img
                src={doctor.image}
                alt={`${doctor.name || "Doctor"}, ${doctor.specialty || "Healthcare specialist"
                  }`}
                loading="lazy"
                className="aspect-[4/4.3] w-full object-cover object-top"
              />
            </div>

            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-clinic-teal">
                {doctor.specialty}
              </p>

              <h2 className="mt-2 font-display text-xl font-bold text-clinic-navy">
                {doctor.name}
              </h2>

              <p className="mt-2 text-sm text-clinic-muted">
                {doctor.experience} of experience
              </p>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-clinic-muted">
                {doctor.bio}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4">
                <Link
                  to={`/doctors/${encodeURIComponent(doctor.slug || "")}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-clinic-navy hover:text-clinic-teal"
                >
                  View Profile
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>

                {email ? (
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      email
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clinic-button clinic-button-secondary"
                  >
                    <Mail size={17} aria-hidden="true" />
                    Email
                  </a>
                ) : (
                  <Link
                    to={contactUrl}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-clinic-muted hover:text-clinic-teal"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    Contact
                  </Link>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default DoctorsDirectory;
