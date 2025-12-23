import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import App from './App'; // Assuming your main component is named App

const container = document.getElementById('root');
const root = createRoot(container); // Use createRoot to create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
