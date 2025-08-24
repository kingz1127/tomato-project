import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";
import styles from "./AdminDash.module.css";
import stylesCus from "./Customer.module.css";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const customersPerPage = 10;

useEffect(() => {
  const storedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
  setCustomers(storedUsers);

  const handleStorageChange = () => {
    const updatedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    setCustomers(updatedUsers);

    // 👇 Move to last page when new customer is added
    const totalPages = Math.ceil(updatedUsers.length / customersPerPage);
    setCurrentPage(totalPages);
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

  // Search filter
  const filteredCustomers = customers.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  {/* Pagination Controls */}
{totalPages > 1 && (
  <div className={stylesCus.pagination}>
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      {"<"}
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
      <button
        key={num}
        onClick={() => setCurrentPage(num)}
        className={currentPage === num ? stylesCus.activePage : ""}
      >
        {num}
      </button>
    ))}

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


  return (
    <>
      {/* Admin Header */}
      <div className={styles.AdminDashhead}>
        <h2>Hello, Admin</h2>
        <div className={styles.searchBar}>
          <BiSearch className={styles.iconSearch} />
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Customers Section */}
      <div className={stylesCus.container}>
        <h3>All Customers</h3>
        <h1 className={stylesCus.total}>{customers.length}</h1>

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
                  <td>{user.age}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.state}</td>
                  <td>{user.country}</td>
                  <td>{user.orders?.length || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={stylesCus.pagination}>
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

        <p className={stylesCus.showing}>
          Showing {indexOfFirst + 1} to{" "}
          {Math.min(indexOfLast, filteredCustomers.length)} of{" "}
          {filteredCustomers.length} customers
        </p>
      </div>
    </>
  );
}
