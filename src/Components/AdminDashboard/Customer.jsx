import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./AdminDash.module.css";
import { FiMail } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";
import stylesCus from "./Customer.module.css";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    setCustomers(storedUsers);

    const handleStorageChange = () => {
      const updatedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
      setCustomers(updatedUsers);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  return (
    <>
      <div className={styles.AdminDashhead}>
        <h2>Hello, Admin</h2>
        <div className={styles.searchBar}>
          <BiSearch className={styles.iconSearch} />
          <input type="search" placeholder="Search" />
        </div>
        <div className={styles.mailNot}>
          <FiMail className={styles.icons} />
          <IoIosNotificationsOutline className={styles.icons} />
          <div className={styles.iconsAdmin}>
            <GrUserAdmin className={styles.icons} style={{ color: "white" }} />
          </div>
        </div>
      </div>

      <p>All Customers</p>
      <h1>{customers.length}</h1>

      <table className={stylesCus.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
            <th>State</th>
            <th>Country</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
      <p>
        showing {currentPage} to 10 of {totalPages} pages
      </p>
    </>
  );
}
