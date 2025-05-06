import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  //HTML'deki <div id="root"></div> elementini bulur.
  //bileşenleri app içine render ediyoruz.
  <StrictMode>
    <App />
  </StrictMode>
);
