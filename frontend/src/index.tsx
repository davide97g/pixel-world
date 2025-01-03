import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App';
import { startWebSocketServer } from './services/ws';

startWebSocketServer();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NextUIProvider>,
);
