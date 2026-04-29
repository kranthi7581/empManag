import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    if (savedSession) {
      try {
        setSession(JSON.parse(savedSession));
      } catch (error) {
        console.error("Failed to parse session:", error);
        localStorage.removeItem("session");
      }
    }
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      signIn: (nextSession) => {
        setSession(nextSession);
        localStorage.setItem("session", JSON.stringify(nextSession));
      },
      updateSessionUser: (updatedUser) => {
        setSession((current) => {
          if (!current) return null;
          const next = { ...current, user: updatedUser };
          localStorage.setItem("session", JSON.stringify(next));
          return next;
        });
      },
      signOut: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("session");
        setSession(null);
      },
    }),
    [session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
