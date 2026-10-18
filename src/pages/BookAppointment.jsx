
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { bookAppointment } from "../services/AppointmentService";

const doctors = [
  { name: "Dr. Sarah Mitchell", specialty: "Cardiology" },
  { name: "Dr. Daniel Carter", specialty: "General Medicine" },
  { name: "Dr. Emily Wilson", specialty: "Pediatrics" },
  { name: "Dr. James Anderson", specialty: "Orthopedics" },
  { name: "Dr. Olivia Bennett", specialty: "Dermatology" },
  { name: "Dr. Michael Chen", specialty: "Diagnostics" },
];

const departments = [
  "General Medicine",
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Diagnostics",
];

const times = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  doctor: "",
  department: "",
  date: "",
  time: "",
  message: "",
};

function getLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const inputClass =
  "mt-2 w-full rounded-xl border border-clinic-border bg-white px-4 py-3 text-sm text-clinic-text outline-none transition placeholder:text-clinic-muted/70 focus:border-clinic-teal focus:ring-4 focus:ring-clinic-teal/10 disabled:cursor-not-allowed disabled:bg-gray-100";

const labelClass = "block text-sm font-semibold text-clinic-navy";

function BookAppointment() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppointment, setSubmittedAppointment] = useState(null);

  const minDate = getLocalDateString();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  }

  function validateForm() {
    const nextErrors = {};
    const normalizedEmail = form.email.trim();
    const digitsOnly = form.phone.replace(/\D/g, "");

    if (form.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (!form.doctor) {
      nextErrors.doctor = "Please select a doctor.";
    }

    if (!form.department) {
      nextErrors.department = "Please select a department.";
    }

    if (!form.date) {
      nextErrors.date = "Please select a date.";
    } else if (form.date < minDate) {
      nextErrors.date = "The appointment date cannot be in the past.";
    }

    if (!form.time) {
      nextErrors.time = "Please select a preferred time.";
    }

    if (form.message.trim().length > 1000) {
      nextErrors.message = "The message cannot exceed 1000 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const formData = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      doctor: form.doctor,
      department: form.department,
      date: form.date,
      time: form.time,
      message: form.message.trim(),
    };

    bookAppointment(formData).then((response) => {
     
      setStatus({
        type: "success",
        message:
          response.data.message ||
          "Your appointment request was submitted successfully.",
      });
      setForm(initialForm);
      setErrors({});
      setIsSubmitting(false);
    }).catch((error) => {
      setStatus({
        type: "error",
        message: "We couldn't submit your request. Please try again.",
      });
    })
  }


  function resetForm() {
    setForm(initialForm);
    setErrors({});
    setStatus({ type: "", message: "" });
    setSubmittedAppointment(null);
  }

  if (submittedAppointment) {
    return (
      <main className="min-h-screen bg-clinic-background pt-20">
        <section className="section-padding-lg">
          <div className="container-clinic">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-2xl rounded-3xl border border-clinic-border bg-white p-8 text-center shadow-sm sm:p-12"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clinic-mint text-clinic-teal">
                <CheckCircle2 size={34} aria-hidden="true" />
              </div>

              <p className="eyebrow mt-6">Request received</p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-clinic-navy sm:text-4xl">
                Thank you, {submittedAppointment.name}.
              </h1>
              <p className="mx-auto mt-4 max-w-lg leading-7 text-clinic-muted">
                {status.message} Your request is pending review. The clinic
                must confirm availability before your appointment is considered
                booked.
              </p>

              <div className="mt-8 rounded-2xl bg-clinic-background p-5 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-clinic-muted">
                  Request details
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-clinic-muted">Reference</dt>
                    <dd className="break-all text-right font-semibold text-clinic-navy">
                      {submittedAppointment.id}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-clinic-muted">Doctor</dt>
                    <dd className="text-right font-semibold text-clinic-navy">
                      {submittedAppointment.doctor}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-clinic-muted">Department</dt>
                    <dd className="text-right font-semibold text-clinic-navy">
                      {submittedAppointment.department}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-clinic-muted">Date and time</dt>
                    <dd className="text-right font-semibold text-clinic-navy">
                      {submittedAppointment.date} · {submittedAppointment.time}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-clinic-muted">Status</dt>
                    <dd className="font-semibold capitalize text-clinic-teal">
                      {submittedAppointment.status}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetForm}
                  className="clinic-button clinic-button-primary"
                >
                  Make Another Request
                </button>
                <Link
                  to="/"
                  className="clinic-button clinic-button-secondary"
                >
                  Return Home
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-clinic-background pt-20">
      <section className="section-padding-lg">
        <div className="container-clinic">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-clinic-muted transition hover:text-clinic-navy"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Home
          </Link>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-28"
            >
              <span className="eyebrow">Appointment Request</span>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-clinic-navy sm:text-5xl">
                Your health deserves time and attention.
              </h1>
              <p className="mt-6 max-w-xl leading-7 text-clinic-muted">
                Tell us what you need, choose your preferred doctor and time,
                and send your request to our team.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                    <CalendarDays size={21} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-clinic-navy">
                      Simple appointment requests
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-clinic-muted">
                      Share your preferred date and department in a few steps.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                    <Clock3 size={21} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-clinic-navy">
                      Pending clinic confirmation
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-clinic-muted">
                      Your request is not a confirmed appointment until the
                      clinic verifies availability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">
                    <ShieldCheck size={21} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-clinic-navy">
                      Information handled carefully
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-clinic-muted">
                      Only provide information needed for your appointment
                      request. Avoid including sensitive medical details here.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-clinic-border bg-white p-6 shadow-[0_20px_60px_rgba(18,48,71,0.06)] sm:p-8 lg:p-10"
            >
              <div className="mb-8">
                <p className="text-sm font-bold text-clinic-teal">
                  BOOK A VISIT
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-clinic-navy sm:text-3xl">
                  Appointment details
                </h2>
                <p className="mt-2 text-sm leading-6 text-clinic-muted">
                  Fields marked with * are required.
                </p>
              </div>

              {status.type === "error" && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="name">
                      Full name *
                    </label>
                    <input
                      className={inputClass}
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      maxLength={100}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email address *
                    </label>
                    <input
                      className={inputClass}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      maxLength={254}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="phone">
                      Phone number *
                    </label>
                    <input
                      className={inputClass}
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      maxLength={20}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="department">
                      Department *
                    </label>
                    <select
                      className={inputClass}
                      id="department"
                      name="department"
                      value={form.department}
                      onChange={(event) => {
                        const selectedDepartment = event.target.value;
                        const matchingDoctor = doctors.find(
                          (doctor) => doctor.specialty === selectedDepartment
                        );

                        setForm((current) => ({
                          ...current,
                          department: selectedDepartment,
                          doctor:
                            matchingDoctor?.name === current.doctor
                              ? current.doctor
                              : "",
                        }));

                        setErrors((current) => ({
                          ...current,
                          department: "",
                          doctor: "",
                        }));
                      }}
                      required
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.department)}
                      aria-describedby={
                        errors.department ? "department-error" : undefined
                      }
                    >
                      <option value="">Select a department</option>
                      {departments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <p
                        id="department-error"
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.department}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="doctor">
                      Preferred doctor *
                    </label>
                    <select
                      className={inputClass}
                      id="doctor"
                      name="doctor"
                      value={form.doctor}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.doctor)}
                      aria-describedby={errors.doctor ? "doctor-error" : undefined}
                    >
                      <option value="">Select a doctor</option>
                      {doctors
                        .filter(
                          (doctor) =>
                            !form.department ||
                            doctor.specialty === form.department
                        )
                        .map((doctor) => (
                          <option key={doctor.name} value={doctor.name}>
                            {doctor.name} — {doctor.specialty}
                          </option>
                        ))}
                    </select>
                    {errors.doctor && (
                      <p id="doctor-error" className="mt-1 text-sm text-red-600">
                        {errors.doctor}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="date">
                      Preferred date *
                    </label>
                    <input
                      className={inputClass}
                      id="date"
                      name="date"
                      type="date"
                      min={minDate}
                      value={form.date}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.date)}
                      aria-describedby={errors.date ? "date-error" : undefined}
                    />
                    {errors.date && (
                      <p id="date-error" className="mt-1 text-sm text-red-600">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="time">
                      Preferred time *
                    </label>
                    <select
                      className={inputClass}
                      id="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.time)}
                      aria-describedby={errors.time ? "time-error" : undefined}
                    >
                      <option value="">Select a time</option>
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p id="time-error" className="mt-1 text-sm text-red-600">
                        {errors.time}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="message">
                      Message (optional)
                    </label>
                    <textarea
                      className={`${inputClass} min-h-32 resize-y`}
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Briefly tell us the reason for your visit"
                      rows={4}
                      maxLength={1000}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.message}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-clinic-muted">
                      {form.message.length}/1000 characters. Please do not
                      include sensitive medical information.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="clinic-button clinic-button-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                        aria-hidden="true"
                      />
                      Sending request...
                    </>
                  ) : (
                    <>
                      Submit Appointment Request
                      <ArrowRight size={17} aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-xs leading-5 text-clinic-muted">
                  Submitting this form sends an appointment request. It does
                  not guarantee availability or confirm a booking.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BookAppointment;
