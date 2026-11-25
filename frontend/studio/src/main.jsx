import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.scss";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext";

// Scroll animations are configured once for the whole app.
AOS.init({ duration: 800, easing: "ease-out", once: true });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
