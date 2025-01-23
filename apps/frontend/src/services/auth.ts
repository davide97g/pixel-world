import { supabase } from "../config/supabase";

export const AUTH = {
  login: async ({ email, password }: { email: string; password: string }) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },
  register: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  },
  logout: async () => {
    return await supabase.auth.signOut();
  },
};
