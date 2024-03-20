import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CustomAutheticationContext from './context/userAuthentication';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import CustomDataContext from './context/dataContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomAutheticationContext>
      <CustomDataContext>
    <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
    </CustomDataContext>
    </CustomAutheticationContext>
  </React.StrictMode>
);