const BASE_URL = "http://localhost:5000/api";

// ================= PRODUCTS =================
export const getProducts = async (color) => {
  const url = color
    ? `${BASE_URL}/products?color=${color}`
    : `${BASE_URL}/products`;

  const res = await fetch(url);
  return res.json();
};

export const addProduct = async (data) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
};

// ================= AUTH =================

export const loginAdmin = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const registerAdmin = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};


// GET ALL USERS
export const getUsers = async () => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${BASE_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
// ✅ DEFAULT EXPORT
const api = {
  getProducts,
  addProduct,
  deleteProduct,
  loginAdmin,
  registerAdmin,
  getUsers,   // 🔥 ADD THIS
};

export default api;