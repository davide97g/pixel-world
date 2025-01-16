import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

import { Session } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';

interface AuthContext {
  session: Session | null;
}

export const AuthContext = createContext({
  session: null,
} as AuthContext);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // admin claim
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, [session]);

  const value = useMemo(
    () => ({
      session,
    }),
    [session],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
