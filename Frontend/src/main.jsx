import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes.jsx';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode> 
    <AppRoutes/>
  </React.StrictMode>
);
