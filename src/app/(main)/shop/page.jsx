import Sidebar, { SidebarItem } from "@/components/ui/Sidebar.jsx";
import { LayoutGrid, Box, Tag, CheckCircle } from "lucide-react";
import { productsData as data } from "@/data/newProductsData.js";
import ProductCard from "@/components/ui/ProductCard.jsx";

export default function Shop() {
  return (
    <main className="flex gap-6 my-12">
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
        <SidebarItem icon={<Tag size={20} />} text="Price" range={[0, 10000]} />
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p) => (
            <ProductCard key={p.productId} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
