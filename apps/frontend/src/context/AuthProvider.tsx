import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { IUser } from "@pixel-world/types";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../config/supabase";

import { useServerGetInfo } from "@/api/general/useServerGetInfo";
import { ToastAction } from "@/components/ui/toast";
import { api } from "@/config/client";
import { useToast } from "@/hooks/useToast";
import { getUserInfo } from "../services/userInfo";

interface AuthContext {
  session?: Session;
  user?: IUser;
  isLogged?: boolean;
  isServerReady: boolean;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContext);

function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session>();
  const [user, setUser] = useState<IUser>();
  const serverInfo = useServerGetInfo();

  const { toast } = useToast();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session ?? undefined);
      try {
        if (session && !user)
          await getUserInfo({ access_token: session.access_token }).then(
            (res) => setUser(res),
          );
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        throw e;
      } finally {
        setLoading(false);
      }
    });
    return () => data.subscription.unsubscribe();
  }, [toast, user]);

  useEffect(() => {
    api.interceptors.request.use((config) => {
      if (session)
        config.headers.Authorization = `Bearer ${session.access_token}`;
      return config;
    });
  }, [session]);

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        throw error;
      },
    );

    return () => {
      api.interceptors.response.eject(api.interceptors.response.use());
    };
  }, [session, toast]);

  const value = useMemo(
    () => ({
      session,
      user,
      isLogged: !!session,
      isServerReady: serverInfo.isSuccess && !loading,
      loading,
    }),
    [loading, serverInfo.isSuccess, session, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
