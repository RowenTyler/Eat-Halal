"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  type AuthorizedUser,
  type UserSession,
  authenticateUser,
  createSession,
  isSessionValid,
  hasPermission,
  canAccessRoute,
} from "./user-config";

interface AuthContextType {
  user: AuthorizedUser | null;
  session: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (route: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = "eat_halal_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthorizedUser | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (storedSession) {
      try {
        const parsedSession: UserSession = JSON.parse(storedSession);
        if (isSessionValid(parsedSession)) {
          setSession(parsedSession);
          setUser(parsedSession.user);
        } else {
          // Session expired, clear it
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const authenticatedUser = authenticateUser(email, password);

    if (authenticatedUser) {
      const newSession = createSession(authenticatedUser);
      setUser(authenticatedUser);
      setSession(newSession);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const checkPermission = (permission: string): boolean => {
    if (!user) return false;
    return hasPermission(user, permission);
  };

  const checkRouteAccess = (route: string): boolean => {
    if (!user) return false;
    return canAccessRoute(user, route);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user && !!session,
        isLoading,
        login,
        logout,
        hasPermission: checkPermission,
        canAccessRoute: checkRouteAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
