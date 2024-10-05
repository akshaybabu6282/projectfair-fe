import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import ContextShareNew from "./context/ContextShareNew.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextShareNew>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextShareNew>
  </StrictMode>
);
