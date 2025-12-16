import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function seedOrders() {
  /*  SEED ORDERS */
  const orders = [
    {
      order_id: 1,
      user_id: 9, // Bhoami K Khona
      total_amount: 77.0,
      status: "Delivered",
    },
    {
      order_id: 2,
      user_id: 9,
      total_amount: 78.0,
      status: "Shipped",
    },
    {
      order_id: 3,
      user_id: 9,
      total_amount: 99.0,
      status: "Processing",
    },
    {
      order_id: 4,
      user_id: 45, // Janvi
      total_amount: 59.0,
      status: "Processing",
    },
  ];

  let { error } = await supabase
    .from("orders")
    .upsert(orders, { onConflict: "order_id" });

  if (error) {
    console.error("❌ Orders seed failed:", error);
    process.exit(1);
  }

  console.log(`✅ Seeded/updated ${orders.length} orders`);

  /*  SEED ORDER ITEMS (UPSERT) */
  const orderItems = [
    { order_id: 1, product_id: "prod-001", quantity: 1, price: 8.99 },
    { order_id: 1, product_id: "prod-011", quantity: 10, price: 3.99 },

    { order_id: 2, product_id: "prod-003", quantity: 1, price: 11.99 },

    { order_id: 3, product_id: "prod-003", quantity: 1, price: 11.99 },
    { order_id: 3, product_id: "prod-011", quantity: 4, price: 3.99 },

    { order_id: 4, product_id: "prod-007", quantity: 1, price: 11.99 },
    { order_id: 4, product_id: "prod-011", quantity: 4, price: 3.99 },
  ];

  ({ error } = await supabase
    .from("orderitems")
    .upsert(orderItems, {
      onConflict: "order_id,product_id",
    }));

  if (error) {
    console.error("❌ Order items seed failed:", error);
    process.exit(1);
  }

  console.log(`✅ Seeded/updated ${orderItems.length} order items`);
  console.log("🎉 ORDER SEEDING COMPLETED SUCCESSFULLY");
}

seedOrders().catch((err) => {
  console.error("❌ Seed crashed:", err);
  process.exit(1);
});
