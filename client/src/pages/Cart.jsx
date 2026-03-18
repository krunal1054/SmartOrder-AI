import Navbar from "../components/Navbar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  if (!cartItems.length) {
    return (
      <>
        <Navbar />
        <div className="p-6 sm:p-10 text-lg sm:text-xl">Cart is empty</div>
      </>
    );
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
          Shopping Cart
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-12 sm:pb-16">

        {/* LEFT SIDE PRODUCTS */}
        <div className="md:col-span-2 space-y-6">

          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 shadow-sm"
            >

              <img
                src={item.image}
                className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-base sm:text-lg">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  Color: {item.color}
                </p>

                <p className="text-sm text-gray-600">
                  Size: {item.size}
                </p>

                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="font-semibold text-base sm:text-lg">
                ₹{item.price * item.quantity}
              </div>

            </div>
          ))}

        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="bg-white border rounded-lg p-5 sm:p-6 shadow-sm h-fit">

          <div className="flex justify-between mb-3 text-sm sm:text-base">
            <span>Subtotal ({cartItems.length} items)</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-3 text-sm sm:text-base">
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-6 text-gray-500 text-sm sm:text-base">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="mb-6" />

          <div className="flex justify-between font-semibold text-base sm:text-lg mb-6">
            <span>Estimated Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={() =>
              navigate("/decisions", { state: { products: cartItems } })
            }
            className="bg-black text-white w-full py-3 mb-3 text-sm sm:text-base hover:bg-gray-800 transition"
          >
            PROCEED TO INTELLIGENT VALIDATION
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="border border-black w-full py-3 text-sm sm:text-base hover:bg-gray-100 transition"
          >
            PROCESS TO CHECKOUT
          </button>

        </div>

      </div>
    </>
  );
}

export default Cart;