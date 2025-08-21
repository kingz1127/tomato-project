import React from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import NavbarHome from "./NavbarHome";
import Footer from "../LandingPage/Footer";
import AppDownload from "../LandingPage/AppDownload";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotalCartAmount,
  } = useStoreContext();
  const navigate = useNavigate();

  // ✅ Proceed to checkout only from Cart
  const handleProceed = () => {
    if (Object.values(cartItems).length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
    } else {
      navigate("/placeorder", {
        state: {
          products: Object.values(cartItems), // ✅ match OrderUserPage
          totalAmount:
            getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2, // includes delivery fee
        },
      });
    }
  };

  return (
    <>
      <div className="navbar">
        <NavbarHome />
      </div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Image</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />

          {Object.values(cartItems).length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            Object.values(cartItems).map((item) => (
              <div key={item.id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} className="imgcart" />
                  <p>{item.name}</p>
                  <p>${Number(item.price).toFixed(2)}</p>
                  <p className="pdecinc">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="decrease"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="increase"
                    >
                      +
                    </button>
                  </p>
                  <p>${(Number(item.price) * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cross"
                  >
                    remove
                  </button>
                </div>
                <hr />
              </div>
            ))
          )}
        </div>

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount().toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  $
                  {(getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 2
                  ).toFixed(2)}
                </b>
              </div>
            </div>
            <button onClick={handleProceed}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
      <div className="appD">
        <AppDownload />
      </div>

      <Footer />
    </>
  );
};

export default Cart;
