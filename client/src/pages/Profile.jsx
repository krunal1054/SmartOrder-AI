import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/");
    window.location.reload();
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-600 text-center">
            No User Data Found
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md">

          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
            Admin Profile
          </h2>

          <div className="space-y-5">

            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-semibold text-base sm:text-lg">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold text-base sm:text-lg">
                {user.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2.5 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    </>
  );
}