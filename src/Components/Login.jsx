import { useState } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./LandingPage/NavBar";
import Footer from "./LandingPage/Footer";
import AppDownload from "./LandingPage/AppDownload";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const [newPassword, setNewPassword] = useState(""); // for generated password
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const navigate = useNavigate();

  let adminMail = "Admin1127@gmail.com";
  let adminPass = "Admin112792";

  // Random password generator
  function generateRandomPassword(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  }

  function handleLogin(e) {
    e.preventDefault();
    let newErrors = { email: "", password: "", general: "" };

    if (!email) newErrors.email = "Email cannot be empty!";
    if (!password) newErrors.password = "Password cannot be empty!";

    if (newErrors.email || newErrors.password) {
      setError(newErrors);
      return;
    }

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
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      navigate("/homepage");
    } else {
      setError({ ...newErrors, general: "Invalid email or password" });
    }
  }

  // Handle forgot password
  function handleForgotPassword() {
    setError({ email: "", password: "", general: "" }); // reset old errors

    if (!email) {
      setError({ ...error, general: "Enter your email first" });
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    const matchedUserIndex = storedUsers.findIndex(
      (user) => user.email === email
    );

    if (matchedUserIndex === -1) {
      setError({ ...error, general: "No user found with this email" });
      return;
    }

    const randomPass = generateRandomPassword();
    setNewPassword(randomPass);
    setShowPasswordReset(true);

    // copy automatically
    navigator.clipboard.writeText(randomPass).catch(() => {
      console.warn("Could not copy password to clipboard");
    });
  }

  function handleSaveNewPassword() {
    const storedUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    const updatedUsers = storedUsers.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );

    localStorage.setItem("myUsers", JSON.stringify(updatedUsers));

    // ✅ auto-fill password input
    setPassword(newPassword);

    // ✅ show success message
    setError({
      email: "",
      password: "",
      general:
        "✅ Password updated! You can now log in with your new password.",
    });

    setShowPasswordReset(false);
  }

  return (
    <>
      <div className={styles.NavBar}>
        <NavBar />
      </div>

      <div className={styles.signUpBody}>
        <div className={styles.welcome}>
          <img src="src/assets/food.jpg" alt="" height="450" width="350" />
        </div>

        <div className={styles.signUp}>
          <h1 className={styles.signUph1}>
            <img
              src="src/assets/restaurantLogo.jpg"
              alt=""
              width="40"
              height="40"
            />
            Login
          </h1>

          <form className={styles.signUpForm} onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {error.password && <p style={{ color: "red" }}>{error.password}</p>}

            {error.general && <p style={{ color: "red" }}>{error.general}</p>}

            <button type="submit">Login</button>
          </form>

          {/* Forgot Password */}
          <p
            onClick={handleForgotPassword}
            style={{
              color: "rgba(243, 194, 134, 1)",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Forgot Password?
          </p>

          {/* Show new password + save button */}
          {showPasswordReset && (
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <p>
                Your new password: <b>{newPassword}</b>
                <br />
                <small>(Copied to clipboard ✔)</small>
              </p>
              <button onClick={handleSaveNewPassword}>Keep it Safe</button>
            </div>
          )}

          <p>Don't have an Account?</p>
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
          >
            <p style={{ color: "white" }}>Sign up!</p>
          </Link>
        </div>
      </div>
      <AppDownload />
      <Footer />
    </>
  );
}
