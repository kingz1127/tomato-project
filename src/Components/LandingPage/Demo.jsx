import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./header";
import styles from "./Demo.module.css";
import ExploreMenu from "./ExploreMenu";
import Footer from "./Footer";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export default function Demo() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const cardStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
    listStyle: "none",
    margin: 0,
    position: "sticky",
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
    // height: "50px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  const priceStyles = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "tomato",
    marginTop: "5px",
  };

  const quantityStyles = {
    fontSize: "1.5rem",
    color: "#08bd11ff",
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

      {/* <h3 style={{ marginBottom: "20px", color: "#333" }}>
        Available Products
      </h3> */}
      <ExploreMenu />

      {products.length > 0 ? (
        <ul style={cardStyles}>
          {currentProducts.map((p, index) => (
            <li
              key={p.id || index}
              style={productCardStyles}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
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
              <button>Add to Cart</button>
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
      <p>
        showing {currentPage} to 16 of {totalPages} pages
      </p>

      <Footer />
    </div>
  );
}
