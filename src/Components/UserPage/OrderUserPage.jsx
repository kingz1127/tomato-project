import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderUserPage() {
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({
    atmNumber: "",
    expDate: "",
    cvv: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    // ✅ Try to get order summary from localStorage
    const savedOrder = localStorage.getItem(
      `orderSummary_${loggedInUser.email}`
    );
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      // Support both Cart (products array) and Buy Now (single product)
      if (parsedOrder.products) setProducts(parsedOrder.products);
      else if (parsedOrder.product) setProducts([parsedOrder.product]);

      setTotalAmount(parsedOrder.total || 0);
    }
  }, []);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentData.atmNumber || !paymentData.expDate || !paymentData.cvv) {
      setError("Please fill all payment fields.");
      return;
    }
    setError("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/homepage");
  };

  return (
    <div className="orderuserpage">
      <h2>Payment Information</h2>

      {products.length > 0 ? (
        <div className="order-summary">
          <h3>Your Order</h3>
          <ul>
            {products.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h4>Total: ${totalAmount.toFixed(2)}</h4>
        </div>
      ) : (
        <p>No items found in your order.</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="atmNumber"
          placeholder="ATM Number"
          value={paymentData.atmNumber}
          onChange={handleChange}
          minLength="16"
          maxLength="16"
          pattern="\d{16}"
          required
        />
        <input
          type="text"
          name="expDate"
          placeholder="Expiry Date (MM/YY)"
          value={paymentData.expDate}
          onChange={handleChange}
          pattern="(0[1-9]|1[0-2])\/\d{2}"
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentData.cvv}
          onChange={handleChange}
          minLength="3"
          maxLength="3"
          pattern="\d{3}"
          required
        />
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        {error && <p className="error">{error}</p>}
        <button type="submit">Pay Now</button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Payment Completed 🎉</h3>
            <p>Thank you for your order!</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
