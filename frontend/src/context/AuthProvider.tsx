import { User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { auth } from '../config/firebase';

import { useUserCreateUser } from '../hooks/database/user/useUserCreateUser';
import { useUserGetUserById } from '../hooks/database/user/useUserGetUserById';
import { useServerGetInfo } from '../hooks/useServerGetInfo';
import { IUser } from '../types/user.types';

interface AuthContext {
  user?: IUser;
  isAdmin: boolean;
  isLogged: boolean;
  refetch: () => void;
  isServerReady: boolean;
}

export const AuthContext = createContext({
  user: undefined,
} as AuthContext);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<User>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const {
    data: user,
    isFetching,
    refetch,
  } = useUserGetUserById(firebaseUser?.uid);
  const serverInfo = useServerGetInfo();
  const { mutateAsync: createUser } = useUserCreateUser();

  const isLogged = useMemo(() => !!firebaseUser, [firebaseUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setFirebaseUser(user ?? undefined);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (firebaseUser) {
      firebaseUser
        .getIdTokenResult()
        .then((idTokenResult) => {
          setIsAdmin(!!idTokenResult.claims.admin);
        })
        .catch(() => setIsAdmin(false));
    }
  }, [firebaseUser]);

  useEffect(() => {
    if (firebaseUser && !user && !isFetching) {
      createUser({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName!,
        photoURL: firebaseUser.photoURL!,
      });
    }
  }, [createUser, firebaseUser, isFetching, user]);

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      isLogged,
      refetch,
      isServerReady: serverInfo.isSuccess,
    }),
    [user, isAdmin, isLogged, refetch, serverInfo],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
