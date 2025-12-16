"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "wishlist";

export default function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = () => {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      setWishlist(stored);
    };

    loadWishlist();

    window.addEventListener("wishlist-updated", loadWishlist);
    window.addEventListener("storage", loadWishlist);

    return () => {
      window.removeEventListener("wishlist-updated", loadWishlist);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  const toggleWishlist = (product) => {
    let updated;

    if (wishlist.some((i) => i.id === product.id)) {
      updated = wishlist.filter((i) => i.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setWishlist(updated);
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return {
    wishlist,
    toggleWishlist,
    isWishlisted,
  };
}
