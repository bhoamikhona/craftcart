import React from "react";
import Link from "next/link";
import { Scissors, Paintbrush, Package } from "lucide-react";

export default function CartEmpty() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-32 text-center">
      {/* Original */}
      {/*
      <div className="flex flex-col items-center justify-center py-20">
        <img
          src="/images/empty-cart.png"
          alt="Empty Cart"
          className="w-48 h-48 mb-6 object-contain"
        />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
      */}

      <h2 className="text-3xl font-serif mb-4">Your cart is empty.</h2>

      <p className="text-gray-600 mb-6">
        Discover something unique to fill it up
      </p>

      <Link
        href="/shop"
        className="underline text-sm text-gray-800 hover:text-black mb-16"
      >
        Discover items
      </Link>
      <div className="w-full max-w-2xl border-t pt-8 flex flex-col gap-6 text-sm text-gray-600">

        <div className="flex items-start gap-3">
          <Scissors size={20} strokeWidth={1.5} />
          <p>
            Every great handmade project starts with the right tools and materials.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Paintbrush size={20} strokeWidth={1.5} />
          <p>
            Designed to inspire creativity and beautiful crafting.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Package size={20} strokeWidth={1.5} />
          <p>
            Explore supplies made for makers, artists, and creative minds like you.
          </p>
        </div>

      </div>
    </div>
  );
}