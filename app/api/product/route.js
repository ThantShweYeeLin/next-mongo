import Product from "@/models/Product";
import Category from "@/models/Category"; // Import Category model to register it
import dbConnect from "@/lib/db";

export async function GET() {
  await dbConnect();
  const products = await Product.find().populate("category");
  console.log("Products from DB:", JSON.stringify(products, null, 2));
  return Response.json(products);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  console.log("Creating product with data:", body);
  const product = new Product(body);
  await product.save();
  return Response.json(product);
}

export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}

export async function PATCH(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}