"use client";
import { useEffect, useState } from "react";
import Sidebar, { SidebarItem } from "@/components/ui/Sidebar.jsx";
import { LayoutGrid, Box, Tag, CheckCircle } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard.jsx";
import supabase from "@/lib/supabaseClient";
import Loader from "@/components/ui/loader.jsx";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATE
  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedMaterials: [],
    selectedAvailability: [],
    selectedPrice: null,
  });

  // When user presses Apply Filters in sidebar
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // LOAD PRODUCTS
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Supabase error:", error);
        setProducts([]);
      } else {
        const mapped = (data ?? [])
          .map((p) => ({
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
          }))
          .sort((a, b) => {
            const numA =
              typeof a.productId === "string"
                ? parseInt(a.productId.replace(/\D/g, ""), 10)
                : a.productId;
            const numB =
              typeof b.productId === "string"
                ? parseInt(b.productId.replace(/\D/g, ""), 10)
                : b.productId;
            return numA - numB;
          });

        setProducts(mapped);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  // FILTERING LOGIC
  const filteredProducts = products.filter((p) => {
    // CATEGORY FILTER
    if (
      filters.selectedCategories.length > 0 &&
      !filters.selectedCategories.includes(p.category)
    ) {
      return false;
    }

    // MATERIAL FILTER
    if (
      filters.selectedMaterials.length > 0 &&
      !filters.selectedMaterials.includes(p.material)
    ) {
      return false;
    }

    // AVAILABILITY FILTER
    if (filters.selectedAvailability.length > 0) {
      const availabilityLabel = p.inStock ? "In Stock" : "Out of Stock";
      if (!filters.selectedAvailability.includes(availabilityLabel)) {
        return false;
      }
    }

    // PRICE FILTER
    if (filters.selectedPrice !== null && p.price > filters.selectedPrice) {
      return false;
    }

    return true;
  });

  return (
    <main className="flex gap-6 my-12">
      <div className="z-10">
        <Sidebar onApplyFilters={handleApplyFilters}>
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
          <SidebarItem icon={<Tag size={20} />} text="Price" range={[0, 50]} />
          <SidebarItem
            icon={<CheckCircle size={20} />}
            text="Availability"
            checkList={["In Stock", "Out of Stock"]}
          />
        </Sidebar>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <ProductCard key={p.productId} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
