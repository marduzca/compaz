import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './app/i18n/instance';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@mui/material';
import App from './app/App';
import theme from './app/theme';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
