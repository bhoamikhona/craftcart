"use client";

import { useState } from "react";
import Tabs from "@/components/studio/Tabs.jsx";
import Preview from "@/components/studio/Preview.jsx";
import DetailsTab from "@/components/studio/DetailsTab.jsx";
import ProductsTab from "@/components/studio/ProductsTab.jsx";
import StepsTab from "@/components/studio/StepsTab.jsx";

export const initialVideo = {
  title: "Valentine Greeting Card",
  thumbnail: "/images/thumbnail/valentine-greeting-card.png",
  created_at: "2025-12-01T14:10:00Z",
  views: 100,
  creator: {
    full_name: "Bhoami K Khona",
    avatar_url: "/images/users/1.jpg",
  },
  description:
    "In this tutorial, you’ll make a premium-looking Valentine greeting card using cardstock, adhesive, and a few basic tools. We’ll cover clean cutting, neat layering, and simple finishing touches so it looks store-bought but still handmade.",
  products: [
    {
      productId: "prod-001",
      name: "Stainless Steel Scissors",
      price: 12.99,
      images: [],
    },
    { productId: "prod-011", name: "Wooden Ruler", price: 3.49, images: [] },
    { productId: "prod-003", name: "Cardstock Pack", price: 14.25, images: [] },
  ],
  steps: [
    { number: 1, text: "Cut the cardstock to size." },
    { number: 2, text: "Fold and glue the layers." },
  ],
};

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState("details");
  const [video, setVideo] = useState(initialVideo);

  return (
    <div className="max-w-7xl mx-auto p-6 mt-12 mb-20 flex flex-col lg:flex-row gap-12">
      <div className="w-full lg:w-[420px] shrink-0">
        <Preview video={video} />
      </div>

      <div className="flex-1">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          {activeTab === "details" && (
            <DetailsTab
              video={video}
              setVideo={setVideo}
              initialVideo={initialVideo}
            />
          )}

          {activeTab === "products" && (
            <ProductsTab video={video} setVideo={setVideo} />
          )}

          {activeTab === "steps" && (
            <StepsTab video={video} setVideo={setVideo} />
          )}
        </div>
      </div>
    </div>
  );
}
