import { BiSearch } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import styles from "./AdminDash.module.css";
import { useEffect, useState } from "react";

export default function AdminDash() {
  const [customers, setCustomers] = useState(0);

  const loadCustomers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    setCustomers(storedUsers.length);
  };

  useEffect(() => {
    loadCustomers(); // Load on mount

    // Listen for storage changes
    window.addEventListener("storage", loadCustomers);

    return () => {
      window.removeEventListener("storage", loadCustomers);
    };
  }, []);
  return (
    <>
      <div className={styles.AdminDashhead}>
        <div className={styles.searchBar}>
          <BiSearch className={styles.iconSearch} />
          <input type="search" name="" id="" placeholder="Search" />
        </div>

        <div className={styles.mailNot}>
          <FiMail className={styles.icons} />
          <IoIosNotificationsOutline className={styles.icons} />
        </div>
      </div>

      <div className={styles.list}>
        <h1>Orders </h1>
        <h1>Products</h1>
        <h1>Customers {customers}</h1>
        <h1>Employee</h1>
        <h1>Billings</h1>
        <h1>Analytics</h1>
        <h1>Settings</h1>
        <h1>Help</h1>
      </div>
    </>
  );
}
