import React, { useEffect, useState } from "react";
import "./Order.css"; // ✅ add this CSS file
import styles from "./Order.module.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiMail } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    setOrders([...savedOrders].reverse()); // Safe reverse
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("allOrders", JSON.stringify(updatedOrders));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all orders?")) {
      localStorage.removeItem("allOrders");
      setOrders([]);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.id?.toString().includes(searchId.trim())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="admin-orders">
      <div className={styles.AdminDashhead}>
        <h2>Hello, Admin</h2>
        <div className={styles.searchBar}>
          <BiSearch className={styles.iconSearch} />
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchId}
            onChange={(e) => {
              setSearchId(e.target.value);
              setCurrentPage(1);
            }}
            className="search-box"
          />
        </div>
        <div className={styles.mailNot}>
          <FiMail className={styles.icons} />
          <IoIosNotificationsOutline className={styles.icons} />
          <div className={styles.iconsAdmin}>
            <GrUserAdmin className={styles.icons} style={{ color: "white" }} />
          </div>
        </div>
      </div>

      <div>
        <h1 style={{ fontSize: "2rem" }}>All Orders</h1>
        <p className="count">{orders.length}</p>
      </div>

      {currentOrders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Email</th>
              <th>Order Date</th>
              <th>Products</th>
              <th>Subtotal</th>
              <th>Delivery Fee</th>
              <th>Total</th>
              <th>Delivery Info</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order.id || index}>
                <td>{order.id}</td>
                <td>{order.userEmail}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  {order.products.map((p, i) => (
                    <div key={i}>
                      {p.name} (x{p.quantity}) = $
                      {(p.price * p.quantity).toFixed(2)}
                    </div>
                  ))}
                </td>
                <td>${order.subtotal.toFixed(2)}</td>
                <td>${order.deliveryFee.toFixed(2)}</td>
                <td>${order.total.toFixed(2)}</td>
                <td className="delivery-info">
                  <div>
                    {order.delivery.firstName} {order.delivery.lastName}
                  </div>
                  <div>
                    {order.delivery.street}, {order.delivery.city}
                  </div>
                  <div>
                    {order.delivery.state}, {order.delivery.zip}
                  </div>
                  <div>{order.delivery.country}</div>
                  <div>📞 {order.delivery.phone}</div>
                  <div>📧 {order.delivery.email}</div>
                </td>
                <td>
                  <select
                    className={`status-select ${
                      order.status
                        ? order.status.toLowerCase().replace(" ", "-")
                        : "pending"
                    }`}
                    value={order.status || "pending"}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="En route">En route</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}

      {/* <button className="clear-btn" onClick={handleClearAll}>
        🗑 Clear All Orders
      </button> */}
    </div>
  );
}
