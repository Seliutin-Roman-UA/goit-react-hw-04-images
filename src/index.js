import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { SearchContextProvider } from 'components/context/context';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <SearchContextProvider>
    <App />
  </SearchContextProvider>
  // </React.StrictMode>
);
