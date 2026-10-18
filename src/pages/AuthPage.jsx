
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, HeartPulse, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AuthPage({ mode = "signin" }) {
  const isSignup = mode === "signup";
  const { signin, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (isSignup && name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setBusy(true);

    try {
      const user = isSignup
        ? await signup(name.trim(), email.trim(), password)
        : await signin(email.trim(), password);

      const destination =
        user.role === "admin"
          ? "/admin"
          : location.state?.from?.pathname || "/dashboard";

      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to connect. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <motion.section
        className="auth-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="auth-brand">
          <span className="auth-logo"><HeartPulse size={27} /></span>
          <span>Raj Clinic</span>
        </div>

        <div className="auth-heading">
          <p className="auth-eyebrow">YOUR HEALTH, OUR PRIORITY</p>
          <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p>
            {isSignup
              ? "Create an account to manage your appointments."
              : "Sign in to view your appointments and updates."}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              Full name
              <span className="auth-input-wrap">
                <UserRound size={18} />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                />
              </span>
            </label>
          )}

          <label>
            Email address
            <span className="auth-input-wrap">
              <Mail size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </span>
          </label>

          <label>
            Password
            <span className="auth-input-wrap">
              <LockKeyhole size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={8}
                maxLength={128}
                required
              />
              <button
                className="password-toggle"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit" disabled={busy}>
            {busy
              ? "Please wait..."
              : isSignup
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New to Raj Clinic?"}{" "}
          <Link to={isSignup ? "/signin" : "/signup"}>
            {isSignup ? "Sign in" : "Create account"}
          </Link>
        </p>

        <p className="auth-footer">
          Your account is protected by secure authentication.
        </p>
      </motion.section>
    </main>
  );
}
