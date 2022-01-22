import React from "react";
import { hydrate } from "react-dom";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

hydrate(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("ssr-app")
);
