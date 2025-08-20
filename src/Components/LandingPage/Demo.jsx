import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./header";
import styles from "./Demo.module.css";
import ExploreMenu from "./ExploreMenu";
import Footer from "./Footer";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import AppDownload from "./AppDownload";

export default function Demo() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All"); // ✅ Category state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const cardStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
    listStyle: "none",
    margin: 0,
  };

  const productCardStyles = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  };

  const imageStyles = {
    width: "100%",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  const priceStyles = {
    fontSize: "1.7rem",
    fontWeight: "bold",
    color: "#007bff",
    marginTop: "5px",
  };

  const quantityStyles = {
    fontSize: "1.5rem",
    color: "#666",
    marginTop: "5px",
  };

  return (
    <div className={styles.Demo}>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Header />

      {/* Pass category state to ExploreMenu */}
      <ExploreMenu category={category} setCategory={setCategory} />

      {currentProducts.length > 0 ? (
        <ul style={cardStyles}>
          {currentProducts.map((p, index) => (
            <li key={p.id || index} style={productCardStyles}>
              <img
                src={p.image}
                alt={p.name}
                style={imageStyles}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=No+Image+Available";
                }}
              />
              <h2 style={{ margin: "10px 0 5px 0", color: "#333" }}>
                {p.name}
              </h2>
              <p style={priceStyles}>${p.price}</p>
              <p style={quantityStyles}>Quantity: {p.quantity}</p>
              <p>{p.description}</p>

              <Link to="/signup">
                <button>Add to Cart</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            color: "#666",
          }}
        >
          <p>No products available</p>
          <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
            Products added in the admin panel will appear here.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pageination}>
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
            {<MdOutlineNavigateBefore style={{ fontSize: "3rem" }} />}
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
            {<MdOutlineNavigateNext style={{ fontSize: "3rem" }} />}
          </button>
        </div>
      )}
      <p className={styles.pageinationp}>
        showing {currentPage} to {productsPerPage} of {totalPages} pages
      </p>

      <AppDownload />
      <Footer />
    </div>
  );
}
