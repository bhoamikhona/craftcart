"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import supabase from "@/lib/supabaseClient";

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch product from Supabase
  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", id)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        setLoading(false);
        return;
      }

      setProduct(data);
      setActiveImage(
        Array.isArray(data.images) ? data.images[0] : data.images
      );
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center text-gray-500">
        Product not found
      </div>
    );
  }

  // Calculate discounted price
  const discountedPrice =
    product.on_sale && product.discount_price
      ? product.discount_price
      : product.price;

  const handleAddToCart = () => {
    if (quantity === 0) return;

    const cartItem = {
      id: product.product_id,
      name: product.name,
      price: discountedPrice,
      quantity,
      image: activeImage
    };

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = existingCart.findIndex(
      item => item.id === product.product_id
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    setQuantity(0);

    window.location.href = "/cart";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT — Images */}
        <div>
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
                ${discountedPrice}
              </span>

              {product.on_sale && (
                <span className="bg-orange-100 text-orange-500 font-semibold px-2 py-1 rounded-md text-sm">
                  {product.discount_percent}% OFF
                </span>
              )}
            </div>

            {product.on_sale && (
              <p className="line-through text-gray-400 mt-1">
                ${product.price}
              </p>
            )}
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex gap-4 mt-10 flex-col sm:flex-row">
            {/* Quantity box */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 w-full sm:w-40">
              <button
                onClick={() => setQuantity(q => Math.max(0, q - 1))}
                disabled={quantity === 0}
                className={`text-orange-500 text-xl font-bold ${
                  quantity === 0 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                −
              </button>

              <span className="font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity(q => q + 1)}
                className="text-orange-500 text-xl font-bold"
              >
                +
              </button>
            </div>

            {/* Add to cart */}
            <button
              disabled={quantity === 0}
              onClick={handleAddToCart}
              className={`flex-1 rounded-lg px-8 py-4 flex items-center justify-center gap-3 font-semibold bg-orange-500 hover:bg-orange-600 text-white ${
                quantity === 0 ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              <ShoppingCart size={20} className="stroke-white" />
              Add to cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
