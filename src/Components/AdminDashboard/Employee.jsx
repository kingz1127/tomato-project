import { useState, useEffect } from "react";
import styles from "./Employee.module.css";

export default function Employee() {
  const defaultEmployees = [
    {
      id: "EMP001",
      name: "John Ovie",
      role: "Manager",
      age: 35,
      state: "Lagos",
      address: "12 Allen Avenue",
    },
    {
      id: "EMP002",
      name: "Jane Ijeh",
      role: "Developer",
      age: 28,
      state: "Abuja",
      address: "45 Garki Road",
    },
    {
      id: "EMP003",
      name: "Michael Johnson",
      role: "Designer",
      age: 30,
      state: "Oyo",
      address: "78 Ring Road",
    },
    {
      id: "EMP004",
      name: "Sarah Peace",
      role: "QA Engineer",
      age: 26,
      state: "Rivers",
      address: "101 Trans-Amadi",
    },
    {
      id: "EMP005",
      name: "David Adeola",
      role: "DevOps Engineer",
      age: 32,
      state: "Ogun",
      address: "15 Abeokuta Street",
    },
    {
      id: "EMP006",
      name: "Emily Adebayo",
      role: "Product Owner",
      age: 29,
      state: "Kano",
      address: "33 Zoo Road",
    },
  ];

  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem("employees");
    return stored ? JSON.parse(stored) : defaultEmployees;
  });

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    age: "",
    state: "",
    address: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Generate next Employee ID
  const getNextId = () => {
    if (employees.length === 0) return "EMP001";
    const lastId = employees[employees.length - 1].id;
    const num = parseInt(lastId.replace("EMP", ""), 10);
    const nextNum = num + 1;
    return `EMP${String(nextNum).padStart(3, "0")}`;
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) return;

    if (editingId) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingId
            ? { ...formData, id: editingId, age: Number(formData.age) }
            : emp
        )
      );
      setEditingId(null);
    } else {
      const newEmployee = {
        id: getNextId(),
        ...formData,
        age: Number(formData.age),
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }

    setFormData({ name: "", role: "", age: "", state: "", address: "" });
  };

  const handleEdit = (id) => {
    const emp = employees.find((e) => e.id === id);
    if (emp) {
      setFormData(emp);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  // 🔍 Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const query = searchQuery.toLowerCase();
    return (
      emp.id.toLowerCase().includes(query) ||
      emp.name.toLowerCase().includes(query) ||
      emp.age.toString().includes(query)
    );
  });

  // ✅ Pagination logic
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Employees</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by ID, Name or Age..."
        className={styles.search}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // reset to page 1 on search
        }}
      />

      {/* Add / Edit Form */}
      <form className={styles.form} onSubmit={handleAddOrUpdate}>
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
        <input
          type="number"
          name="age"
          placeholder="Employee Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State of Origin"
          value={formData.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Employee Address"
          value={formData.address}
          onChange={handleChange}
        />

        <button className={styles.button} type="submit">
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
        {editingId && (
          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={() => {
              setFormData({
                name: "",
                role: "",
                age: "",
                state: "",
                address: "",
              });
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Employee Grid */}
      <div className={styles.grid}>
        {currentEmployees.map((emp) => (
          <div key={emp.id} className={styles.card}>
            <div className={styles.name}>
              {emp.name} <span className={styles.empId}>({emp.id})</span>
            </div>
            <div className={styles.role}>{emp.role}</div>
            <div className={styles.age}>Age: {emp.age}</div>
            <div className={styles.state}>State: {emp.state}</div>
            <div className={styles.address}>Address: {emp.address}</div>
            <button
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => handleEdit(emp.id)}
            >
              Edit
            </button>
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => handleDelete(emp.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
