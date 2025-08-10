import { Link } from "react-router-dom";

export default function Demo() {
  return (
    <div>
      <div>This is my Landing page</div>
      <p>login to join us.</p>
      <Link
        to="/signup"
        style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
      >
        <p>Sign up!</p>
      </Link>
    </div>
  );
}
