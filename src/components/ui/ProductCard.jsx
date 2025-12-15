"use client";

import Link from "next/link";
import "./ui-styles/ProductCard.css";
import { CgShoppingCart } from "react-icons/cg";
import {
  LiaRulerHorizontalSolid,
  LiaRulerVerticalSolid,
} from "react-icons/lia";
import { RxLayers } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import useWishlist from "@/hooks/useWishlist";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

export default function ProductCard({
  product: {
    productId,
    name,
    description,
    inStock,
    price,
    image,
    images,
    rating,
    category,
    material,
    specs,
  },
}) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem = {
      id: productId,
      name,
      price,
      quantity: 1,
      image: (images && images[0]) || image || "",
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = existingCart.findIndex(
      (item) => item.id === productId
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      id: productId,
      name,
      price,
      image: (images && images[0]) || image || "",
    });
  };

  return (
    <Link className="product-link block h-full" href={`/shop/${productId}`}>
      <article className="h-full flex flex-col overflow-hidden rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.15)] w-full max-w-[300px] mx-auto bg-white">
        <div className="relative">
          <div className="product-img-container rounded-3xl overflow-hidden rounded-br-none h-[250px]">
            <img
              src={(images && images[0]) || image}
              alt={name}
              className="product-img w-full"
            />
          </div>

          <button
            className="absolute top-0 right-0 w-[60px] h-[75px] bg-white flex items-center justify-center rounded-bl-3xl cursor-pointer"
            onClick={handleWishlist}
          >
            {isWishlisted(productId) ? (
              <IoMdHeart className="text-2xl font-bold text-primary" />
            ) : (
              <IoMdHeartEmpty className="text-2xl font-bold text-primary" />
            )}
          </button>
        </div>

        <div className="product-info-container flex flex-col gap-3 flex-1">
          <h2 className="product-name text-lg font-bold px-6 pt-6">{name}</h2>

          <p className="text-gray-400 text-sm px-6 mb-2 line-clamp-3">
            {description}
          </p>

          <div className="grid grid-cols-3 gap-2 px-6 mb-6 mt-2">
            <Spec icon={<LiaRulerHorizontalSolid />} value={specs?.[0]} />
            <Spec icon={<LiaRulerVerticalSolid />} value={specs?.[1]} />
            <Spec icon={<RxLayers />} value={specs?.[2]} />
          </div>

          <div className="flex items-center justify-between h-14 mt-auto">
            <p className="flex-1 text-center text-lg font-bold">
              ${price.toFixed(2)}
            </p>

            <button
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white h-full rounded-tl-3xl rounded-br-3xl cursor-pointer hover:bg-orange-600"
              onClick={handleAddToCart}
            >
              Add to Cart
              <CgShoppingCart className="text-bold text-lg" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}

function Spec({ icon, value }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-200 py-2">
      <span className="text-base text-gray-600">{icon}</span>
      <span className="text-xs text-gray-600 text-center">{value}</span>
    </div>
  );
}
