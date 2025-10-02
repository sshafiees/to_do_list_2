'use client';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AuthUser,
  getCurrentUser,
  login as loginFn,
  logout as logoutFn,
  registerUser,
} from '../utils/auth';
import { supabaseBrowser } from '../lib/supabaseClient';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (input: {
    email: string;
    password: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  register: (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const u = await getCurrentUser();
      if (isMounted) setUser(u);
    })();
    const { data: sub } = supabaseBrowser.auth.onAuthStateChange(async () => {
      const u = await getCurrentUser();
      if (isMounted) setUser(u);
    });
    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      const res = await loginFn({
        email: input.email,
        password: input.password,
      });
      if (res.ok) {
        setUser(res.user);
        return { ok: true as const };
      }
      return { ok: false as const, error: res.error };
    },
    []
  );

  const register = useCallback(
    async (input: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      const res = await registerUser(input);
      if (res.ok) {
        setUser(res.user);
        return { ok: true as const };
      }
      return { ok: false as const, error: res.error };
    },
    []
  );

  const logout = useCallback(() => {
    logoutFn();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: Boolean(user), login, register, logout }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
