import { useEffect, useState } from "react";

function ContactMessages() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/contacts")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 w-full">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Contact Messages
      </h1>

      <div className="space-y-6">

        {messages.map((msg) => (
          <div
            key={msg._id}
            className="border p-4 sm:p-6 rounded bg-gray-50 shadow-sm"
          >

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">

              <p>
                <strong>Name:</strong> {msg.firstName} {msg.lastName}
              </p>

              <p className="break-all">
                <strong>Email:</strong> {msg.email}
              </p>

              <p>
                <strong>Phone:</strong> {msg.phone}
              </p>

            </div>

            <p className="mt-3 text-sm sm:text-base">
              <strong>Message:</strong> {msg.message}
            </p>

            <p className="text-xs sm:text-sm text-gray-500 mt-3">
              {new Date(msg.createdAt).toLocaleString()}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ContactMessages;