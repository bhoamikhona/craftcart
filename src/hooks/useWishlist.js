"use client";

import { useState, useEffect } from "react";

export default function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
  }, []);

  // Save to localStorage
  const saveWishlist = (items) => {
    setWishlist(items);
    localStorage.setItem("wishlist", JSON.stringify(items));
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((i) => i.id === product.id);

    let updated;
    if (exists) {
      updated = wishlist.filter((i) => i.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }

    saveWishlist(updated);
  };

  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return { wishlist, toggleWishlist, isWishlisted };
}
