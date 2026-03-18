import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function AdminControlCenter() {
  const [products, setProducts] = useState([]);
  const [serverImages, setServerImages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    color: "",
    imageFile: null,
    selectedServerImage: "",
  });

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchServerImages = async () => {
    const res = await fetch("http://localhost:5000/api/products/uploads-list");
    const data = await res.json();
    setServerImages(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchServerImages();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      color: product.color,
      imageFile: null,
      selectedServerImage: product.image.replace("/uploads/", ""),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("color", form.color);

    if (form.imageFile) {
      formData.append("image", form.imageFile);
    }

    if (!form.imageFile && form.selectedServerImage) {
      formData.append("imagePath", form.selectedServerImage);
    }

    const url = editingId
      ? `http://localhost:5000/api/products/${editingId}`
      : "http://localhost:5000/api/products";

    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      body: formData,
    });

    setForm({
      name: "",
      price: "",
      color: "",
      imageFile: null,
      selectedServerImage: "",
    });

    setEditingId(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <h1 className="text-2xl sm:text-3xl font-bold mb-8">
          PRODUCT MANAGEMENT
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
        >

          <input
            type="text"
            placeholder="Product Name"
            className="border p-3 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-3 rounded"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <select
            className="border p-3 rounded"
            value={form.color}
            onChange={(e) =>
              setForm({ ...form, color: e.target.value })
            }
          >
            <option value="">Select Color</option>
            <option>Black</option>
            <option>Blue</option>
            <option>White</option>
          </select>

          {/* Upload From PC */}
          <input
            type="file"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, imageFile: e.target.files[0] })
            }
          />

          {/* Select From Server */}
          <select
            className="border p-3 rounded md:col-span-2"
            value={form.selectedServerImage}
            onChange={(e) =>
              setForm({
                ...form,
                selectedServerImage: e.target.value,
                imageFile: null,
              })
            }
          >
            <option value="">Or Select From Server</option>
            {serverImages.map((img, index) => (
              <option key={index} value={img}>
                {img}
              </option>
            ))}
          </select>

          <button className="md:col-span-2 bg-black text-white py-3 rounded hover:bg-gray-800 transition">
            {editingId ? "UPDATE PRODUCT" : "ADD PRODUCT"}
          </button>

        </form>

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded shadow-sm">

              <img
                src={`http://localhost:5000${p.image}`}
                alt={p.name}
                className="h-32 w-full object-contain mb-3"
              />

              <h3 className="font-semibold">{p.name}</h3>
              <p>₹{p.price}</p>
              <p className="text-gray-600">{p.color}</p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default AdminControlCenter;