import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdminLoggedIn = localStorage.getItem("adminToken");

  let user = null;
  const storedUser = localStorage.getItem("adminUser");

  if (storedUser && storedUser !== "undefined") {
    try {
      user = JSON.parse(storedUser);
    } catch {
      user = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/");
    window.location.reload();
  };

  const activeClass = (path) =>
    location.pathname === path
      ? "text-black font-semibold"
      : "text-gray-600 hover:text-black";

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="font-bold text-lg no-underline">
          SmartOrder AI
          <p className="text-xs text-gray-500">
            AI-ASSISTED DECISION INTELLIGENCE
          </p>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAV LINKS */}
        <div
          className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 
          absolute md:static top-16 left-0 w-full md:w-auto 
          md:bg-transparent px-6 md:px-0 py-4 md:py-0 
          md:shadow-none transition-all ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >

          <Link to="/Home" className={activeClass("/Home")}>
            SHOP
          </Link>

          <Link to="/blue" className={activeClass("/blue")}>
            Blue
          </Link>

          <Link to="/black" className={activeClass("/black")}>
            Black
          </Link>

          <Link to="/white" className={activeClass("/white")}>
            White
          </Link>

          <Link to="/about" className={activeClass("/about")}>
            About
          </Link>

          <Link to="/contact" className={activeClass("/contact")}>
            Contact
          </Link>

          <Link to="/dashboard" className={activeClass("/dashboard")}>
            AI
          </Link>

          <Link to="/cart" className={activeClass("/cart")}>
            CART
          </Link>

          {!isAdminLoggedIn && (
            <>
              <Link to="/login" className={activeClass("/login")}>
                Login
              </Link>

              <Link to="/register" className={activeClass("/register")}>
                Register
              </Link>

              <Link to="/login" className={activeClass("/login")}>
                ADMIN
              </Link>
            </>
          )}

          {isAdminLoggedIn && (
            <>
              <Link to="/profile" className={activeClass("/profile")}>
                {user?.name || "Profile"}
              </Link>

              <Link to="/admin" className={activeClass("/admin")}>
                CONTROL HUB
              </Link>

              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-black text-left"
              >
                LOGOUT
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;