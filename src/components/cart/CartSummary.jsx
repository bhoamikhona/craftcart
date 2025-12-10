"use client";
import React from "react";

/* original

import { cartItems } from "@/data/cart.js";

export default function CartSummary() {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-white rounded-xl shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold">Summary</h2>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-500">
        <span>Shipping</span>
        <span>$5.00</span>
      </div>
      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>${(total + 5).toFixed(2)}</span>
      </div>
      <button className="btn-primary w-full py-3">Checkout</button>
    </div>
  );
}

*/

export default function CartSummary({ cart }) {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <div className="p-6 bg-white rounded-xl shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold">Summary</h2>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-500">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button className="btn-primary w-full py-3">Checkout</button>
    </div>
  );
}
