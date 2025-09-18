export default async function Home({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(`${API_BASE}/product/${params.id}`, { cache: "no-store" });
  const product = await data.json();
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="w-full bg-blue-800 py-4 px-8 flex items-center justify-between shadow">
        <h1 className="text-white text-2xl font-bold tracking-wide">VMES</h1>
      </div>
      <div className="max-w-xl mx-auto mt-8 bg-blue-50 rounded-lg shadow p-8 border border-blue-200">
        <h1 className="text-3xl text-blue-900 font-bold mb-4">Product Details</h1>
        <div className="mb-4">
          <span className="block text-blue-900 font-semibold">Name:</span>
          <span className="text-xl text-blue-800 font-bold">{product.name}</span>
        </div>
        <div className="mb-4">
          <span className="block text-blue-900 font-semibold">Description:</span>
          <span className="text-blue-900">{product.description}</span>
        </div>
        <div className="mb-4">
          <span className="block text-blue-900 font-semibold">Price:</span>
          <span className="text-blue-900">{product.price} Baht</span>
        </div>
        <div className="mb-4">
          <span className="block text-blue-900 font-semibold">Category:</span>
          <span className="text-blue-900">{product.category?.name}</span>
        </div>
      </div>
    </div>
  );
}
