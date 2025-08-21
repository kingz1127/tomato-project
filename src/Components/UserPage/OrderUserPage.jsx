import { FcMoneyTransfer } from "react-icons/fc";
import { FcInTransit } from "react-icons/fc";
import { AiOutlineTransaction } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../LandingPage/Footer";
import NavbarHome from "./NavbarHome";
import styles from "./OrderUserPage.module.css";

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
      if (parsedOrder.products) setProducts(parsedOrder.products);
      else if (parsedOrder.product) setProducts([parsedOrder.product]);

      setTotalAmount(parsedOrder.total || 0);
    }
  }, []);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const generateOrderId = () => {
    return "ORD-" + Date.now(); // Example: ORD-1692215589123
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentData.atmNumber || !paymentData.expDate || !paymentData.cvv) {
      setError("Please fill all payment fields.");
      return;
    }
    setError("");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    const orderId = generateOrderId();

    // ✅ Save order with ID to localStorage
    const newOrder = {
      orderId,
      products,
      total: totalAmount,
      email: loggedInUser.email,
      date: new Date().toISOString(),
    };

    let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    allOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(allOrders));

    // ✅ Alert with order ID
    alert(
      `Payment successful! Your Order ID is ${orderId}. Please keep it safe.`
    );

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/homepage");
  };

  return (
    <div className={styles.orderuserpage}>
      <div className={styles.navbar}>
        <NavbarHome />
      </div>
      <h2>Payment Information</h2>

      <div className={styles.summarypay}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div className={styles.modal}>
            <FcMoneyTransfer className={styles.Transact} />
            <h3>Payment Completed 🎉</h3>
            <p>Thank you for your order!</p>
            <button onClick={handleCloseModal}>Close</button>
            <p>
              Your order is in transit _ _ _
              <FcInTransit className={styles.TransactCar} />
            </p>
          </div>
        </div>
      )}
      <div className={styles.Footer}>
        <Footer />
      </div>
    </div>
  );
}
