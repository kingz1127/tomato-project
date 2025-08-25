import { useState, useEffect } from "react";
import styles from "./Billing.module.css";

export default function Billing() {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({
    name: "",
    amount: "",
    date: "",
    category: "Electricity",
    receipt: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 2;

  useEffect(() => {
    const savedBills = JSON.parse(localStorage.getItem("bills")) || [];
    setBills(savedBills);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBill({
          ...newBill,
          receipt: { name: file.name, data: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBill = (e) => {
    e.preventDefault();
    if (
      !newBill.name ||
      !newBill.amount ||
      !newBill.date ||
      !newBill.category ||
      !newBill.receipt
    ) {
      alert("Please fill all fields and upload a receipt.");
      return;
    }

    const updatedBills = [...bills, { ...newBill, id: Date.now() }];
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));

    setNewBill({
      name: "",
      amount: "",
      date: "",
      category: "Electricity",
      receipt: null,
    });
  };

  const handleDownload = (bill) => {
    const link = document.createElement("a");
    link.href = bill.receipt.data;
    link.download = bill.receipt.name;
    link.click();
  };

  const handleDelete = (id) => {
    const updatedBills = bills.filter((bill) => bill.id !== id);
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  // 🔎 Filter bills by search
  const filteredBills = bills.filter((bill) =>
    bill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 Pagination logic
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);
  const totalPages = Math.ceil(filteredBills.length / billsPerPage);

  return (
    <div className={styles.billingContainer}>
      {/* ✅ Bills Count */}
      <h2>My Bills</h2>
      <p>Total bills: {filteredBills.length}</p>
      {/* 🔎 Search */}
      <input
        type="text"
        placeholder="Search bills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchBar}
      />
      {/* ✅ Add Bill Form */}
      <form onSubmit={handleAddBill} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Bill Name"
          value={newBill.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newBill.amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newBill.date}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={newBill.category}
          onChange={handleChange}
          required
        >
          <option value="Electricity">Electricity</option>
          <option value="Inventory">Inventory</option>
          <option value="Tax">Tax</option>
          <option value="Logistics">Logistics</option>
        </select>

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add Bill</button>
      </form>

      {/* ✅ Bills Count */}
      {/* <h2>My Bills</h2>
      <p>Total bills: {filteredBills.length}</p> */}

      {filteredBills.length === 0 ? (
        <p>No bills found.</p>
      ) : (
        <ul className={styles.billList}>
          {currentBills.map((bill) => (
            <li key={bill.id} className={styles.billItem}>
              <div>
                <strong>{bill.name}</strong> - ${bill.amount} on {bill.date}{" "}
                <br />
                <em>Category:</em> {bill.category}
              </div>

              {/* 📷 Show receipt preview */}
              {bill.receipt && bill.receipt.data.startsWith("data:image") && (
                <img
                  src={bill.receipt.data}
                  alt="Receipt"
                  className={styles.receiptPreview}
                />
              )}

              <div className={styles.actions}>
                <button onClick={() => handleDownload(bill)}>
                  Download Receipt
                </button>
                <button onClick={() => handleDelete(bill.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
