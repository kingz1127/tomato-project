import { useState } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./LandingPage/NavBar";
import Footer from "./LandingPage/Footer";
import AppDownload from "./LandingPage/AppDownload";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  let adminMail = "Admin1127@gmail.com";
  let adminPass = "Admin112792";

  const myFirstReact = {
    email,
    password,
  };

  function handleLogin(e) {
    e.preventDefault();

    setError({
      email: email ? "" : "Email cannot be empty!",
      password: password ? "" : "Password cannot be empty!",
    });

    if (email && password) {
      const storedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];

      // Admin check
      if (email === adminMail && password === adminPass) {
        navigate("/adminDashboard");
        return;
      }

      // Find matching user
      const matchedUser = storedUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        // Save the logged-in user separately
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        navigate("/homepage");
      } else {
        alert("Invalid email or password");
      }
    }
  }

  return (
    <>
      <div className={styles.NavBar}>
        <NavBar />
      </div>

      <div className={styles.signUpBody}>
        <div className={styles.welcome}>
          <img src="src/Components/food.jpg" alt="" height="450" width="350" />
        </div>

        <div className={styles.signUp}>
          <h1 className={styles.signUph1}>
            <img
              src="src/Components/restaurantLogo.jpg"
              alt=""
              width="40"
              height="40"
            />
            Login
          </h1>
          <form className={styles.signUpForm} onSubmit={(e) => handleLogin(e)}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {error && error.email && (
              <p style={{ color: "red" }}>{error.email}</p>
            )}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {error && error.password && (
              <p style={{ color: "red" }}>{error.password}</p>
            )}
            <button type="submit">Login</button>
          </form>

          <p>Don't have an Account?</p>

          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
          >
            <p>Sign up!</p>
          </Link>
        </div>
      </div>
      <AppDownload />
      <Footer />
    </>
  );
}
