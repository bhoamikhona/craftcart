"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const PRODUCTS = [
  {
    id: "prod-001",
    brand: "Nicpro",
    name: "Acrylic Paint Metallic",
    description:
      "6 Colors Gold, Silver, Copper, Brass, Bronze, DeepGold, 24oz/720ml Gold Leaf Paint, Non Toxic, Non Fading Paints for Art Painting, Handcrafts, Ideal for Multi-surface.",
    price: 25.99,
    discountPercent: 8,
    images: [
      "/images/products/Paint.jpg",
      "/images/products/color1.jpg",
      "/images/products/color2.jpg",
      "/images/products/color3.jpg",
      "/images/products/color4.jpg"
    ]
  }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);

  const [activeImage, setActiveImage] = useState(
    product ? product.images[0] : ""
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center text-gray-500">
        Product not found
      </div>
    );
  }

  const discountedPrice = Math.round(
    product.price * (1 - product.discountPercent / 100)
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT — Images */}
        <div>
          {/* ✅ MODERN IMAGE WRAPPER (NO GRAY) */}
          <div className="rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm flex items-center justify-center h-[420px]">
            <img
              src={activeImage}
              alt={product.name}
              className="max-h-full object-contain"
            />
          </div>

          <div className="flex gap-4 mt-6">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`rounded-xl overflow-hidden border-2 transition ${
                  activeImage === img
                    ? "border-orange-500"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — Info */}
        <div className="flex flex-col justify-center">
          <p className="uppercase tracking-widest text-sm text-orange-500 font-semibold">
            {product.brand}
          </p>

          <h1 className="text-4xl font-bold mt-4">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-6 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-8">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">
                ${discountedPrice}.00
              </span>
              <span className="bg-orange-100 text-orange-500 font-semibold px-2 py-1 rounded-md text-sm">
                {product.discountPercent}%
              </span>
            </div>
            <p className="line-through text-gray-400 mt-1">
              ${product.price}.00
            </p>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex gap-4 mt-10 flex-col sm:flex-row">
            <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 w-full sm:w-40">
              <button className="text-orange-500 text-xl font-bold">−</button>
              <span className="font-semibold">0</span>
              <button className="text-orange-500 text-xl font-bold">+</button>
            </div>

            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-8 py-4 flex items-center justify-center gap-3">
              <ShoppingCart size={20} className="stroke-white" />
              Add to cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
