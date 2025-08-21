import React, { useEffect, useState } from "react";

export default function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="admin-orders">
      <h1>
        All User Orders <br />
        <span>{orders.length}</span>
      </h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Order Date</th>
              <th>Products</th>
              <th>Subtotal ($)</th>
              <th>Delivery Fee ($)</th>
              <th>Total ($)</th>
              <th>Delivery Info</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
