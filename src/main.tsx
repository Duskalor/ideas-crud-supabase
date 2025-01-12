import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthContextProvider } from './components/Layout/AuthProvider.tsx';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
dayjs.locale('es');
createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthContextProvider>
);
