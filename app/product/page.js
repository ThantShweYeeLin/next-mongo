"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  async function fetchProducts() {
    const data = await fetch(`${API_BASE}/product`);
    const p = await data.json();
    setProducts(p);
  }

  async function fetchCategory() {
    const data = await fetch(`${API_BASE}/category`);
    const c = await data.json();
    setCategory(c);
  }

  const createProduct = (data) => {
    fetch(`${API_BASE}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchProducts());
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    reset({
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
  };

  const updateProduct = (data) => {
    fetch(`${API_BASE}/product/${editingProduct._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      setEditingProduct(null);
      fetchProducts();
      reset();
    });
  };

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${API_BASE}/product/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'category', headerName: 'Category', width: 150, valueGetter: (params) => params.row.category?.name },
    { field: 'stock', headerName: 'Stock', width: 100 },
    // Add more columns as needed
  ];

  const rows = products.map((p) => ({
    id: p._id,
    ...p,
  }));

  return (
  <div className="min-h-screen bg-white">
    {/* Top Bar */}
    <div className="w-full bg-blue-800 py-4 px-8 flex items-center justify-between shadow">
      <h1 className="text-white text-2xl font-bold tracking-wide">VMES</h1>
    </div>
    <div className="flex flex-row gap-4 mt-8">
      <div className="flex-1 w-64 ">
        <form onSubmit={handleSubmit(createProduct)}>
          <div className="grid grid-cols-2 gap-4 m-4 w-1/2 bg-white p-6 rounded-lg shadow border border-blue-200">
            <div className="text-blue-900 font-semibold">Code:</div>
            <div>
              <input
                name="code"
                type="text"
                {...register("code", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="text-blue-900 font-semibold">Name:</div>
            <div>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="text-blue-900 font-semibold">Description:</div>
            <div>
              <textarea
                name="description"
                {...register("description", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="text-blue-900 font-semibold">Price:</div>
            <div>
              <input
                name="price"
                type="number"
                {...register("price", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="text-blue-900 font-semibold">Category:</div>
            <div>
              <select
                name="category"
                {...register("category", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {category.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 flex justify-center mt-4">
              <input
                type="submit"
                value="Add"
                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="border m-4 bg-blue-50 flex-1 w-64 rounded-lg shadow">
        <h1 className="text-2xl text-blue-900 font-bold p-4">Products ({products.length})</h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </div>
    </div>
    {/* Edit Product Form */}
    {editingProduct && (
      <div className="flex-1 w-64 mt-8">
        <form onSubmit={handleSubmit(updateProduct)}>
          <div className="grid grid-cols-2 gap-4 m-4 w-1/2 bg-white p-6 rounded-lg shadow border border-blue-200">
            <div className="text-blue-900 font-semibold">Code:</div>
            <div>
              <input
                name="code"
                type="text"
                {...register("code", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="text-blue-900 font-semibold">Name:</div>
            <div>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="text-blue-900 font-semibold">Description:</div>
            <div>
              <textarea
                name="description"
                {...register("description", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="text-blue-900 font-semibold">Price:</div>
            <div>
              <input
                name="price"
                type="number"
                {...register("price", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="text-blue-900 font-semibold">Category:</div>
            <div>
              <select
                name="category"
                {...register("category", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {category.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="text-blue-900 font-semibold">Stock:</div>
            <div>
              <input
                name="stock"
                type="number"
                {...register("stock", { required: true })}
                className="border border-blue-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="col-span-2 flex justify-center mt-4 gap-2">
              <input
                type="submit"
                value="Update"
                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow"
              />
              <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full shadow">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )}
  </div>
  );
}

