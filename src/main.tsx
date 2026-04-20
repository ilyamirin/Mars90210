import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { resolveRouterBasename } from './app/routerBase';
import './styles/global.css';
import './styles/layout.css';

const routerBasename = resolveRouterBasename(import.meta.env.BASE_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
