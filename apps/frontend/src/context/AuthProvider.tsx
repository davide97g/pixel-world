import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../config/supabase";
import { useServerGetInfo } from "../hooks/useServerGetInfo";

interface AuthContext {
  session?: Session;
  user?: User;
  isLogged: boolean;
  isAdmin: boolean;
  isServerReady: boolean;
}

export const AuthContext = createContext({
  session: undefined,
} as AuthContext);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session>();
  const serverInfo = useServerGetInfo();

  useEffect(() => {
    // admin claim
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? undefined);
      setLoading(false);
    });
  }, [session]);

  const value = useMemo(
    () => ({
      session,
      user: session?.user,
      isLogged: !!session,
      isAdmin: session?.user?.role === "admin",
      isServerReady: serverInfo.isSuccess,
    }),
    [serverInfo.isSuccess, session]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
