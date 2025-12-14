"use client";
import React from "react";
import QuantitySelector from "./QuantitySelector.jsx";

export default function CartItem({ item, updateQuantity }) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>

        <QuantitySelector
          quantity={item.quantity}
          onChange={(qty) => {
            updateQuantity(item.id, qty);

            // Tell navbar the cart changed
            window.dispatchEvent(new Event("cart-updated"));
          }}
        />
      </div>

      <div className="text-lg font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
