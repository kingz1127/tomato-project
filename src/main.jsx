import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { StoreContextProvider } from "./Components/context/StoreContext.jsx";

const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StoreContextProvider currentUser={currentUser}>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </StrictMode>
);
