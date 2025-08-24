import { useState, useEffect } from "react";
import styles from "./Settings.module.css";

export default function Settings() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    notifications: true,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("userSettings");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userSettings", JSON.stringify(formData));
    setMessage("✅ Saved successfully!");
  };

  const handleReset = () => {
    localStorage.removeItem("userSettings");
    setFormData({
      username: "",
      email: "",
      password: "",
      notifications: true,
    });
    setMessage("🔄 Reset to default!");
  };

  return (
    <div className={styles.settingsContainer}>
      <h2>⚙ Account Settings</h2>

      {message && <div>{message}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.text}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.email}
          />
        </div>

        <div>
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.password}
          />
        </div>

        <div>
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
          />
          <label>Enable Notifications</label>
        </div>

        <button className={styles.save}>Save</button>
        <button type="button" onClick={handleReset} className={styles.reset}>
          Reset
        </button>
      </form>
    </div>
  );
}
