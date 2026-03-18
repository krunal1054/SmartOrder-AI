import { useEffect, useState } from "react";
import api from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await api.getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 w-full">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Registered Users
      </h2>

      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">

        <table className="min-w-[400px] w-full border-collapse text-sm sm:text-base">

          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 sm:p-3">#</th>
              <th className="p-2 sm:p-3">Name</th>
              <th className="p-2 sm:p-3">Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t">

                <td className="p-2 sm:p-3">
                  {index + 1}
                </td>

                <td className="p-2 sm:p-3">
                  {user.name}
                </td>

                <td className="p-2 sm:p-3 break-all">
                  {user.email}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}