import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { StoreContextProvider } from "./Components/context/StoreContext.jsx";

const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreContextProvider currentUser={currentUser}>
      <App />
    </StoreContextProvider>
  </StrictMode>
);
