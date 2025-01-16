import { User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { auth } from '../config/firebase';

import { IUser } from '@pixel-world/types';

import { useUserCreateUser } from '../hooks/database/user/useUserCreateUser';
import { useUserGetUserById } from '../hooks/database/user/useUserGetUserById';
import { useServerGetInfo } from '../hooks/useServerGetInfo';
import { API } from '../services/api';

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
  const serverInfo = useServerGetInfo();
  const {
    data: user,
    refetch,
    isFetching,
  } = useUserGetUserById(firebaseUser?.uid);
  const { mutateAsync: createUser } = useUserCreateUser();

  const isLogged = useMemo(() => !!firebaseUser, [firebaseUser]);

  useEffect(() => {
    // admin claim
    firebaseUser
      ?.getIdTokenResult()
      .then((idTokenResult) => {
        setIsAdmin(!!idTokenResult.claims.admin);
      })
      .catch(() => setIsAdmin(false));
  }, [firebaseUser]);

  useEffect(() => {
    if (!firebaseUser) return;
    if (isFetching) return;

    if (user) {
      setLoading(false);
      return;
    }
    // if first time, generate color
    API.generateCustomColor().then((res) => {
      const color = res?.color;
      if (!color) {
        setLoading(false);
        console.error('Failed to generate custom color');
        return;
      }
      createUser({
        id: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        displayName: firebaseUser.displayName ?? '',
        photoURL: firebaseUser.photoURL ?? '',
        color,
      });
      setLoading(false);
    });
  }, [user, createUser, firebaseUser, isFetching]);

  useEffect(
    () =>
      auth.onAuthStateChanged(async (user) => {
        setFirebaseUser(user ?? undefined);
        if (!user) setLoading(false);
      }),
    [createUser],
  );

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
