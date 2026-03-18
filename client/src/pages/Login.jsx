import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import api from "../services/api";
import Footer from "../components/Footer";
import "../index.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("All fields are required");
    }

    try {
      const res = await api.loginAdmin({ email, password });

      if (!res.token) {
        return setError(res.message || "Login failed");
      }

      localStorage.setItem("adminToken", res.token);
      localStorage.setItem("adminUser", JSON.stringify(res.user));

      navigate("/profile");

    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      <form
        onSubmit={login}
        className="bg-white w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl
                   transition-all duration-500 md:hover:scale-105"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* EMAIL FIELD */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border pl-4 sm:pl-5 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* PASSWORD FIELD */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border pl-4 sm:pl-5 pr-10 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <div
            className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500
                     text-white py-3 rounded-full font-semibold
                     hover:opacity-90 transition duration-300"
        >
          LOGIN
        </button>

        {/* SOCIAL LOGIN UI */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Or login with
        </p>

        <div className="flex justify-center gap-4 sm:gap-5 mt-4">
          <SocialIcon icon={<FaFacebookF />} bg="bg-blue-600" />
          <SocialIcon icon={<FaTwitter />} bg="bg-sky-400" />
          <SocialIcon icon={<FaInstagram />} bg="bg-pink-500" />
        </div>

        {/* CREATE ACCOUNT */}
        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 font-semibold">
            Create Account
          </Link>
        </p>

      </form>

    </div>
    
  );
}

function SocialIcon({ icon, bg }) {
  return (
    <div
      className={`${bg} text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center 
                  justify-center cursor-pointer md:hover:scale-110 
                  transition-transform duration-300 shadow-md`}
    >
      {icon}

    </div>

  );
              <Footer />

}