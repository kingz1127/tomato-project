import { BsPeople, BsPersonWorkspace } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { BiCartAdd, BiHelpCircle, BiLogOut, BiSearch } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import styles from "./AdminDash.module.css";
import { useEffect, useState } from "react";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";

export default function AdminDash() {
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0); // ✅ Add orders state

  const loadCustomers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    setCustomers(storedUsers.length);
  };

  const loadProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts.length);
  };

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    setOrders(savedOrders.length);
  };

  useEffect(() => {
    loadCustomers(); // Load on mount
    loadProducts();
    loadOrders(); // ✅ Load orders on mount

    // Listen for storage changes
    const handleStorageChange = () => {
      loadCustomers();
      loadOrders();
      loadProducts();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className={styles.AdminDashhead}>
        <h2>Hello, Admin</h2>
        <div className={styles.searchBar}>
          <BiSearch className={styles.iconSearch} />
          <input type="search" name="" id="" placeholder="Search" />
        </div>

        <div className={styles.mailNot}>
          <FiMail className={styles.icons} />
          <IoIosNotificationsOutline className={styles.icons} />
          <div className={styles.iconsAdmin}>
            <GrUserAdmin className={styles.icons} style={{ color: "white" }} />
          </div>
        </div>
      </div>

      <div className={styles.list}>
        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <BiCartAdd className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>{orders} + </h1> {/* ✅ Updated */}
            <p>Total Orders</p>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <MdOutlineInventory2 className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>{products} +</h1>
            <p>Total Products</p>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <BsPeople className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>{customers} +</h1>
            <p>Total Customers</p>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <BsPersonWorkspace className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>Employee +</h1>
            <p>Total Employees</p>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <RiBillLine className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>Billings +</h1>
            <p>Total Bills</p>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <TbBrandGoogleAnalytics className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p1}>
            <h1>Analytics</h1>
            <p>Top sales</p>
            <p>Grossed items</p>
            <p>Best rated</p>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <CiSettings className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>Settings</h1>
            <p>Update </p>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <BiHelpCircle className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>Help</h1>
            <p>FAQ</p>
          </div>
        </div>

        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <BiLogOut className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>Log Out</h1>
          </div>
        </div>
      </div>
    </>
  );
}
