
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  UserRound,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Doctors", path: "/doctors" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardPath =
    user?.role === "admin" ? "/admin" : "/dashboard";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  async function handleLogout() {
    try {
      // Support both synchronous and asynchronous logout functions.
      await logout();
      closeMobileMenu();
      navigate("/signin", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-clinic-border bg-white/95 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-clinic">
          <nav
            className="flex h-20 items-center justify-between gap-4"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="group flex shrink-0 items-center"
              aria-label="Raj Clinic home"
            >
              <img
                src="/images/clinic-logo.png"
                alt="Raj Clinic Logo"
                className="h-14 w-auto shrink-0 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-clinic-navy"
                        : "text-clinic-muted hover:text-clinic-navy"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}

                      {isActive && (
                        <motion.span
                          layoutId="navbar-active"
                          className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-clinic-teal"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 lg:flex">
              {!loading && !user ? (
                <>
                  <Link
                    to="/signin"
                    className="rounded-lg border border-clinic-border px-4 py-3 text-sm font-semibold text-clinic-navy transition hover:border-clinic-teal hover:bg-clinic-mint"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    className="rounded-lg bg-clinic-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-clinic-teal"
                  >
                    Sign Up
                  </Link>
                </>
              ) : !loading && user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to={dashboardPath}
                    className="flex items-center gap-2 rounded-xl border border-clinic-border px-3 py-2 transition hover:bg-clinic-mint"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clinic-mint text-clinic-navy">
                      <UserRound size={20} />
                    </span>

                    <span className="max-w-32">
                      <span className="block truncate text-sm font-semibold text-clinic-navy">
                        {user.name}
                      </span>

                      <span className="block text-xs text-clinic-muted">
                        {user.role === "admin"
                          ? "Admin dashboard"
                          : "My dashboard"}
                      </span>
                    </span>

                    <LayoutDashboard size={18} />
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg border border-clinic-border p-3 text-clinic-navy transition hover:bg-clinic-mint"
                    aria-label="Sign out"
                    title="Sign out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : null}

              {/* Keep the appointment button */}
              <Link
                to="/book-appointment"
                className="clinic-button clinic-button-primary"
              >
                Book an Appointment
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen((previous) => !previous)
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-clinic-border bg-white text-clinic-navy transition hover:border-clinic-teal lg:hidden"
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <Menu size={22} aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-clinic-navy/20 backdrop-blur-sm lg:hidden"
            onClick={closeMobileMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="ml-auto flex h-full w-[min(88%,380px)] flex-col overflow-y-auto bg-white px-6 pb-8 pt-28 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Mobile Links */}
              <div className="flex flex-1 flex-col gap-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-4 text-base font-semibold transition ${
                        isActive
                          ? "bg-clinic-mint text-clinic-navy"
                          : "text-clinic-muted hover:bg-clinic-background hover:text-clinic-navy"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* Mobile Authentication */}
              <div className="mt-6 flex flex-col gap-3">
                {!loading && !user ? (
                  <>
                    <Link
                      to="/signin"
                      onClick={closeMobileMenu}
                      className="flex min-h-12 items-center justify-center rounded-xl border border-clinic-border px-3 py-3 font-semibold text-clinic-navy transition hover:bg-clinic-mint"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/signup"
                      onClick={closeMobileMenu}
                      className="flex min-h-12 items-center justify-center rounded-xl bg-clinic-navy px-3 py-3 font-semibold text-white transition hover:bg-clinic-teal"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : !loading && user ? (
                  <>
                    <Link
                      to={dashboardPath}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-xl bg-clinic-mint p-4 text-clinic-navy"
                    >
                      <UserRound size={22} />

                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">
                          {user.name}
                        </span>

                        <span className="block text-sm">
                          {user.role === "admin"
                            ? "Admin dashboard"
                            : "My dashboard"}
                        </span>
                      </span>

                      <LayoutDashboard size={20} />
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-clinic-border p-3 font-semibold text-clinic-navy transition hover:bg-clinic-mint"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </>
                ) : null}
              </div>

              {/* Mobile Appointment Button */}
              <Link
                to="/book-appointment"
                onClick={closeMobileMenu}
                className="clinic-button clinic-button-primary mt-4 w-full"
              >
                Book an Appointment
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>

              {/* Clinic Information */}
              <div className="mt-6 border-t border-clinic-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clinic-teal">
                  Raj Clinic
                </p>

                <p className="mt-2 text-sm leading-6 text-clinic-muted">
                  Modern medicine with personal care.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
