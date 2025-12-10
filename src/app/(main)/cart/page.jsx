"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/layout/Container.jsx";
import CartList from "@/components/cart/CartList.jsx";
import CartSummary from "@/components/cart/CartSummary.jsx";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);


  const updateQuantity = (productId, qty) => {
    let updated;

    if (qty <= 0) {
      updated = cart.filter(item => item.id !== productId);
    } else {
      updated = cart.map(item =>
        item.id === productId
          ? { ...item, quantity: qty }
          : item
      );
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <Container>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 py-12">
        <div className="lg:flex-1">
          {/*  PASS Quantity  */}
          <CartList cart={cart} updateQuantity={updateQuantity} />
        </div>

        <div className="lg:w-96">
          <CartSummary cart={cart} />
        </div>
      </div>
    </Container>
  );
}
