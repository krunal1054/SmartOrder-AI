import Navbar from "../components/Navbar";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Product() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const passedProduct = location.state?.product;

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // 🔥 START TIME FOR IMPULSE CHECK
  const [startTime] = useState(Date.now());

  // 🔥 USER ACTION TRACKING
  const [actions, setActions] = useState([]);

  const trackAction = (action) => {
    setActions((prev) => [...prev, action]);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (passedProduct) {
        setProduct(passedProduct);
      } else {
        try {
          const res = await fetch(`http://localhost:5000/api/products`);
          const data = await res.json();
          const found = data.find((p) => p._id === id);
          setProduct(found);
        } catch (error) {
          console.log("Product Fetch Error:", error);
        }
      }
    };

    fetchProduct();
  }, [passedProduct, id]);

  if (!product) return <div className="p-6 sm:p-10">Loading...</div>;

  const imageSrc = product.image?.startsWith("/uploads")
    ? `http://localhost:5000${product.image}`
    : product.image;

  // ===============================
  // 🔥 BEHAVIOR SAVE (AI ENGINE)
  // ===============================
  const saveBehavior = async () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    // 🔥 IMPULSE SCORE
    let impulseScore = 0;

    if (timeSpent < 10) impulseScore = 80;
    else if (timeSpent < 30) impulseScore = 40;
    else impulseScore = 10;

    // 🔥 COMPATIBILITY SCORE
    let compatibilityScore = 0;

    if (actions.includes("change_color")) compatibilityScore += 20;
    if (actions.includes("change_size")) compatibilityScore += 20;
    if (actions.includes("quantity_change")) compatibilityScore += 20;
    if (actions.includes("view_image")) compatibilityScore += 20;

    const finalScore = compatibilityScore - impulseScore;

    // 🔥 DECISION ENGINE
    let decisionTag = "Rational Purchase";

    if (finalScore < 0) decisionTag = "Impulse Purchase";
    else if (finalScore < 30) decisionTag = "Moderate Decision";

    try {
      await fetch("http://localhost:5000/api/behavior/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id || product.id,
          productName: product.name,
          colorSelected: selectedColor,
          sizeSelected: selectedSize,
          quantity: quantity,
          action: "added_to_cart",
          timeSpent: timeSpent,
          impulseScore,
          compatibilityScore,
          finalScore,
          decisionTag,
        }),
      });
    } catch (error) {
      console.log("Behavior Save Failed:", error);
    }
  };

  const handleAddToCart = async () => {
    await saveBehavior();

    addToCart({
      ...product,
      image: imageSrc,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    });

    navigate("/cart");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {/* IMAGE SECTION */}
        <div>
          <div
            className="border rounded-xl p-4 sm:p-6 bg-gray-50"
            onClick={() => trackAction("view_image")}
          >
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-[300px] sm:h-[380px] md:h-[420px] object-contain"
            />
          </div>

          <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border rounded-md p-2 cursor-pointer hover:shadow"
              >
                <img
                  src={imageSrc}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div>

          <h1 className="text-2xl sm:text-3xl font-semibold mb-3">
            {product.name}
          </h1>

          <p className="text-xl sm:text-2xl font-medium mb-2">
            ₹{product.price}
          </p>

          <p className="text-green-600 font-medium mb-5">
            ✔ In Stock
          </p>

          <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            Experience effortless style. Crafted from breathable, soft premium cotton.
            Ideal for everyday comfort and layering.
          </p>

          <h3 className="font-semibold mb-2">Color</h3>
          <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
            {["Blue", "Black", "White"].map((color) => (
              <div
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  trackAction("change_color");
                }}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 cursor-pointer transition ${
                  selectedColor === color
                    ? "border-black scale-110"
                    : "border-gray-300"
                }`}
                style={{
                  backgroundColor:
                    color === "Blue"
                      ? "#3b82f6"
                      : color === "Black"
                      ? "#000"
                      : "#e5e5e5",
                }}
              />
            ))}
          </div>

          <h3 className="font-semibold mb-2">Size</h3>
          <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  trackAction("change_size");
                }}
                className={`px-4 sm:px-5 py-2 border rounded-md text-sm sm:text-base ${
                  selectedSize === size ? "bg-black text-white" : "bg-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <h3 className="font-semibold mb-2">Quantity</h3>
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
            <button
              onClick={() => {
                setQuantity(quantity > 1 ? quantity - 1 : 1);
                trackAction("quantity_change");
              }}
              className="border px-4 py-1"
            >
              −
            </button>

            <span className="text-lg">{quantity}</span>

            <button
              onClick={() => {
                setQuantity(quantity + 1);
                trackAction("quantity_change");
              }}
              className="border px-4 py-1"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 sm:py-4 text-base sm:text-lg rounded-md hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>

        </div>

      </div>
    </>
  );
}

export default Product;