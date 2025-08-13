import React from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

const Cart = () => {
  // Correct usage: use the hook directly without useContext
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useStoreContext();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                {" "}
                {/* Added key prop */}
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />{" "}
                  {/* Added alt text */}
                  <p>{item.name}</p>
                  <p>$ {item.price.toFixed(2)}</p> {/* Format price */}
                  <p>{cartItems[item._id]}</p>
                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>{" "}
                  {/* Format total */}
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    × {/* Changed to × symbol */}
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Explicit return for items not in cart
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p> {/* Format amount */}
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
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo-code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
