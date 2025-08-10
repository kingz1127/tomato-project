import Sidebar from "./Sidebar";
import styles from "./AdminDashboard.module.css";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      <div className={styles.Background}>
        <div className={styles.Admin}>
          <Sidebar />
          <div className={styles.contentDashboard}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
