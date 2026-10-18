
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../axios/api";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [updating, setUpdating] = useState("");

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/appointments", {
        params: {
          ...(statusFilter && { status: statusFilter }),
          ...(search.trim() && { search: search.trim() }),
        },
      });

      setAppointments(data.appointments);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load appointment requests."
      );
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    const timer = setTimeout(loadAppointments, 250);

    return () => clearTimeout(timer);
  }, [loadAppointments]);

  async function updateStatus(id, status) {
    setUpdating(id);
    setError("");
    setNotice("");

    try {
      const { data } = await api.patch(
        `/appointments/${id}/status`,
        { status }
      );

      setAppointments((current) =>
        current.map((item) =>
          item._id === id ? data.appointment : item
        )
      );

      setNotice(`Appointment ${status} successfully.`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not update appointment."
      );
    } finally {
      setUpdating("");
    }
  }

  async function handleLogout() {
    try {
      await logout();
      window.location.assign("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Unable to sign out. Please try again.");
    }
  }

  return (
    <main className="dashboard-page">
      <motion.div
        className="dashboard-inner"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <div>
            <p className="dashboard-muted">ADMINISTRATION</p>
            <h1>Booking requests</h1>
            <p className="dashboard-muted">
              Welcome, {user?.name}. Review and manage clinic appointments.
            </p>
          </div>

          <button
            type="button"
            className="dashboard-button"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </header>

        {/* Appointment Management */}
        <section className="dashboard-panel">
          <div className="dashboard-actions">
            <input
              className="dashboard-search"
              type="search"
              placeholder="Search name, email, or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search booking requests"
            />

            <select
              className="dashboard-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              type="button"
              className="dashboard-button"
              onClick={loadAppointments}
              disabled={loading}
            >
              Refresh
            </button>
          </div>

          {/* Messages */}
          {error && (
            <p className="dashboard-message dashboard-error" role="alert">
              {error}
            </p>
          )}

          {notice && (
            <p className="dashboard-message" role="status">
              {notice}
            </p>
          )}

          {/* Appointment Table */}
          {loading ? (
            <p className="dashboard-muted">
              Loading booking requests...
            </p>
          ) : !error && appointments.length === 0 ? (
            <p className="dashboard-muted">
              No matching bookings found.
            </p>
          ) : !error ? (
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Contact</th>
                    <th>Doctor / Department</th>
                    <th>Date / Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <strong>{item.name}</strong>

                        {item.message && (
                          <p className="dashboard-muted">
                            {item.message}
                          </p>
                        )}
                      </td>

                      <td>
                        <div>{item.email}</div>
                        <div>{item.phone}</div>
                      </td>

                      <td>
                        <div>{item.doctor}</div>
                        <div className="dashboard-muted">
                          {item.department}
                        </div>
                      </td>

                      <td>
                        <div>{item.date}</div>
                        <div className="dashboard-muted">
                          {item.time}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`status-pill status-${item.status}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Pending, Confirm and Cancel */}
                      <td>
                        <div className="dashboard-actions">
                          <button
                            type="button"
                            className="dashboard-button"
                            disabled={
                              updating === item._id ||
                              item.status === "pending"
                            }
                            onClick={() =>
                              updateStatus(item._id, "pending")
                            }
                          >
                            {updating === item._id
                              ? "Updating..."
                              : "Pending"}
                          </button>

                          <button
                            type="button"
                            className="dashboard-button dashboard-primary"
                            disabled={
                              updating === item._id ||
                              item.status === "confirmed"
                            }
                            onClick={() =>
                              updateStatus(item._id, "confirmed")
                            }
                          >
                            {updating === item._id
                              ? "Updating..."
                              : "Confirm"}
                          </button>

                          <button
                            type="button"
                            className="dashboard-button"
                            disabled={
                              updating === item._id ||
                              item.status === "cancelled"
                            }
                            onClick={() =>
                              updateStatus(item._id, "cancelled")
                            }
                          >
                            {updating === item._id
                              ? "Updating..."
                              : "Cancel"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          <p className="dashboard-muted">
            Showing up to 500 matching bookings. Refine the search to find
            specific requests.
          </p>
        </section>
      </motion.div>
    </main>
  );
}
