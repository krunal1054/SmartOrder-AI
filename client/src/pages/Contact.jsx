import Navbar from "../components/Navbar";
import { useState } from "react";
import jsPDF from "jspdf";

function Contact() {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, 210, 30, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.text("SmartOrder AI", 15, 18);

    pdf.setFontSize(10);
    pdf.text("AI-Assisted Decision Intelligence", 15, 24);

    pdf.setTextColor(0, 0, 0);

    let y = 45;

    pdf.setFontSize(16);
    pdf.setFont(undefined, "bold");
    pdf.text("Contact Message Report", 15, y);
    y += 10;

    pdf.setFont(undefined, "normal");

    pdf.setDrawColor(180);
    pdf.rect(15, y, 180, 90);
    y += 10;

    pdf.setFontSize(12);

    pdf.text(`Full Name: ${form.firstName} ${form.lastName}`, 20, y);
    y += 10;

    pdf.text(`Email: ${form.email}`, 20, y);
    y += 10;

    pdf.text(`Phone: ${form.phone}`, 20, y);
    y += 15;

    pdf.setFont(undefined, "bold");
    pdf.text("Message:", 20, y);
    y += 8;

    pdf.setFont(undefined, "normal");

    const splitMessage = pdf.splitTextToSize(form.message, 160);
    pdf.text(splitMessage, 20, y);

    pdf.setFillColor(240, 240, 240);
    pdf.rect(0, 270, 210, 20, "F");

    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      15,
      282
    );

    pdf.text(
      "SmartOrder AI | Official Contact Report",
      115,
      282
    );

    pdf.save("SmartOrder_AI_Contact_Report.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      generatePDF();

      alert("Message Sent, Saved & PDF Downloaded!");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col md:flex-row">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 bg-black text-white p-6 sm:p-10 md:p-12 flex flex-col justify-center">

          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Contact Information
          </h2>

          <div className="space-y-6 text-gray-300">

            <div>
              <h4 className="text-lg font-semibold">Address</h4>
              <p>Ahmedabad, Gujarat, India</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold">Phone</h4>
              <p className="text-green-400">+91 9876543210</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold">Email</h4>
              <p className="text-green-400">support@smartorderai.com</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full md:w-1/2 bg-white p-6 sm:p-10 md:p-12">

          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Send Us A Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex flex-col sm:flex-row gap-4">

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border p-3"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border p-3"
              />

            </div>

            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border p-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border p-3"
            />

            <textarea
              name="message"
              placeholder="Write Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border p-3"
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 transition w-full sm:w-auto"
            >
              SEND MESSAGE
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Contact;