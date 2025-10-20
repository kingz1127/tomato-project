import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./placeorder.css";
import Footer from "../LandingPage/Footer";
import NavbarHome from "./NavbarHome";

const PlaceOrder = () => {
  const location = useLocation();
  const { products = [] } = location.state || {};

  const [orderProducts, setOrderProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // ✅ If redirected from Cart
    if (products.length > 0) {
      setOrderProducts(products);
      return;
    }

    // ✅ If redirected from Buy Now (single product)
    if (loggedInUser) {
      const savedProduct = localStorage.getItem(`buyNow_${loggedInUser.email}`);
      if (savedProduct) {
        const parsedProduct = JSON.parse(savedProduct);
        setOrderProducts([parsedProduct]);
        setQuantity(parsedProduct.quantity || 1);

        const savedDelivery = localStorage.getItem(
          `deliveryInfo_${loggedInUser.email}`
        );
        if (savedDelivery) setFormData(JSON.parse(savedDelivery));
      }
    }
  }, [products]);

  const handleIncrease = () => {
    if (orderProducts.length === 1) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      setOrderProducts([{ ...orderProducts[0], quantity: newQty }]);
    }
  };

  const handleDecrease = () => {
    if (orderProducts.length === 1 && quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      setOrderProducts([{ ...orderProducts[0], quantity: newQty }]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validate form fields
    for (let key in formData) {
      if (!formData[key]) {
        alert("Please fill all delivery fields before proceeding.");
        return;
      }
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      // ✅ Save delivery info
      localStorage.setItem(
        `deliveryInfo_${loggedInUser.email}`,
        JSON.stringify(formData)
      );

      // ✅ Calculate totals
      const subtotal = orderProducts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const deliveryFee = orderProducts.length > 0 ? 2 : 0;
      const total = subtotal + deliveryFee;

      // ✅ Generate unique order ID
      const orderId = "ORD-" + Date.now();

      const newOrder = {
        id: orderId,
        userEmail: loggedInUser.email,
        products: orderProducts,
        delivery: formData,
        subtotal,
        deliveryFee,
        total,
        orderDate: new Date().toLocaleString(),
        status: "Pending",
      };

      // ✅ Save order for Admin (allOrders)
      const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
      allOrders.push(newOrder);
      localStorage.setItem("allOrders", JSON.stringify(allOrders));

      // ✅ Save order to user profile (myUsers)
      let users = JSON.parse(localStorage.getItem("myUsers")) || [];
      users = users.map((user) => {
        if (user.email === loggedInUser.email) {
          const updatedOrders = user.orders
            ? [...user.orders, newOrder]
            : [newOrder];
          return { ...user, orders: updatedOrders };
        }
        return user;
      });
      localStorage.setItem("myUsers", JSON.stringify(users));

      // ✅ Save order summary for OrderUserPage (Payment)
      localStorage.setItem(
        `orderSummary_${loggedInUser.email}`,
        JSON.stringify({
          products: orderProducts,
          total, // <-- ✅ ensures payment page reads correct total
        })
      );

      // ✅ Redirect to payment page
      window.location.href = "/orderuserpage";
    }
  };

  const subtotal = orderProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = orderProducts.length > 0 ? 2 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      <div className="navbar">
        <NavbarHome />
      </div>
      <form className="place-order" onSubmit={handleSubmit}>
        {/* LEFT SIDE - DELIVERY FORM */}
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleInputChange}
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              name="zip"
              placeholder="Zip code"
              value={formData.zip}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Order Summary</h2>
            {orderProducts.length > 0 ? (
              <div>
                {orderProducts.map((item) => (
                  <div key={item.id} className="cart-total-details">
                    <p>
                      {item.name} (x{item.quantity})
                    </p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <hr />
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${deliveryFee}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${total.toFixed(2)}</b>
                </div>
              </div>
            ) : (
              <p>No product selected.</p>
            )}
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>

      <Footer />
    </>
  );
};

export default PlaceOrder;