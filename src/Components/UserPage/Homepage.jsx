import { useEffect, useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import Footer from "../LandingPage/Footer";
import Header from "../LandingPage/header";
import ExploreMenu from "../LandingPage/ExploreMenu";
import AppDownload from "../LandingPage/AppDownload";
import stylesp from "./Homepage.module.css";
import NavbarHome from "./NavbarHome";

import { useStoreContext } from "../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

export default function Homepage() {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const [category, setCategory] = useState("All");

  const { addToCart, cartItems, getTotalCartAmount } = useStoreContext();
  const navigate = useNavigate();

  // Load profile + products from localStorage
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("loggedInUser"));
    setProfile(storedProfile);

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // ✅ Filter products based on category
  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        );

  // Pagination calculations (done on filtered products)
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
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "5px",
  };

  // ✅ Buy Now logic (untouched)
  const handleBuyNow = (product) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      localStorage.setItem(
        `buyNow_${loggedInUser.email}`,
        JSON.stringify({ ...product, quantity: 1 })
      );
      navigate("/placeorder");
    } else {
      alert("Please log in first!");
    }
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
      {/* Pass category + setCategory to ExploreMenu */}
      <ExploreMenu category={category} setCategory={setCategory} />

      {filteredProducts.length > 0 ? (
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
              <button
                onClick={() => {
                  addToCart(p);
                  alert(`${p.name} added to cart!`);
                }}
                className={stylesp.addtoCart}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(p)}
                className={stylesp.buyNow}
              >
                Buy now
              </button>
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
        showing {currentPage} to {productsPerPage} of {totalPages} pages
      </p>
      <AppDownload />
      <Footer />
    </div>
  );
}
