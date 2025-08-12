import { BiCartAdd } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";

import styles from "../LandingPage/NavBar.module.css";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className={styles.navBar}>
        <h1 className={styles.navBarName}>Tomato.</h1>

        <div className={styles.navhomes}>
          <NavLink to="/">
            <p>home</p>
          </NavLink>
          <p>menu</p>
          <p>mobile-app</p>
          <p>contact us</p>
        </div>

        <div className={styles.navbarIcons}>
          <h1>
            <BiSearch />
          </h1>
          <h1>
            <BiCartAdd />
          </h1>

          <Link to="/login">
            <p>sign in</p>
          </Link>
        </div>
      </div>
    </>
  );
}
