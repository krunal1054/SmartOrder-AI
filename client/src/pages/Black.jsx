import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Black() {
  const navigate = useNavigate();
  const [dbProducts, setDbProducts] = useState([]);

  const blackProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 100,
    name: `PREMIUM BLACK TEE - ${i + 1}`,
    price: 699 + i * 20,
    image: `/images/black tshirt ${i + 1}.jpg`,
    color: "Black",
  }));

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      const filtered = data.filter(p => p.color === "Black");
      setDbProducts(filtered);
    };
    fetchData();
  }, []);

  const handleView = (product) => {
    navigate(`/product/${product.id || product._id}`, { state: { product } });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <h1 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
          Black T-Shirts Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">

          {/* EXISTING STATIC PRODUCTS */}
          {blackProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 sm:h-56 md:h-60 w-full object-contain mb-4"
              />

              <span className="bg-black text-white text-xs px-2 py-1">
                AI RECOMMENDED
              </span>

              <h2 className="mt-3 font-medium text-sm sm:text-base">
                {product.name}
              </h2>

              <p className="text-gray-700 mt-1 text-sm sm:text-base">
                ₹{product.price}
              </p>

              <button
                onClick={() => handleView(product)}
                className="mt-4 border w-full py-2 text-sm hover:bg-gray-100"
              >
                VIEW DETAILS
              </button>
            </div>
          ))}

          {/* ADMIN ADDED PRODUCTS */}
          {dbProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 hover:shadow-lg transition bg-gray-50"
            >
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="h-48 sm:h-56 md:h-60 w-full object-contain mb-4"
              />

              <span className="bg-green-600 text-white text-xs px-2 py-1">
                AI RECOMMENDED
              </span>

              <h2 className="mt-3 font-medium text-sm sm:text-base">
                {product.name}
              </h2>

              <p className="text-gray-700 mt-1 text-sm sm:text-base">
                ₹{product.price}
              </p>

              <button
                onClick={() => handleView(product)}
                className="mt-4 border w-full py-2 text-sm hover:bg-gray-100"
              >
                VIEW DETAILS
              </button>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default Black;