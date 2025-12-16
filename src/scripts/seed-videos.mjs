import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { data as tutorials } from "../data/videos.js"; // adjust path if needed

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function seed() {
  /* SEED TUTORIALS*/
  const tutorialRows = tutorials.map((t) => ({
    tutorial_id: t.id,
    title: t.title,
    description: t.description ?? null,
    video_url: t.src ?? null,
    thumbnail_url: t.thumbnail ?? null,
    creator_id: t.creator?.id ?? null,
    likes: t.likes ?? 0,
    created_at: t.created_at ?? new Date().toISOString(),
  }));

  let { error } = await supabase
    .from("tutorials")
    .upsert(tutorialRows, { onConflict: "tutorial_id" });

  if (error) throw error;
  console.log(`✅ Seeded tutorials (${tutorialRows.length})`);

  /* FETCH VALID PRODUCTS */
  const { data: existingProducts, error: prodError } = await supabase
    .from("products")
    .select("product_id");

  if (prodError) throw prodError;

  const validProductIds = new Set(
    existingProducts.map((p) => p.product_id)
  );

  /*  SEED TUTORIAL ↔ PRODUCTS (SKIP MISSING PRODUCTS) */
  const tutorialProductRows = [];
  const skippedProducts = new Set();

  tutorials.forEach((t) => {
    t.products.forEach((p) => {
      if (validProductIds.has(p.productId)) {
        tutorialProductRows.push({
          tutorial_id: t.id,
          product_id: p.productId,
        });
      } else {
        skippedProducts.add(p.productId);
      }
    });
  });

  if (skippedProducts.size > 0) {
    console.warn(
      "⚠️ Skipped missing product IDs:",
      [...skippedProducts].join(", ")
    );
  }

  ({ error } = await supabase
    .from("tutorialproducts")
    .upsert(tutorialProductRows, {
      onConflict: "tutorial_id,product_id",
    }));

  if (error) throw error;
  console.log(
    `✅ Linked tutorial products (${tutorialProductRows.length})`
  );

  /* SEED TUTORIAL STEPS */
  const stepRows = tutorials.flatMap((t) =>
    t.steps.map((s) => ({
      tutorial_id: t.id,
      step_number: s.number,
      title: null,
      description: s.text,
    }))
  );

  ({ error } = await supabase
    .from("tutorialsteps")
    .upsert(stepRows, {
      onConflict: "tutorial_id,step_number",
    }));

  if (error) throw error;
  console.log(`✅ Seeded tutorial steps (${stepRows.length})`);

  console.log("🎉 ALL SEEDS COMPLETED SUCCESSFULLY");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
