import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";
import styles from "./AdminDash.module.css";
import stylesProd from "./Product.module.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ for search input
  const productsPerPage = 10;

  // Load products from localStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) setProducts(JSON.parse(storedProducts));
    } catch (e) {
      console.error("Error loading products from localStorage", e);
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (
      !form.name ||
      !form.image ||
      !form.price ||
      !form.quantity ||
      !form.description ||
      !form.category
    ) {
      alert("Please fill all fields including category");
      return;
    }

    let updatedProducts;

    if (editIndex !== null) {
      // Update existing product
      updatedProducts = [...products];
      updatedProducts[editIndex] = { ...form, id: products[editIndex].id };
    } else {
      // Add new product at the start
      updatedProducts = [{ ...form, id: Date.now() }, ...products];
    }

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setForm({
      name: "",
      image: "",
      price: "",
      quantity: "",
      description: "",
      category: "",
    });
    setIsFormOpen(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setForm(products[index]);
    setEditIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };

  // ✅ Search filter (by name OR category)
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div style={{ padding: "1rem" }}>
      <div className={styles.AdminDashhead}>
        <h2>Hello, Admin</h2>
        <div className={styles.searchBar}>
          <BiSearch className={styles.iconSearch} />
          <input
            type="search"
            placeholder="Search by name or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // ✅ handle search
          />
        </div>
        <div className={styles.mailNot}>
          <FiMail className={styles.icons} />
          <IoIosNotificationsOutline className={styles.icons} />
          <div className={styles.iconsAdmin}>
            <GrUserAdmin className={styles.icons} style={{ color: "white" }} />
          </div>
        </div>
      </div>

      <div className={stylesProd.allProdAdd}>
        <div className={stylesProd.allProdAddph3}>
          <p style={{ fontSize: "2rem" }}>All Products</p>
          <h3 style={{ color: "tomato" }}>{filteredProducts.length}</h3>
        </div>
        <h4
          className={stylesProd.allProdAddh3}
          style={{ cursor: "pointer", color: "rgba(61, 83, 228, 1)" }}
          onClick={() => {
            setForm({
              name: "",
              image: "",
              price: "",
              quantity: "",
              description: "",
              category: "",
            });
            setIsFormOpen(true);
            setEditIndex(null);
          }}
        >
          + Add New Product
        </h4>
      </div>

      <table className={stylesProd.table}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product.id || index}>
              <td>{product.name}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/50x50?text=No+Image";
                  }}
                />
              </td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              <td>
                <button
                  onClick={() => handleEdit(indexOfFirstProduct + index)}
                  style={{
                    marginRight: "5px",
                    padding: "5px 10px",
                    color: "#354bdcff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  <BiEditAlt />
                </button>
                <button
                  onClick={() => handleDelete(indexOfFirstProduct + index)}
                  style={{
                    color: "#dc3545",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(63, 109, 235, 1)",
              height: "2.5rem",
              width: "5rem",
              color: "white",
              borderRadius: "3px",
            }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <MdOutlineNavigateBefore />
          </button>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(58, 106, 236)",
              height: "2.5rem",
              width: "2.5rem",
              color: "white",
              borderRadius: "3px",
            }}
          >
            {currentPage}
          </span>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(58, 106, 236)",
              height: "2.5rem",
              width: "5rem",
              color: "white",
              borderRadius: "3px",
            }}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      )}
      <p>
        Showing page {currentPage} of {totalPages}
      </p>

      {/* Form Modal */}
      {isFormOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            // className={styles.back}
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              minWidth: "400px",
              maxWidth: "500px",
              // display: "flex",
              // flexDirection: "column",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>
              {editIndex !== null ? "Edit Product" : "Add Product"}
            </h3>
            <div style={{ marginBottom: "15px" }} className={styles.back}>
              <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "3.5rem",
                  paddingLeft: "3px",
                  borderRadius: "4px",
                  fontSize: "1.7rem",
                  marginBottom: "1rem",
                }}
              />
              <br />
              <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "3.5rem",
                  paddingLeft: "3px",
                  borderRadius: "4px",
                  fontSize: "1.7rem",
                  marginBottom: "1rem",
                }}
              />
              <br />
              <input
                name="price"
                placeholder="Price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "3.5rem",
                  paddingLeft: "3px",
                  borderRadius: "4px",
                  fontSize: "1.7rem",
                  marginBottom: "1rem",
                }}
              />
              <br />
              <input
                name="quantity"
                placeholder="Quantity"
                type="number"
                value={form.quantity}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "3.5rem",
                  paddingLeft: "3px",
                  borderRadius: "4px",
                  fontSize: "1.7rem",
                  marginBottom: "1rem",
                }}
              />
              <br />
              <input
                name="description"
                placeholder="Description"
                type="text"
                value={form.description}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "3.5rem",
                  paddingLeft: "3px",
                  borderRadius: "4px",
                  fontSize: "1.7rem",
                  marginBottom: "1rem",
                }}
              />
              <br />
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "3.5rem",
                  paddingLeft: "3px",
                  borderRadius: "4px",
                  fontSize: "1.7rem",
                  marginBottom: "1rem",
                }}
              >
                <option value="">Select Category</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={handleSave}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setIsFormOpen(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
