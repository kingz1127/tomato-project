import { useState, useEffect } from "react";
import styles from "./Employee.module.css";

export default function Employee() {
  const defaultEmployees = [
    { id: 1, name: "John Ovie", role: "Manager" },
    { id: 2, name: "Jane Ijeh", role: "Developer" },
    { id: 3, name: "Michael Johnson", role: "Designer" },
    { id: 4, name: "Sarah Peace", role: "QA Engineer" },
    { id: 5, name: "David Adeola", role: "DevOps Engineer" },
    { id: 6, name: "Emily Adebayo", role: "Product Owner" },
  ];

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", role: "" });
  const [editingId, setEditingId] = useState(null);

  // Load from localStorage on mount (runs once)
  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      setEmployees(JSON.parse(stored));
    } else {
      setEmployees(defaultEmployees);
    }
  }, []); // ✅ stays empty — only run once

  // Save to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]); // ✅ runs when employees changes

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdate = () => {
    if (!formData.name.trim() || !formData.role.trim()) return;

    if (editingId) {
      // Update existing employee
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingId ? { ...emp, ...formData } : emp
        )
      );
      setEditingId(null);
    } else {
      // Add new employee
      setEmployees((prev) => [...prev, { id: Date.now(), ...formData }]);
    }

    setFormData({ name: "", role: "" });
  };

  const handleEdit = (id) => {
    const emp = employees.find((e) => e.id === id);
    if (emp) {
      setFormData({ name: emp.name, role: emp.role });
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Employees</h1>

      <div className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Employee Role"
          value={formData.role}
          onChange={handleChange}
        />
        <button className={styles.button} onClick={handleAddOrUpdate}>
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      <div className={styles.grid}>
        {employees.map((emp) => (
          <div key={emp.id} className={styles.card}>
            <div className={styles.name}>{emp.name}</div>
            <div className={styles.role}>{emp.role}</div>
            <button
              className={"${styles.button} ${styles.editButton}"} // ✅ fixed
              onClick={() => handleEdit(emp.id)}
            >
              Edit
            </button>
            <button
              className={"${styles.button} ${styles.deleteButton}"} // ✅ fixed
              onClick={() => handleDelete(emp.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
