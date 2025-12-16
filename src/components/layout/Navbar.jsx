"use client";

import Link from "next/link";
import {
  CgProfile,
  CgShoppingCart,
  CgLogIn,
  CgHeart,
} from "react-icons/cg";
import { Bookmark } from "lucide-react";
import useWishlist from "@/hooks/useWishlist";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(stored.reduce((sum, item) => sum + item.quantity, 0));
    };

    loadCart();
    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("storage", loadCart);
    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary shrink-0">
          craftcart
        </Link>

        {/* Center links (hide on mobile) */}
        <ul className="hidden md:flex flex-1 justify-center gap-6">
          <li><Link className="nav__link" href="/videos">Explore</Link></li>
          <li><Link className="nav__link" href="/shop">Shop</Link></li>
          <li><Link className="nav__link" href="/studio">Create</Link></li>
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Saved */}
          <Link href="/saved" className="nav__link">
            <Bookmark className="w-5 h-5" />
          </Link>

          {/* Wishlist */}
          <div className="relative">
            <Link href="/wishlist" className="nav__link">
              <CgHeart className="w-5 h-5" />
            </Link>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <Link href="/cart" className="nav__link">
              <CgShoppingCart className="w-5 h-5" />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile / Login */}
          {session ? (
            <div className="relative group">
              <CgProfile className="w-5 h-5 cursor-pointer" />

              <div className="hidden group-hover:block absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border p-3">
                <Link href="/profile" className="block nav__link py-1">Profile</Link>
                <Link href="/orders" className="block nav__link py-1">Orders</Link>
                <Link href="/settings" className="block nav__link py-1">Settings</Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block nav__link py-1 text-left w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="nav__link">
              <CgLogIn className="w-5 h-5" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
