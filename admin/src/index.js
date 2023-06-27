import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
//import "./reg_osn.css"
//import "./reg_osn.css"
import { BrowserRouter } from "react-router-dom";
import './reg.css'

import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </BrowserRouter>
);
