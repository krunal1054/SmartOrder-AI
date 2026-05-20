const BASE_URL = "https://smartorder-ai.onrender.com/api";

// PRODUCTS
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
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

// AUTH
export const loginAdmin = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });

  return res.json();
};

export const registerAdmin = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/register`, {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });

  return res.json();
};
