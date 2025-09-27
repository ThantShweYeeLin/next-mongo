import Category from "@/models/Category";
import dbConnect from "@/lib/db";

export async function GET(request) {
  await dbConnect();
  console.log('GET /api/category', request.nextUrl.searchParams.get("pno"));
  
  const pno = request.nextUrl.searchParams.get("pno")
  if (pno) {
    const size = 3 // TODO fix this hard code
    const startIndex = (pno - 1) * size
    const categories = await Category.find()
      .sort({ order: -1 })
      .skip(startIndex)
      .limit(size)
    console.log("Categories with pagination:", categories);
    return Response.json(categories)
  }

  const s = request.nextUrl.searchParams.get("s")
  if (s) {
    const categories = await Category
      .find({ name: { $regex: s, $options: 'i' } })
      .sort({ order: -1 })
    console.log("Categories with search:", categories);
    return Response.json(categories)
  }

  const categories = await Category.find().sort({ order: -1 })
  console.log("All categories:", categories);
  return Response.json(categories)
}

export async function POST(request) {
  await dbConnect();
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  const body = await request.json()
  console.log('Creating category with:', body);
  const category = new Category(body)
  await category.save()
  console.log('Created category:', category);
  return Response.json(category)
}



// for V2
export async function PUT(request) {
  const body = await request.json()
  const category = await Category.findByIdAndUpdate(body._id, body)
  return Response.json(category)
}