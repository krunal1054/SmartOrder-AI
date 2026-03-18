import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "CLASSIC CREWNECK - SKY BLUE",
        price: 799,
        image: "/images/blue tshirt 1.jpg",
      },
      {
        id: 2,
        name: "PREMIUM COTTON - MIDNIGHT BLACK",
        price: 899,
        image: "/images/black tshirt 1.jpg",
      },
      {
        id: 3,
        name: "EVERYDAY ESSENTIAL - CLOUD WHITE",
        price: 699,
        image: "/images/white tshirt 1.jpg",
      },
      {
        id: 4,
        name: "MINIMALIST TEE - NAVY BLUE",
        price: 749,
        image: "/images/blue tshirt 2.jpg",
      },
    ]);
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] overflow-hidden">
        <img
          src="/images/home1.png"
          alt="SmartOrder Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-8 md:px-12">
          <div className="text-white max-w-md">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4">
              SHOP SMARTER.
              <br />
              BUY BETTER.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-6">
              The first AI-powered platform for curated Unisex T-Shirts
              that guides your decision before you order.
            </p>

            <button className="bg-white text-black px-5 sm:px-6 py-2 text-xs sm:text-sm font-medium rounded hover:bg-gray-200 transition">
              EXPLORE CURATED COLLECTION
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-100 py-8 border-b px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xs tracking-widest text-gray-500 mb-6">
            HOW SMARTORDER AI WORKS
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 text-sm">
            <div>
              <p className="font-semibold">1. BROWSE</p>
              <p className="text-gray-500">Limited to Blue, Black, White</p>
            </div>

            <span className="hidden md:block">→</span>

            <div>
              <p className="font-semibold">2. ADD TO CART</p>
              <p className="text-gray-500">Behavior Tracking Starts</p>
            </div>

            <span className="hidden md:block">→</span>

            <div>
              <p className="font-semibold">3. INTELLIGENT CHECK</p>
              <p className="text-gray-500">AI helps avoid impulse buys</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="border rounded-lg p-6 h-fit">
          <h3 className="font-semibold mb-4">CATEGORY</h3>
          <p className="text-gray-600 mb-6">Unisex T-Shirt</p>

          <h4 className="font-semibold mb-3">COLORS</h4>

          <div className="space-y-2 text-sm text-gray-600">
            <p>● Blue</p>
            <p>● Black</p>
            <p>● White</p>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-40 sm:h-44 w-full object-cover mb-3"
              />

              <span className="text-xs bg-black text-white px-2 py-1">
                AI RECOMMENDED
              </span>

              <h3 className="mt-3 text-sm font-semibold">{p.name}</h3>

              <p className="text-gray-500 text-sm mb-3">₹{p.price}</p>

              <Link
                to={`/product/${p.id}`}
                state={{ product: p }}
              >
                <button className="border w-full py-2 text-sm hover:bg-black hover:text-white transition">
                  VIEW DETAILS
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 py-6 border-t px-4">
        Avoid Buyer’s Regret — Let AI Validate Your Choice.
      </footer>
    </>
  );
}

export default Home;