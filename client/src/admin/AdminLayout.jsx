import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `block px-4 py-3 rounded ${location.pathname === path
      ? "bg-black text-white"
      : "hover:bg-gray-200"
    }`;

  // LOGOUT LOGIC (Navbar जैसा)
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-gray-100 p-5 md:p-6 border-b md:border-r md:border-b-0">

        <h2 className="text-lg md:text-xl font-bold mb-6 md:mb-8">
          ADMIN PANEL
        </h2>

        <nav className="grid grid-cols-2 md:grid-cols-1 gap-2">

          <Link
            to="/admin/products"
            className={`${linkClass("/admin/products")} text-black`}
          >
            Product Management
          </Link>

          <Link
            to="/admin/payments"
            className={`${linkClass("/admin/payments")} text-black`}
          >
            Payment Records
          </Link>

          <Link
            to="/admin/orders"
            className={`${linkClass("/admin/orders")} text-black`}
          >
            Orders Record
          </Link>

          <Link
            to="/admin/ai-records"
            className={`${linkClass("/admin/ai-records")} text-black`}
          >
            AI Behavior Logs
          </Link>

          <Link
            to="/admin/services"
            className={`${linkClass("/admin/services")} text-black`}
          >
            Services / Settings
          </Link>

          <Link
            to="/admin/analytics"
            className={`${linkClass("/admin/analytics")} text-black`}
          >
            Analytics Dashboard
          </Link>

          <Link
            to="/admin/contacts"
            className={`${linkClass("/admin/contacts")} text-black`}
          >
            Contact Messages
          </Link>

          <Link
            to="/admin/users"
            className={`${linkClass("/admin/users")} text-black`}
          >
            Users
          </Link>

          {/* NEW LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="block px-4 py-3 rounded text-left text-black hover:bg-red-100"
          >
            Logout
          </button>

        </nav>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 sm:p-6 md:p-10">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;