
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import api from "../axios/api";

const isValidEmail = (email) =>
  typeof email === "string" &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

function DoctorProfile() {
  const { slug } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadDoctor() {
      setLoading(true);
      setError("");
      setDoctor(null);

      try {
        const response = await api.get(
          `/doctors/${encodeURIComponent(slug)}`,
          { signal: controller.signal }
        );

        if (!response.data?.success || !response.data.doctor) {
          throw new Error("Doctor details could not be loaded.");
        }

        setDoctor(response.data.doctor);
      } catch (err) {
        if (
          err.code === "ERR_CANCELED" ||
          controller.signal.aborted
        ) {
          return;
        }

        setError(
          err.response?.status === 404
            ? "We couldn't find that doctor profile."
            : err.response?.data?.message ||
            "Unable to load this profile. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadDoctor();

    return () => controller.abort();
  }, [slug]);

  const email =
    doctor && isValidEmail(doctor.email)
      ? doctor.email.trim()
      : "";

  const contactUrl = doctor
    ? `/contact?doctor=${encodeURIComponent(doctor.name || "")}`
    : "/contact";

  return (
    <main className="min-h-screen bg-clinic-background pt-20">
      <section className="section-padding-lg">
        <div className="container-clinic">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-clinic-muted transition-colors hover:text-clinic-navy"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Doctors
          </Link>

          {loading ? (
            <div className="py-16 text-center" role="status">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-clinic-mint border-t-clinic-teal" />
              <p className="mt-4 text-sm text-clinic-muted">
                Loading doctor profile...
              </p>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800"
            >
              {error}
              <p className="mt-3">
                <Link
                  to="/doctors"
                  className="font-semibold underline underline-offset-4"
                >
                  Browse all doctors
                </Link>
              </p>
            </div>
          ) : doctor ? (
            <div className="mt-10 grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
              <img
                src={doctor.image}
                alt={`${doctor.name}, ${doctor.specialty}`}
                className="w-full rounded-3xl object-cover shadow-sm"
              />

              <div>
                <span className="eyebrow">{doctor.specialty}</span>

                <h1 className="section-title mt-5">
                  {doctor.name}
                </h1>

                <p className="mt-4 font-semibold text-clinic-teal">
                  {doctor.experience} of experience
                </p>

                <p className="mt-6 leading-8 text-clinic-muted">
                  {doctor.bio}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  {email && (
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clinic-button clinic-button-secondary"
                    >
                      <Mail size={17} aria-hidden="true" />
                      Email Doctor
                    </a>
                  )}


                  <Link
                    to={contactUrl}
                    className="clinic-button clinic-button-secondary"
                  >
                    <MessageCircle size={17} aria-hidden="true" />
                    Contact Doctor
                  </Link>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/book-appointment?doctor=${encodeURIComponent(
                      doctor.name || ""
                    )}`}
                    className="clinic-button clinic-button-primary"
                  >
                    Request an Appointment
                  </Link>
                </div>

                {!email && (
                  <p className="mt-4 text-sm text-clinic-muted">
                    No direct email is listed for this doctor. Please use
                    the contact page to send an enquiry.
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default DoctorProfile;
