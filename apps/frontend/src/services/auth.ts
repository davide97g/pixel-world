import { supabase } from "../config/supabase";

export const AUTH = {
  login: async ({ email, password }: { email: string; password: string }) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },
  logout: async () => {
    return await supabase.auth.signOut();
  },
};
