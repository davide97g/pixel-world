import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { IUser } from "@pixel-world/types";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../config/supabase";
import { useServerGetInfo } from "../hooks/useServerGetInfo";
import { getUserInfo } from "../services/userInfo";

interface AuthContext {
  session?: Session;
  user?: IUser;
  isLogged: boolean;
  isAdmin: boolean;
  isServerReady: boolean;
  loading: boolean;
}

export const AuthContext = createContext({
  session: undefined,
} as AuthContext);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session>();
  const [user, setUser] = useState<IUser>();
  const serverInfo = useServerGetInfo();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session ?? undefined);
        if (session)
          return getUserInfo({ access_token: session.access_token }).then(
            (res) => setUser(res)
          );
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      isLogged: !!session,
      isAdmin: session?.user?.role === "admin",
      isServerReady: serverInfo.isSuccess,
      loading,
    }),
    [loading, serverInfo.isSuccess, session, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
