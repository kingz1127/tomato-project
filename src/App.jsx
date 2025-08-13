import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Demo from "./Components/LandingPage/Demo";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Settings from "./Components/AdminDashboard/Settings";
import Order from "./Components/AdminDashboard/Order";
import Product from "./Components/AdminDashboard/Product";
import Customer from "./Components/AdminDashboard/Customer";
import Employee from "./Components/AdminDashboard/Employee";
import Billing from "./Components/AdminDashboard/Billing";
import Analytics from "./Components/AdminDashboard/Analytics";
import Help from "./Components/AdminDashboard/Help";
import Logout from "./Components/AdminDashboard/Logout";
import AdminDash from "./Components/AdminDashboard/AdminDash";

import { StoreContextProvider } from "./Components/context/StoreContext";
import Homepage from "./Components/UserPage/Homepage";
import Cart from "./Components/UserPage/cart";

export default function App() {
  return (
    <StoreContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Demo />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/cart" element={<Cart />} /> {/* Add cart route */}
          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route path="adminDash" element={<AdminDash />} />
            <Route path="order" element={<Order />} />
            <Route path="product" element={<Product />} />
            <Route path="customer" element={<Customer />} />
            <Route path="employee" element={<Employee />} />
            <Route path="billing" element={<Billing />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<p>Invalid route (404 Not Found)!!!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreContextProvider>
  );
}
