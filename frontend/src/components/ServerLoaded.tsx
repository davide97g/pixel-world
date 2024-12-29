import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Loader } from './Loader';

export function ServerLoaded({ children }: Readonly<{ children: ReactNode }>) {
  const { isServerReady } = useAuth();
  if (isServerReady)
    return (
      <div className="flex flex-col justify-center items-center gap-10 px-10 h-full">
        <div className="flex flex-col items-center">
          <img src="./logo.png" alt="logo" height={45} width={45} />
          <h1 className="text-2xl">Welcome to Pokèdle</h1>
        </div>
        <p>Weaking up the boss... Please wait a moment.</p>
        <Loader transparent />
      </div>
    );
  return <>{children}</>;
}