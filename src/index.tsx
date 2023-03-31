import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider 
    maxSnack={3}  
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

