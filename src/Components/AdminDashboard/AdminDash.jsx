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
  const [employees, setEmployees] = useState(0);
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState(0); // ✅ new state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Load customers
  const loadCustomers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    setCustomers(storedUsers.length);
  };

  // Load products
  const loadProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts.length);
  };

  // Load employees
  const loadEmployees = () => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees.length);
  };

  // Load orders
  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    setOrders(storedOrders);
  };

  // ✅ Load bills
  const loadBills = () => {
    const storedBills = JSON.parse(localStorage.getItem("bills")) || [];
    setBills(storedBills.length);
  };

  useEffect(() => {
    loadCustomers();
    loadProducts();
    loadEmployees();
    loadOrders();
    loadBills();

    // Sync across tabs
    const handleStorage = () => {
      loadCustomers();
      loadProducts();
      loadEmployees();
      loadOrders();
      loadBills();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

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

      <div className={styles.list}>
        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <BiCartAdd className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>{orders.length} +</h1>
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
            <h1>{employees} +</h1>
            <p>Total Employees</p>
          </div>
        </div>

        {/* ✅ Total Bills */}
        <div className={styles.order}>
          <div className={styles.cartOrder}>
            <RiBillLine className={styles.BiCartAdd} />
          </div>
          <div className={styles.h1p}>
            <h1>{bills} +</h1>
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
