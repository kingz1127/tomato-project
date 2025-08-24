// import React, { useEffect, useState } from "react";

// export default function Order() {
//   const [orders, setOrders] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 7;

//   // ✅ Load orders from localStorage
//   useEffect(() => {
//     const savedOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
//     setOrders(savedOrders.reverse()); // latest first
//   }, []);

//   // ✅ Handle status change and persist in localStorage
//   const handleStatusChange = (orderId, newStatus) => {
//     const updatedOrders = orders.map((order) =>
//       order.id === orderId ? { ...order, status: newStatus } : order
//     );
//     setOrders(updatedOrders);
//     // store reversed again so newest stays at top
//     localStorage.setItem(
//       "allOrders",
//       JSON.stringify([...updatedOrders].reverse())
//     );
//   };

//   // ✅ Clear all orders
//   const handleClearAll = () => {
//     localStorage.removeItem("allOrders");
//     setOrders([]);
//   };

//   // ✅ Filter by Order ID
//   const filteredOrders = orders.filter((order) =>
//     order.id?.toString().includes(searchId.trim())
//   );

//   // ✅ Pagination logic
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(
//     indexOfFirstOrder,
//     indexOfLastOrder
//   );
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   return (
//     <div className="admin-orders">
//       <h1>
//         All User Orders <br />
//         <span>{filteredOrders.length}</span>
//       </h1>

//       {/* Search by Order ID */}
//       <input
//         type="text"
//         placeholder="Search by Order ID"
//         value={searchId}
//         onChange={(e) => {
//           setSearchId(e.target.value);
//           setCurrentPage(1); // reset to page 1 when searching
//         }}
//         style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
//       />

//       {currentOrders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <table border="1" cellPadding="8" cellSpacing="0">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>User Email</th>
//               <th>Order Date</th>
//               <th>Products</th>
//               <th>Subtotal ($)</th>
//               <th>Delivery Fee ($)</th>
//               <th>Total ($)</th>
//               <th>Delivery Info</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentOrders.map((order, index) => (
//               <tr key={order.id || index}>
//                 <td>{order.id}</td>
//                 <td>{order.userEmail}</td>
//                 <td>{order.orderDate}</td>
//                 <td>
//                   {order.products.map((p, i) => (
//                     <div key={i}>
//                       {p.name} (x{p.quantity}) = $
//                       {(p.price * p.quantity).toFixed(2)}
//                     </div>
//                   ))}
//                 </td>
//                 <td>{order.subtotal.toFixed(2)}</td>
//                 <td>{order.deliveryFee.toFixed(2)}</td>
//                 <td>{order.total.toFixed(2)}</td>
//                 <td>
//                   {order.delivery.firstName} {order.delivery.lastName},{" "}
//                   {order.delivery.street}, {order.delivery.city},{" "}
//                   {order.delivery.state}, {order.delivery.zip},{" "}
//                   {order.delivery.country}, Phone: {order.delivery.phone},
//                   Email: {order.delivery.email}
//                 </td>
//                 <td>
//                   <select
//                     value={order.status || "pending"}
//                     onChange={(e) =>
//                       handleStatusChange(order.id, e.target.value)
//                     }
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="En route">En route</option>
//                     <option value="Delivered">Delivered</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* ✅ Pagination Controls */}
//       {totalPages > 1 && (
//         <div style={{ marginTop: "15px" }}>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>
//           <span style={{ margin: "0 10px" }}>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "./Order.css"; // ✅ add this CSS file

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
      <h1>
        All User Orders <span className="count">({orders.length})</span>
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search by Order ID"
        value={searchId}
        onChange={(e) => {
          setSearchId(e.target.value);
          setCurrentPage(1);
        }}
        className="search-box"
      />

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
