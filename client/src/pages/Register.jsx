import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await api.registerAdmin({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res.message) {
        return setError(res.message);
      }

      navigate("/login");

    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      <form
        onSubmit={register}
        className="bg-white w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl
                   transition-all duration-500 md:hover:scale-105"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full border p-3 mb-6 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500
                     text-white py-3 rounded-full font-semibold
                     hover:opacity-90 transition duration-300"
        >
          REGISTER
        </button>

        {/* Divider */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Or register with
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 sm:gap-5 mt-4">
          <SocialIcon icon={<FaFacebookF />} bg="bg-blue-600" />
          <SocialIcon icon={<FaTwitter />} bg="bg-sky-400" />
          <SocialIcon icon={<FaInstagram />} bg="bg-pink-500" />
        </div>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-medium">
            Login
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
}