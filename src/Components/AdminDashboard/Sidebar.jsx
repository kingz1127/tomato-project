import { BiLogOut } from "react-icons/bi";

import { BiHelpCircle } from "react-icons/bi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineInventory2 } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { GoPackage } from "react-icons/go";
import { BiCartAdd } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { RiDashboardLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebarAdmin}>
      <h1 className={styles.tomatoSide}>Tomato.</h1>

      <div className={styles.activeImg}>
        <NavLink
          to="adminDash"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <RiDashboardLine style={{ height: "2rem", width: "2rem" }} />
          Dashboard
        </NavLink>
      </div>
      <div className={styles.activeImg}>
        <NavLink
          to="order"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <BiCartAdd style={{ height: "2rem", width: "2rem" }} /> Order
        </NavLink>
      </div>
      <div className={styles.activeImg}>
        <NavLink
          to="product"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <MdOutlineInventory2 style={{ height: "2rem", width: "2rem" }} />{" "}
          Product
        </NavLink>
      </div>
      <div className={styles.activeImg}>
        <NavLink
          to="customer"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <BsPeople style={{ height: "2rem", width: "2rem" }} /> Customer
        </NavLink>
      </div>
      <div className={styles.activeImg}>
        <NavLink
          to="employee"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <BsPersonWorkspace style={{ height: "2rem", width: "2rem" }} />{" "}
          Employee
        </NavLink>
      </div>
      <div className={styles.activeImg}>
        <NavLink
          to="billing"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <RiBillLine style={{ height: "2rem", width: "2rem" }} /> Billing
        </NavLink>
      </div>
      <div className={styles.activeImg}>
        <NavLink
          to="analytics"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <TbBrandGoogleAnalytics style={{ height: "2rem", width: "2rem" }} />{" "}
          Analytics
        </NavLink>
      </div>
      <div className={styles.activeImg}>
        <NavLink
          to="settings"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <CiSettings style={{ height: "2rem", width: "2rem" }} />
          Settings
        </NavLink>
      </div>
      <div className={styles.activeImg}>
        <NavLink
          to="help"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <BiHelpCircle style={{ height: "2rem", width: "2rem" }} /> Help
        </NavLink>
      </div>
      <div className={styles.activeImgLog}>
        <NavLink
          to="logout"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <BiLogOut style={{ height: "2rem", width: "2rem" }} /> Log out
        </NavLink>
      </div>
    </div>
  );
}
