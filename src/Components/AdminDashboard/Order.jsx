import React, { useEffect, useState } from "react";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    setOrders(savedOrders.reverse()); // latest first
  }, []);

  // Filter orders by ID
  const filteredOrders = orders.filter((order) =>
    order.id?.toString().includes(searchId.trim())
  );

  // Clear all orders
  const clearAllOrders = () => {
    if (window.confirm("Are you sure you want to delete all orders?")) {
      localStorage.removeItem("allOrders");
      setOrders([]);
    }
  };

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem(
      "allOrders",
      JSON.stringify(updatedOrders.slice().reverse())
    );
    // save in correct order (oldest at bottom)
  };

  return (
    <div className="admin-orders">
      <h1>
        Orders <br />
        <span style={{ fontSize: "2.5rem" }}>{orders.length}</span>
      </h1>

      {/* Search by Order ID */}
      <input
        type="text"
        placeholder="Search by Order ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Email</th>
              <th>Order Date</th>
              <th>Products</th>
              <th>Subtotal ($)</th>
              <th>Delivery Fee ($)</th>
              <th>Total ($)</th>
              <th>Delivery Info</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id || index}>
                <td>{order.id}</td>
                <td>{order.userEmail}</td>
                <td>{order.orderDate}</td>
                <td>
                  {order.products.map((p, i) => (
                    <div key={i}>
                      {p.name} (x{p.quantity}) = $
                      {(p.price * p.quantity).toFixed(2)}
                    </div>
                  ))}
                </td>
                <td>{order.subtotal.toFixed(2)}</td>
                <td>{order.deliveryFee.toFixed(2)}</td>
                <td>{order.total.toFixed(2)}</td>
                <td>
                  {order.delivery.firstName} {order.delivery.lastName},{" "}
                  {order.delivery.street}, {order.delivery.city},{" "}
                  {order.delivery.state}, {order.delivery.zip},{" "}
                  {order.delivery.country}, Phone: {order.delivery.phone},
                  Email: {order.delivery.email}
                </td>
                <td>
                  <select
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

      {/* <button
        onClick={clearAllOrders}
        style={{
          marginTop: "15px",
          padding: "8px 12px",
          cursor: "pointer",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Clear all orders
      </button> */}
    </div>
  );
}
