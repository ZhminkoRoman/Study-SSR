import React from "react";
import { hydrate } from "react-dom";
// import { Provider } from 'react-redux';
import App from "./app";
import { BrowserRouter } from "react-router-dom";
// import store from './store';
import './styles.scss';

hydrate(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("ssr-app")
);
