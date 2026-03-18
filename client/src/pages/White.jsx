import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function White() {
  const navigate = useNavigate();
  const [dbProducts, setDbProducts] = useState([]);

  const imageList = [
    "white tshirt 1.jpg",
    "white tshirt 2.jpg",
    "white tshirt 3.jpg",
    "white tshirt 4.jpg",
    "white tshirt 6.jpg",
    "white tshirt 7.jpg",
    "white tshirt 8.jpg",
    "white tshirt 9.jpg",
    "white tshirt 10.jpg.webp",
    "white tshirt 11.jpg",
    "white tshirt 12.jpg",
    "white tshirt 13.jpg",
    "white tshirt 14.jpg.webp",
    "white tshirt 15.jpg",
    "white tshirt 16.jpg",
    "white tshirt 17.jpg",
    "white tshirt 18.jpg",
    "white tshirt 19.jpg",
  ];

  const whiteProducts = imageList.map((img, i) => ({
    id: i + 300,
    name: `CLOUD WHITE TEE - ${i + 1}`,
    price: 699 + i * 18,
    image: `/images/${img}`,
    color: "White",
  }));

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      const filtered = data.filter((p) => p.color === "White");
      setDbProducts(filtered);
    };
    fetchData();
  }, []);

  const handleView = (product) => {
    navigate(`/product/${product.id || product._id}`, {
      state: { product },
    });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <h1 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
          White T-Shirts Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">

          {/* EXISTING STATIC PRODUCTS */}
          {whiteProducts.map((product) => (
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

export default White;