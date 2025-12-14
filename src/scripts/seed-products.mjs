import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { productsData } from "../data/newProductsData.mjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const rows = productsData.map((p) => ({
  product_id: p.productId,
  name: p.name,
  description: p.description ?? null,
  measurements: p.measurements ?? null,
  quantity: p.quantity ?? null,
  in_stock: p.inStock ?? null,
  price: p.price ?? null,
  currency: p.currency ?? "USD",
  category: p.category ?? null,
  rating: p.rating ?? null,
  review_count: p.reviewCount ?? null,
  images: p.images ?? null,
  specs: p.specs ?? null,
  brand: p.brand ?? null,
  material: p.material ?? null,
  on_sale: p.onSale ?? null,
  discount_percent: p.discountPercent ?? null,
  discount_price: p.discountPrice ?? null,
}));

const { error, data } = await supabase
  .from("products")
  .upsert(rows, { onConflict: "product_id" })
  .select("product_id");

if (error) {
  console.error("❌ Seed failed:", error);
  process.exit(1);
}

console.log(`✅ Seeded/updated ${data.length} products`);
