"use client";
import { useEffect, useState } from "react";
import Sidebar, { SidebarItem } from "@/components/ui/Sidebar.jsx";
import { LayoutGrid, Box, Tag, CheckCircle } from "lucide-react";
// import { productsData as data } from "@/data/newProductsData.mjs";
import ProductCard from "@/components/ui/ProductCard.jsx";
import supabase from "@/lib/supabaseClient";
import Loader from "@/components/ui/loader.jsx";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setProducts([]);
      } else {
        const mapped = (data ?? []).map((p) => ({
          productId: p.product_id,
          name: p.name,
          description: p.description,
          measurements: p.measurements,
          quantity: p.quantity,
          inStock: p.in_stock,
          price: p.price,
          currency: p.currency,
          images: p.images,
          rating: p.rating,
          reviewCount: p.review_count,
          category: p.category,
          createdAt: p.created_at,
          material: p.material,
          brand: p.brand,
          onSale: p.on_sale,
          discountPercent: p.discount_percent,
          discountPrice: p.discount_price,
          specs: p.specs,
        }));

        setProducts(mapped);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  return (
    <main className="flex gap-6 my-12">
      {/* <main className="flex gap-10 my-12 w-full min-h-screen py-12 p-8"> */}
      <Sidebar>
        <SidebarItem
          icon={<LayoutGrid size={20} />}
          text="Category"
          checkList={[
            "Paper & Card",
            "Adhesives",
            "Paint & Colors",
            "Clay & Resin",
            "Fabric & Yarn",
            "Wood & Boards",
            "Beads & Decor",
            "Tools",
          ]}
        />
        <SidebarItem
          icon={<Box size={20} />}
          text="Material"
          checkList={["Paper", "Wood", "Fabric", "Plastic"]}
        />
        <SidebarItem icon={<Tag size={20} />} text="Price" range={[0, 1000]} />
        <SidebarItem
          icon={<CheckCircle size={20} />}
          text="Availability"
          checkList={["In Stock", "Out of Stock"]}
        />
      </Sidebar>
      {/* <div className="max-w-7xl mx-auto grid md:grid-cols-3 grid-cols-2 gap-24 items-stretch auto-rows-fr">
        {data.map((p) => (
          <ProductCard key={p.productId} product={p} />
        ))}
      </div> */}
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.productId} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
