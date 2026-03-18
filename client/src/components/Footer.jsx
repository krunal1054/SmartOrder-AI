import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 mt-20">

      {/* TOP SOCIAL BAR */}
      <div className="bg-purple-600 text-white py-4 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-center md:text-left">
        <p className="text-sm">
          Get connected with us on social networks!
        </p>

        <div className="flex gap-6 text-lg justify-center">

          <a href="#" className="hover:scale-125 transition duration-300">
            <FaFacebookF />
          </a>

          <a href="#" className="hover:scale-125 transition duration-300">
            <FaTwitter />
          </a>

          <a href="#" className="hover:scale-125 transition duration-300">
            <FaGoogle />
          </a>

          <a href="#" className="hover:scale-125 transition duration-300">
            <FaLinkedinIn />
          </a>

          <a href="#" className="hover:scale-125 transition duration-300">
            <FaInstagram />
          </a>

        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* COMPANY */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">
            SmartOrder AI
          </h3>

          <p className="text-sm leading-relaxed">
            SmartOrder AI is an intelligent e-commerce platform that
            uses AI-driven decision intelligence to reduce impulse buying
            and improve customer experience.
          </p>
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4 md:ml-8">
            Products
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/blue" className="text-white no-underline hover:text-purple-400">
                Blue Collection
              </Link>
            </li>

            <li>
              <Link to="/black" className="text-white no-underline hover:text-purple-400">
                Black Collection
              </Link>
            </li>

            <li>
              <Link to="/white" className="text-white no-underline hover:text-purple-400">
                White Collection
              </Link>
            </li>

            <li>
              <Link to="/cart" className="text-white no-underline hover:text-purple-400">
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4 md:ml-8">
            Useful Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-white no-underline hover:text-purple-400">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact" className="text-white no-underline hover:text-purple-400">
                Contact Us
              </Link>
            </li>

            <li>
              <Link to="/login" className="text-white no-underline hover:text-purple-400">
                Admin Login
              </Link>
            </li>

            <li>
              <Link to="/dashboard" className="text-white no-underline hover:text-purple-400">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4 md:ml-8">
            Contact
          </h3>

          <ul className="space-y-3 text-sm">
            <li>📍 Ahmedabad, Gujarat, India</li>
            <li>✉ support@smartorderai.com</li>
            <li>📞 +91 9876543210</li>
            <li>📊 AI Decision Support System</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="bg-[#0b1220] text-center py-4 text-sm px-4">
        © {new Date().getFullYear()} SmartOrder AI | All Rights Reserved
      </div>

    </footer>
  );
}

export default Footer;