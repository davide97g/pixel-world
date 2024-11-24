import { type ReactNode, createContext, useContext, useState } from 'react';

type Mode = 'create' | 'delete' | 'edit';

interface CreatorContextProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const CreatorContext = createContext<CreatorContextProps | undefined>(
  undefined,
);

export const CreatorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [mode, setMode] = useState<Mode>('create');

  return (
    <CreatorContext.Provider value={{ mode, setMode }}>
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreator = (): CreatorContextProps => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreator must be used within a CreatorProvider');
  }
  return context;
};
