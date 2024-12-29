import { RouterProvider } from 'react-router-dom';
import './App.css';
import { ServerLoaded } from './components/ServerLoaded';
import { AuthProvider } from './context/AuthProvider';
import { LayoutProvider } from './context/LayoutProvider';
import { router } from './router';

const App = () => {
  return (
    <main className="purple-dark w-screen h-screen text-foreground bg-background text-center items-center justify-start sm:gap-10 gap-4 flex flex-col overflow-x-auto sm:overflow-x-auto pb-5">
      <LayoutProvider>
        <AuthProvider>
          <ServerLoaded>
            <RouterProvider router={router} />
          </ServerLoaded>
        </AuthProvider>
      </LayoutProvider>
    </main>
  );
};

export default App;
