"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";


export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

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
          <table className="min-w-full bg-white border border-blue-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-blue-100 hover:bg-blue-100">
                  <td className="py-2 px-4 text-blue-900 font-semibold">
                    <Link href={`/product/${p._id}`} className="font-bold text-blue-800 hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 text-blue-900">{p.description}</td>
                  <td className="py-2 px-4">
                    <button className="border border-blue-400 bg-white text-blue-700 rounded px-2 py-1 mr-2" onClick={deleteById(p._id)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
