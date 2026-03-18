import { useEffect, useState } from "react";

function OrdersRecord() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 w-full">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Orders Record
      </h1>

      <div className="overflow-x-auto">

        <table className="min-w-[800px] w-full border text-sm sm:text-base">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 sm:p-3 border">Order ID</th>
              <th className="p-2 sm:p-3 border">Customer</th>
              <th className="p-2 sm:p-3 border">Email</th>
              <th className="p-2 sm:p-3 border">Products</th>
              <th className="p-2 sm:p-3 border">Amount</th>
              <th className="p-2 sm:p-3 border">Payment</th>
              <th className="p-2 sm:p-3 border">Status</th>
              <th className="p-2 sm:p-3 border">Date</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((o) => (
              <tr key={o._id} className="text-center">

                <td className="p-2 sm:p-3 border whitespace-nowrap">
                  {o.orderId}
                </td>

                <td className="p-2 sm:p-3 border">
                  {o.customerName}
                </td>

                <td className="p-2 sm:p-3 border break-all">
                  {o.email}
                </td>

                <td className="p-2 sm:p-3 border text-left max-w-[200px]">
                  {o.products.join(", ")}
                </td>

                <td className="p-2 sm:p-3 border font-semibold">
                  ₹{o.totalAmount}
                </td>

                <td className="p-2 sm:p-3 border">
                  {o.paymentMethod}
                </td>

                <td className="p-2 sm:p-3 border">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded text-white text-xs sm:text-sm ${
                      o.status === "Completed"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td className="p-2 sm:p-3 border whitespace-nowrap text-xs sm:text-sm">
                  {new Date(o.createdAt).toLocaleString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OrdersRecord;