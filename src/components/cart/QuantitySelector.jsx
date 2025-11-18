"use client";
import React, { useState } from "react";

export default function QuantitySelector({ quantity }) {
  const [count, setCount] = useState(quantity);

  return (
    <div className="flex items-center border rounded-lg overflow-hidden w-28">
      <button
        className="px-3 py-1 bg-gray-100 text-gray-700"
        onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
      >
        -
      </button>
      <span className="flex-1 text-center">{count}</span>
      <button
        className="px-3 py-1 bg-gray-100 text-gray-700"
        onClick={() => setCount((prev) => prev + 1)}
      >
        +
      </button>
    </div>
  );
}
