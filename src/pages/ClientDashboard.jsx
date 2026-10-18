
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, RefreshCw } from "lucide-react";
import api from "../axios/api";
import { useAuth } from "../context/AuthContext";

function Status({ value }) {
  return (
    <span className={`status-pill status-${value}`}>
      {value}
    </span>
  );
}

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/appointments/mine");
      setAppointments(data.appointments);
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not load your appointments."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  return (
    <main className="dashboard-page">
      <motion.div
        className="dashboard-inner"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header className="dashboard-header">
          <div>
            <p className="dashboard-muted">CLIENT PORTAL</p>
            <h1>Hello, {user?.name}</h1>
            <p className="dashboard-muted">
              Review your appointments and confirmation status.
            </p>
          </div>

          <div className="dashboard-actions">
            <Link to="/book-appointment" className="dashboard-button dashboard-primary">
              Book an appointment
            </Link>
            <button
              className="dashboard-button"
              onClick={() => {
                logout();
                window.location.assign("/signin");
              }}
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="dashboard-panel">
          <div className="dashboard-header">
            <div>
              <h2>My appointments</h2>
              <p className="dashboard-muted">
                {appointments.length} appointment
                {appointments.length === 1 ? "" : "s"} found
              </p>
            </div>
            <button
              className="dashboard-button"
              onClick={loadAppointments}
              disabled={loading}
            >
              <RefreshCw size={15} /> Refresh
            </button>
          </div>

          {error && (
            <p className="dashboard-message dashboard-error">{error}</p>
          )}

          {loading ? (
            <p className="dashboard-muted">Loading appointments...</p>
          ) : !error && appointments.length === 0 ? (
            <div className="dashboard-message">
              <CalendarDays size={20} />
              <p>You don't have any linked appointments yet.</p>
              <Link to="/book-appointment">Book your first appointment</Link>
            </div>
          ) : !error ? (
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.department}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td><Status value={appointment.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>

        <p className="dashboard-muted">
          If your request is pending, the clinic has not yet confirmed it.
          Contact the clinic if you need further assistance.
        </p>
      </motion.div>
    </main>
  );
}
