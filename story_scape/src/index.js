import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CustomAutheticationContext from './context/userAuthentication';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
/**
 * Providing authetication context and using toast container
 */
root.render(
  <React.StrictMode>
    <CustomAutheticationContext>
    <App />
    <ToastContainer theme="colored" autoClose={2000}/>
    </CustomAutheticationContext>
    </React.StrictMode>
);