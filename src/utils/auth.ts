import { supabaseBrowser } from '../lib/supabaseClient';

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthState = {
  user: AuthUser | null;
};

function mapSupabaseUser(u: any | null): AuthUser | null {
  if (!u) return null;
  const meta = (u.user_metadata ?? {}) as {
    firstName?: string;
    lastName?: string;
  };
  return {
    id: u.id,
    email: u.email || '',
    firstName: meta.firstName || '',
    lastName: meta.lastName || '',
  };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data } = await supabaseBrowser.auth.getSession();
  return mapSupabaseUser(data.session?.user ?? null);
}

export async function registerUser(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<
  { ok: true; user: AuthUser | null } | { ok: false; error: string }
> {
  const { error, data } = await supabaseBrowser.auth.signUp({
    email: input.email.trim().toLowerCase(),
    password: input.password,
    options: {
      data: {
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
      },
    },
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, user: mapSupabaseUser(data.user ?? null) };
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<
  { ok: true; user: AuthUser | null } | { ok: false; error: string }
> {
  const { data, error } = await supabaseBrowser.auth.signInWithPassword({
    email: input.email.trim().toLowerCase(),
    password: input.password,
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, user: mapSupabaseUser(data.user ?? null) };
}

export async function logout(): Promise<void> {
  await supabaseBrowser.auth.signOut();
}
