
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../axios/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("rajClinicToken");
    setUser(null);
  }, []);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const token = localStorage.getItem("rajClinicToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");

        if (active) setUser(response.data.user);
      } catch {
        localStorage.removeItem("rajClinicToken");
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  async function signin(email, password) {
    const { data } = await api.post("/auth/signin", {
      email,
      password,
    });

    localStorage.setItem("rajClinicToken", data.token);
    setUser(data.user);
    return data.user;
  }

  async function signup(name, email, password) {
    const { data } = await api.post("/auth/signup", {
      name,
      email,
      password,
    });

    localStorage.setItem("rajClinicToken", data.token);
    setUser(data.user);
    return data.user;
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signin, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
