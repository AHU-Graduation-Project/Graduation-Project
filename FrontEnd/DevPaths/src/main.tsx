import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";


const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Unable to find root element");
}

createRoot(rootElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
