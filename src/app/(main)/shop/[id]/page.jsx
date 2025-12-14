"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import Loader from "@/components/ui/loader.jsx";
import { ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", id)
        .single();

      if (error) {
        console.error("Supabase product fetch error:", error);
        setProduct(null);
        setActiveImage("");
      } else {
        const normalizeImg = (url) => {
          if (!url) return url;
          if (url.startsWith("http")) return url;
          return url.startsWith("/") ? url : `/${url}`;
        };

        const mapped = {
          id: data.product_id,
          brand: data.brand,
          name: data.name,
          description: data.description,
          price: Number(data.price ?? 0),

          onSale: Boolean(data.on_sale),
          discountPercent: Number(data.discount_percent ?? 0),
          discountPrice:
            data.discount_price == null ? null : Number(data.discount_price),

          images: (Array.isArray(data.images) ? data.images : []).map(
            normalizeImg
          ),
        };

        setProduct(mapped);
        setActiveImage(mapped.images?.[0] ?? "");
      }

      setLoading(false);
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  const discountedPrice = Math.round(
    product.price * (1 - (product.discount_percent || 0) / 100)
  );

  const handleAddToCart = () => {
    if (quantity === 0) return;

    const cartItem = {
      id: product.product_id,
      name: product.name,
      price: discountedPrice,
      quantity,
      image: activeImage,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = existingCart.findIndex(
      (item) => item.id === product.product_id
    );

    if (index !== -1) {
      existingCart[index].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setQuantity(0);
    window.location.href = "/cart";
  };

  return (
    <div className="max-w-7xl p-10 mx-auto mt-10 mb-12">
      <div className="flex md:flex-row flex-col gap-8 md:gap-32 items-center justify-center max-w-[1020px] mx-auto">
        <div className="product-left flex flex-col gap-8">
          <div className="product-main-img rounded-3xl overflow-hidden h-[448px] w-[445px]">
            <img src={activeImage} alt={product.name} />
          </div>
          <div className="rest-imgs grid grid-cols-4 gap-8">
            {product.images.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className={`w-[88px] h-[88px] rounded-2xl overflow-hidden cursor-pointer hover:border border-transparent duration-75 ease-in-out hover:shadow-[0_5px_15px_rgba(0,0,0,0.075)] ${
                  activeImage === img
                    ? "border-orange-500"
                    : "opacity-70 hover:opacity-100"
                }}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={product.name} />
              </div>
            ))}
          </div>

          <div className="product-rest-images"></div>
        </div>
        <div className="product-right">
          <h1 className="text-gray-500 uppercase tracking-[2px] text-[13px] font-bold mb-6">
            {product.brand}
          </h1>
          <h2 className="text-[48px] font-bold leading-12 mb-8">
            {product.name}
          </h2>
          <p className="text-base leading-[26px] text-gray-600 mb-8">
            {product.description}
          </p>

          <div className="flex gap-4 items-start">
            <div className="price-section flex flex-col gap-2">
              <span className="text-[28px] leading-8 font-bold ">
                ${product.onSale ? product.discountPrice : product.price}
              </span>

              {product.onSale && (
                <span className="font-bold leading-[26px] line-through text-gray-500">
                  ${product.price}
                </span>
              )}
            </div>
            {product.onSale && (
              <div className="bg-orange-100 text-orange-500 rounded-md text-sm inline-block w-[51px] h-[27px] text-center leading-[26px] font-bold">
                {product.discountPercent}%
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-10 flex-col sm:flex-row">
            <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 w-full sm:w-40">
              <button
                onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                disabled={quantity === 0}
                className={`text-orange-500 text-xl font-bold ${
                  quantity === 0 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                −
              </button>

              <span className="font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-orange-500 text-xl font-bold"
              >
                +
              </button>
            </div>

            <button
              disabled={quantity === 0}
              onClick={handleAddToCart}
              className={`cursor-pointer flex-1 rounded-lg px-8 py-4 flex items-center justify-center gap-3 font-semibold bg-orange-500 hover:bg-orange-600 text-white ${
                quantity === 0 ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              Add to cart
              <ShoppingCart size={20} className="stroke-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
