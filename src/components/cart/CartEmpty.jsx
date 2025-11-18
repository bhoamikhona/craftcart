import React from "react";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img
        src="/images/empty-cart.png"
        alt="Empty Cart"
        className="w-48 h-48 mb-6 object-contain"
      />
      <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
      <p className="text-gray-500">Add some products to get started!</p>
    </div>
  );
}
