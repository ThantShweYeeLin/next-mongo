import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  description: { type: String, required: true },
  stock: { type: Number, default: 0 },
  // Add other fields as needed
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
