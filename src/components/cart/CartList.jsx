"use client";
import React from "react";
import CartItem from "./CartItem.jsx";
import CartEmpty from "./CartEmpty.jsx";

/* original 

const cartItems = [
  {
    id: 1,
    name: "3mm Cotton Cord",
    image: "/images/products/cotton-cord.jpg",
    price: 8.99,
    quantity: 2,
  },
  {
    id: 2,
    name: "Wooden Dowel (12 inch)",
    image: "/images/products/wooden-dowel.jpg",
    price: 3.99,
    quantity: 4,
  },
  {
    id: 3,
    name: "Hot Glue Gun",
    image: "/images/products/hot-glue-gun.jpg",
    price: 11.99,
    quantity: 1,
  },
];

export default function CartList() {
  if (cartItems.length === 0) return <CartEmpty />;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 flex flex-col gap-6">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

*/


export default function CartList({ cart, updateQuantity }) {
  if (!cart.length) return <CartEmpty />;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 flex flex-col gap-6">

      {cart.map((item) => (
        <CartItem
          key={item.id}   // or item.product_id / order_item_id
          item={item}
          updateQuantity={updateQuantity}
        />
      ))}

    </div>
  );
}