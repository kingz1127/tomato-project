import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Demo() {
  const [products, setProducts] = useState([]);

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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div>This is my Landing page</div>
      <p>login to join us.</p>
      <Link
        to="/signup"
        style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
      >
        <p>Sign up!</p>
      </Link>

      <h3 style={{ marginBottom: "20px", color: "#333" }}>
        Available Products
      </h3>

      {products.length > 0 ? (
        <ul style={cardStyles}>
          {products.map((p, index) => (
            <li
              key={p.id || index}
              style={productCardStyles}
              onMouseEnter={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
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
              <h4 style={{ margin: "10px 0 5px 0", color: "#333" }}>
                {p.name}
              </h4>
              <p style={priceStyles}>${p.price}</p>
              <p style={quantityStyles}>Quantity: {p.quantity}</p>
              <p>{p.description}</p>
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
    </div>
  );
}
