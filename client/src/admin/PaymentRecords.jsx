import { useEffect, useState } from "react";

function PaymentRecords() {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    const res = await fetch("http://localhost:5000/api/payments");
    const data = await res.json();
    setPayments(data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 w-full">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Payment Records
      </h1>

      <div className="space-y-6">

        {payments.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-4 sm:p-6 shadow-sm bg-white"
          >

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">

              <p>
                <strong>Name:</strong> {p.customerName}
              </p>

              <p className="break-all">
                <strong>Email:</strong> {p.email}
              </p>

              <p className="sm:col-span-2">
                <strong>Product:</strong> {p.productName}
              </p>

              <p>
                <strong>Amount:</strong>{" "}
                <span className="font-semibold">
                  ₹{p.amount}
                </span>
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-600 font-medium">
                  {p.status}
                </span>
              </p>

              <p className="sm:col-span-2 text-xs sm:text-sm text-gray-500">
                <strong>Date:</strong>{" "}
                {new Date(p.createdAt).toLocaleString()}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default PaymentRecords;
