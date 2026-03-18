import Navbar from "../components/Navbar";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import jsPDF from "jspdf";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "",
  });

  const [errors, setErrors] = useState({});
  const [aiReports, setAiReports] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  // ===============================
  // AI FETCH
  // ===============================
  useEffect(() => {
    const fetchAIData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/behavior/logs");
        const logs = await res.json();

        const reports = cartItems.map((item) => {
          const productLogs = logs.filter(
            (log) =>
              log.productName?.toLowerCase() === item.name.toLowerCase()
          );

          if (productLogs.length === 0) {
            return {
              productName: item.name,
              decision: "No Data",
              finalScore: 0,
              impulseScore: 0,
              compatibilityScore: 0,
              timeSpent: 0,
            };
          }

          const latest = productLogs[productLogs.length - 1];

          return {
            productName: item.name,
            decision: latest.decisionTag,
            finalScore: latest.finalScore,
            impulseScore: latest.impulseScore,
            compatibilityScore: latest.compatibilityScore,
            timeSpent: latest.timeSpent,
          };
        });

        setAiReports(reports);
      } catch (err) {
        console.log("AI Fetch Error:", err);
      }
    };

    if (cartItems.length > 0) fetchAIData();
  }, [cartItems]);

  // ===============================
  // VALIDATION
  // ===============================
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===============================
  // PDF GENERATION
  // ===============================
  const generatePDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, 210, 28, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.text("Checkout - SmartOrder AI", 14, 17);

    pdf.setFontSize(10);
    pdf.text("AI-Assisted Decision Intelligence Invoice", 14, 23);

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);

    let y = 40;

    pdf.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 140, y);
    y += 12;

    pdf.setFont(undefined, "bold");
    pdf.text("Order Summary", 14, y);
    y += 8;
    pdf.setFont(undefined, "normal");

    cartItems.forEach((item) => {
      pdf.text(`Product: ${item.name}`, 14, y);
      y += 6;

      pdf.text(
        `Color: ${item.color} | Size: ${item.size} | Qty: ${item.quantity}`,
        18,
        y
      );
      y += 6;

      pdf.text(`Price: ₹${item.price * item.quantity}`, 18, y);
      y += 10;
    });

    pdf.line(14, y, 196, y);
    y += 8;

    pdf.setFont(undefined, "bold");
    pdf.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 140, y);
    y += 6;
    pdf.text(`GST (18%): ₹${gst.toFixed(2)}`, 140, y);
    y += 6;
    pdf.setFontSize(13);
    pdf.text(`Total: ₹${total.toFixed(2)}`, 140, y);
    pdf.setFontSize(11);
    y += 15;

    pdf.setFont(undefined, "bold");
    pdf.text("Customer Details", 14, y);
    y += 8;
    pdf.setFont(undefined, "normal");

    pdf.text(`Name: ${formData.firstName} ${formData.lastName}`, 14, y);
    y += 6;
    pdf.text(`Email: ${formData.email}`, 14, y);
    y += 6;
    pdf.text(`Address: ${formData.address}`, 14, y);
    y += 6;
    pdf.text(`City: ${formData.city}`, 14, y);
    y += 6;
    pdf.text(`State: ${formData.state}`, 14, y);
    y += 6;
    pdf.text(`ZIP: ${formData.zip}`, 14, y);
    y += 6;
    pdf.text(`Payment Method: ${formData.payment}`, 14, y);
    y += 14;

    pdf.setFont(undefined, "bold");
    pdf.text("AI Decision Report", 14, y);
    y += 8;
    pdf.setFont(undefined, "normal");

    aiReports.forEach((r) => {
      pdf.setFillColor(240, 248, 255);
      pdf.rect(14, y - 5, 182, 36, "F");

      pdf.text(`Product: ${r.productName}`, 18, y);
      y += 6;
      pdf.text(`Decision: ${r.decision}`, 22, y);
      y += 6;
      pdf.text(`Final Score: ${r.finalScore}`, 22, y);
      y += 6;
      pdf.text(`Impulse Score: ${r.impulseScore}`, 22, y);
      y += 6;
      pdf.text(`Compatibility Score: ${r.compatibilityScore}`, 22, y);
      y += 6;
      pdf.text(`Time Spent: ${r.timeSpent}s`, 22, y);
      y += 12;
    });

    pdf.save("SmartOrder_AI_Invoice.pdf");
  };

  const handleOrder = async () => {
    if (!validateForm()) return;

    try {

      await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.firstName + " " + formData.lastName,
          email: formData.email,
          productName: cartItems.map(item => item.name).join(", "),
          amount: total,
          status: "Success",
        }),
      });

      await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: "ORD-" + Date.now(),
          customerName: formData.firstName + " " + formData.lastName,
          email: formData.email,
          products: cartItems.map(item => item.name),
          totalAmount: total,
          paymentMethod: formData.payment,
          status: "Completed",
        }),
      });

      generatePDF();
      clearCart();

      alert("Order Placed, Payment & Order Saved!");
      
    } catch (error) {
      console.log("Order Save Error:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 w-full mb-1"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mb-3">{errors.email}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">

            <div className="w-full">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="border p-3 w-full mb-1"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mb-3">{errors.firstName}</p>
              )}
            </div>

            <div className="w-full">
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="border p-3 w-full mb-1"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mb-3">{errors.lastName}</p>
              )}
            </div>

          </div>

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 w-full mb-1"
          />

          {errors.address && (
            <p className="text-red-500 text-sm mb-3">{errors.address}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">

            <div className="w-full">
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="border p-3 w-full mb-1"
              />
            </div>

            <div className="w-full">
              <input
                name="state"
                placeholder="State"
                onChange={handleChange}
                className="border p-3 w-full mb-1"
              />
            </div>

          </div>

          <input
            name="zip"
            placeholder="ZIP Code"
            onChange={handleChange}
            className="border p-3 w-full mb-1"
          />

          <h3 className="font-semibold mt-6 mb-3">Payment Method</h3>

          <div className="space-y-2">
            <label>
              <input type="radio" name="payment" value="Cash" onChange={handleChange}/> Cash
            </label><br/>

            <label>
              <input type="radio" name="payment" value="Card" onChange={handleChange}/> Card
            </label><br/>

            <label>
              <input type="radio" name="payment" value="UPI" onChange={handleChange}/> UPI
            </label><br/>

            <label>
              <input type="radio" name="payment" value="Online Banking" onChange={handleChange}/> Online Banking
            </label>
          </div>

          <h3 className="font-semibold mb-4 text-xl mt-6">AI Decision Report</h3>

          <div className="border rounded-lg p-5 bg-gray-50 max-h-[350px] overflow-y-auto">

            {aiReports.map((r, i) => (

              <div key={i} className="mb-5 border-b pb-4">

                <p className="font-semibold">{r.productName}</p>
                <p>Decision: <span className="text-blue-600">{r.decision}</span></p>
                <p>Final Score: {r.finalScore}</p>
                <p className="text-red-500">Impulse Score: {r.impulseScore}</p>
                <p className="text-green-600">Compatibility Score: {r.compatibilityScore}</p>
                <p>Time Spent: {r.timeSpent}s</p>

              </div>

            ))}

          </div>

          <button
            onClick={handleOrder}
            className="bg-orange-500 text-white w-full py-3 rounded mt-6"
          >
            Place Order
          </button>

        </div>

        {/* RIGHT */}

        <div className="bg-white p-4 sm:p-6 rounded shadow">

          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cartItems.map((item, index) => (
            <div key={index} className="mb-4 border-b pb-3">

              <div className="flex justify-between">
                <span className="font-semibold">{item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>

              <p className="text-sm">
                Color: {item.color} | Size: {item.size} | Qty: {item.quantity}
              </p>

            </div>
          ))}

          <hr className="my-4" />

          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>GST (18%): ₹{gst.toFixed(2)}</p>
          <p className="font-bold text-lg">Total: ₹{total.toFixed(2)}</p>

        </div>

      </div>

    </>
  );
}

export default Checkout;