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
      <h1>Welcome Admin</h1>
      <div className={styles.list}>
        <div className={styles.order}>
          <h1>Orders </h1>
        </div>

        <h1 className={styles.order}>Products</h1>
        <h1 className={styles.order}>Customers {customers}</h1>
        <h1 className={styles.order}>Employee</h1>
        <h1 className={styles.order}>Billings</h1>
        <h1 className={styles.order}>Analytics</h1>
        <h1 className={styles.order}>Settings</h1>
        <h1 className={styles.order}>Help</h1>
        <h1 className={styles.order}>Log Out</h1>
      </div>
    </>
  );
}
