import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router />
    <ToastContainer />
  </React.StrictMode>
);
