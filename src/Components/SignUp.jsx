import { useState } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const myFirstReact = {
    firstName,
    lastName,
    email,
    password,
  };

  // function handleSignUp(e) {
  //   e.preventDefault();
  //   // todo check user

  //   setError({
  //     firstName: firstName ? "" : "First Name cannot be empty!",
  //     lastName: lastName ? "" : "Last Name cannot be empty!",
  //     email: email ? "" : "Email cannot be empty!",
  //     password: password ? "" : "Password cannot be empty!",
  //   });

  //   if (firstName && lastName && email && password) {
  //     localStorage.setItem("myUsers", JSON.stringify(myFirstReact));
  //     navigate("/login");
  //   }

  //   console.log(myFirstReact);
  // }
  function handleSignUp(e) {
    e.preventDefault();

    setError({
      firstName: firstName ? "" : "First Name cannot be empty!",
      lastName: lastName ? "" : "Last Name cannot be empty!",
      email: email ? "" : "Email cannot be empty!",
      password: password ? "" : "Password cannot be empty!",
    });

    if (firstName && lastName && email && password) {
      // Try to parse stored data
      let storedUsers = [];
      try {
        const data = JSON.parse(localStorage.getItem("myUsers"));
        if (Array.isArray(data)) {
          storedUsers = data;
        }
      } catch (err) {
        console.error("Invalid data in myUsers, resetting...");
      }

      // Create new user
      const newUser = { firstName, lastName, email, password };
      const updatedUsers = [...storedUsers, newUser];

      // Save updated array
      localStorage.setItem("myUsers", JSON.stringify(updatedUsers));

      // Optional: notify admin dashboard
      window.dispatchEvent(new Event("storage"));

      navigate("/login");
    }
  }

  return (
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
          Sign Up
        </h1>
        <form className={styles.signUpForm} onSubmit={(e) => handleSignUp(e)}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          {error.firstName && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          {error.lastName && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          {error.email && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {error.password && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>

        <p>Already have an account?</p>

        <Link
          to="/login"
          style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
        >
          <p>Login!</p>
        </Link>
      </div>
    </div>
  );
}
