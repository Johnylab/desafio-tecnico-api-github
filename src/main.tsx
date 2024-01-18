import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './Routes.tsx';
import { GlobalProvider } from './context/GlobalContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  </React.StrictMode>
);
