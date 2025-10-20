import SignUp from "./Components/SignUp.jsx";
import Login from "./Components/Login.jsx";
import Demo from "./Components/LandingPage/Demo.jsx";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";
import Settings from "./Components/AdminDashboard/Settings.jsx";
import Order from "./Components/AdminDashboard/Order.jsx";
import Product from "./Components/AdminDashboard/Product.jsx";
import Customer from "./Components/AdminDashboard/Customer.jsx";
import Employee from "./Components/AdminDashboard/Employee.jsx";
import Billing from "./Components/AdminDashboard/Billing.jsx";
import Analytics from "./Components/AdminDashboard/Analytics.jsx";
import Help from "./Components/AdminDashboard/Help.jsx";
import Logout from "./Components/AdminDashboard/Logout.jsx";
import AdminDash from "./Components/AdminDashboard/AdminDash.jsx";

import { StoreContextProvider } from "./Components/context/StoreContext.jsx";
import Homepage from "./Components/UserPage/Homepage.jsx";
import Cart from "./Components/UserPage/Cart.jsx";
// or PlaceOrder.jsx if that's the actual filename
import OrderUserPage from "./Components/UserPage/OrderUserPage.jsx";
import PlaceOrder from "./Components/UserPage/Placeorder.jsx";
// import Placeorder from "./Components/UserPage/Placeorder.jsx";
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
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/orderUserPage" element={<OrderUserPage />} />
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
