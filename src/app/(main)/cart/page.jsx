"use client";
import React from "react";
import Container from "@/components/layout/Container.jsx";
import CartList from "@/components/cart/CartList.jsx";
import CartSummary from "@/components/cart/CartSummary.jsx";

export default function Cart() {
  return (
    <Container>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 py-12">
        {/* Left column: Cart Items */}
        <div className="lg:flex-1">
          <CartList />
        </div>

        {/* Right column: Summary */}
        <div className="lg:w-96">
          <CartSummary />
        </div>
      </div>
    </Container>
  );
}
