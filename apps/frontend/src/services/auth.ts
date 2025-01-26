import { supabase } from "../config/supabase";

export const AUTH = {
  login: async ({ email, password }: { email: string; password: string }) =>
    supabase.auth.signInWithPassword({
      email,
      password,
    }),
  register: async ({ email, password }: { email: string; password: string }) =>
    supabase.auth.signUp({
      email,
      password,
    }),
  logout: async () => supabase.auth.signOut(),
};
