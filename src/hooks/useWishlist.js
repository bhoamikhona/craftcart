"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function useWishlist() {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState([]);

  // user-scoped storage key
  const STORAGE_KEY = session?.user?.email
    ? `wishlist-${session.user.email}`
    : null;

  useEffect(() => {
    if (!STORAGE_KEY) {
      setWishlist([]);
      return;
    }

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
  }, [STORAGE_KEY]);

  const toggleWishlist = (product) => {
    if (!STORAGE_KEY) return;

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
