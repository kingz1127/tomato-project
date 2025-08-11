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
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [debugInfo, setDebugInfo] = useState("");
  const productsPerPage = 10;

  // Load products from localStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem("products");
      console.log("Raw localStorage data:", storedProducts);

      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        console.log("Parsed products:", parsedProducts);
        setProducts(parsedProducts);
        setDebugInfo(
          `Loaded ${parsedProducts.length} products from localStorage`
        );
      } else {
        console.log("No products found in localStorage");
        setDebugInfo("No products found in localStorage");
      }
    } catch (e) {
      console.error("Error loading products from localStorage", e);
      setDebugInfo(`Error loading: ${e.message}`);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      try {
        localStorage.setItem("products", JSON.stringify(products));
        console.log("Saved products to localStorage:", products);
        setDebugInfo(`Saved ${products.length} products to localStorage`);
      } catch (e) {
        console.error("Error saving to localStorage:", e);
        setDebugInfo(`Error saving: ${e.message}`);
      }
    }
  }, [products]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (
      !form.name ||
      !form.image ||
      !form.price ||
      !form.quantity ||
      !form.description
    ) {
      alert("Please fill all fields");
      return;
    }

    let updatedProducts;
    if (editIndex !== null) {
      // Update existing product
      updatedProducts = [...products];
      updatedProducts[editIndex] = { ...form, id: Date.now() }; // Add unique ID
    } else {
      // Add new product with unique ID
      updatedProducts = [...products, { ...form, id: Date.now() }];
    }

    setProducts(updatedProducts);
    setForm({ name: "", image: "", price: "", quantity: "", description: "" });
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
    }
  };

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div style={{ padding: "1rem" }}>
      <div className={styles.AdminDashhead}>
        <h2>Hello, Admin</h2>
        <div className={styles.searchBar}>
          <BiSearch className={styles.iconSearch} />
          <input type="search" placeholder="Search" />
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
          <p>All Products</p>
          <h3 style={{ color: "tomato" }}>{products.length}</h3>
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
            });
            setIsFormOpen(true);
            setEditIndex(null);
          }}
        >
          + Add New Product
        </h4>
      </div>

      <table
        className={stylesProd.table}
        // border="1"
        // cellPadding="8"
        // style={{ width: "90%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Product Description</th>
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
                  style={{ width: "30px", height: "30px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/50x50?text=No+Image";
                  }}
                />
              </td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              <td>
                <button
                  onClick={() => handleEdit(indexOfFirstProduct + index)}
                  style={{
                    marginRight: "5px",
                    padding: "5px 10px",
                    // backgroundColor: "#354bdcff",
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
                    // backgroundColor: "#dc3545",
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
          {products.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No products available. Add some products to get started!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
      <p>
        showing {currentPage} to 10 of {totalPages} pages
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
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              minWidth: "400px",
              maxWidth: "500px",
            }}
          >
            <h3>{editIndex !== null ? "Edit Product" : "Add Product"}</h3>
            <div style={{ marginBottom: "15px" }}>
              <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <input
                name="price"
                placeholder="Price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <input
                name="quantity"
                placeholder="Quantity"
                type="number"
                value={form.quantity}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <input
                name="description"
                placeholder="Description"
                type="text"
                value={form.description}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
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
