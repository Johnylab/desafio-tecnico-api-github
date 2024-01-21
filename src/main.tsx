import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './Routes.tsx';
import { GlobalProvider } from './context/GlobalContext.tsx';

import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  </React.StrictMode>
);
