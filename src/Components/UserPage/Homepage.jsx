import { useEffect, useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import Footer from "../LandingPage/Footer";
import Header from "../LandingPage/header";
import ExploreMenu from "../LandingPage/ExploreMenu";
import AppDownload from "../LandingPage/AppDownload";
import stylesp from "./Homepage.module.css";
import NavbarHome from "./NavbarHome";

import { useStoreContext } from "../context/StoreContext";

export default function Homepage() {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const { addToCart } = useStoreContext();

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("loggedInUser"));
    setProfile(storedProfile);

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
    height: "200px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  const priceStyles = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#007bff",
    marginTop: "5px",
  };

  const quantityStyles = {
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "5px",
  };

  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <NavbarHome />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2 style={{ color: "#333" }}>
        Welcome{" "}
        {profile ? (
          <span style={{ color: "#007bff" }}>
            {profile.firstName + " " + profile.lastName}
          </span>
        ) : (
          <span>Guest</span>
        )}
      </h2>
      <br />
      <Header />
      <ExploreMenu />

      {products.length > 0 ? (
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
              <button onClick={() => addToCart(p)}>Add to Cart</button>
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
        <div className={stylesp.pageination}>
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
      <p className={stylesp.pageinationp}>
        showing {currentPage} to 16 of {totalPages} pages
      </p>
      <AppDownload />
      <Footer />
    </div>
    // )}
    // </div>
  );
}
