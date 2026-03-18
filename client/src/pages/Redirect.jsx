import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function Redirect() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="p-6 sm:p-10 text-lg sm:text-xl text-center">
          No Product Found
        </div>
      </>
    );
  }

  const handleAmazonRedirect = () => {
    window.open(
      "https://www.amazon.in/",
      "_blank"
    );
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
          Affiliate Redirect
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">

          {/* LEFT PRODUCT */}
          <div className="bg-white border rounded-lg p-4 sm:p-6 text-center shadow-sm">
            <img
              src={product.image}
              className="w-56 sm:w-64 md:w-72 mx-auto object-contain"
              alt={product.name}
            />

            <p className="mt-4 font-medium text-sm sm:text-base">
              {product.name}
            </p>
          </div>

          {/* RIGHT VALIDATION PANEL */}
          <div className="space-y-5 sm:space-y-6">

            <h2 className="text-lg sm:text-xl font-semibold">
              SMART ORDER VALIDATION COMPLETE.
            </h2>

            {/* NEED VS IMPULSE */}
            <div className="border rounded-lg p-4 sm:p-5 bg-white shadow-sm">
              <p className="font-semibold text-green-700 mb-2">
                ✔ Thoughtful Decision Confirmed
              </p>

              <p className="text-sm text-gray-600">
                Based on comparison time and viewing depth,
                this selection appears well-considered.
              </p>

              <p className="text-sm mt-2">
                <b>Need Signal:</b> High
              </p>
            </div>

            {/* COMPATIBILITY */}
            <div className="border rounded-lg p-4 sm:p-5 bg-white shadow-sm">
              <p className="font-semibold mb-2">
                YOUR DECISION ALIGNS.
              </p>

              <ul className="text-sm text-gray-600 space-y-1">
                <li>✔ Color Match</li>
                <li>✔ Style Match</li>
                <li>✔ Price Comfort</li>
              </ul>
            </div>

            {/* ACTION BUTTON */}
            <div className="border rounded-lg p-5 sm:p-6 bg-gray-50 text-center shadow-sm">

              <button
                onClick={handleAmazonRedirect}
                className="bg-black text-white px-6 sm:px-8 py-3 w-full hover:bg-gray-800 transition"
              >
                CONTINUE TO SECURE AMAZON CHECKOUT
              </button>

              <p className="text-xs sm:text-sm text-gray-500 mt-3">
                You will be redirected to Amazon only after clicking.
              </p>

              <button
                onClick={() => navigate("/cart")}
                className="mt-4 px-6 sm:px-8 py-3 w-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              >
                BACK TO SHOPPING BAG
              </button>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Redirect;