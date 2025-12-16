"use client";

import Link from "next/link.js";
import {
  CgProfile,
  CgShoppingCart,
  CgLogIn,
  CgHeart,
  CgBookmark,
} from "react-icons/cg";
import { Bookmark } from "lucide-react";
import useWishlist from "@/hooks/useWishlist";
import useSavedVideos from "@/hooks/useSavedVideos";
import "./layout.css";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isProfilePage = pathname === "/profile";

  const [cartCount, setCartCount] = useState(0);
  const { wishlist } = useWishlist();
  const { savedVideos } = useSavedVideos();

  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = stored.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
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
    <div className="sticky top-0 bg-white z-100">
      <nav className="p-6 max-w-7xl mx-auto flex items-center gap-2">
        {/* LEFT */}
        <div className="nav__left">
          <div className="shrink-0">
            <Link href="/">
              <div className="text-2xl md:text-3xl font-bold text-primary cursor-pointer">
                craftcart
              </div>
            </Link>
          </div>
        </div>

        {/* CENTER */}
        <div className="nav__center flex-1">
          <ul className="flex gap-4 justify-center">
            <li>
              <Link className="nav__link md:text-base text-sm" href="/videos">
                Explore
              </Link>
            </li>
            <li>
              <Link className="nav__link md:text-base text-sm" href="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link className="nav__link md:text-base text-sm" href="/studio">
                Create
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="nav__right flex justify-end items-center gap-2 md:gap-6">
          {/* WISHLIST */}
          <div className="wishlist relative">
            <Link className="nav__link" href="/wishlist">
              <CgHeart className="text-xl font-bold md:text-2xl cursor-pointer" />
            </Link>

            {wishlist.length > 0 && (
              <span
                className="
                  absolute -top-2 -right-3
                  bg-orange-600 text-white
                  text-xs font-bold
                  w-5 h-5 rounded-full
                  hidden md:flex items-center justify-center
                "
              >
                {wishlist.length}
              </span>
            )}
          </div>

          {/* CART */}
          <div className="cart relative">
            <Link className="nav__link" href="/cart">
              <CgShoppingCart className="text-xl md:text-2xl" />
            </Link>

            {cartCount > 0 && (
              <span
                className="
                  hidden
                  absolute -top-2 -right-3
                  bg-orange-600 text-white
                  text-xs font-bold
                  w-5 h-5 rounded-full
                  md:flex items-center justify-center
                "
              >
                {cartCount}
              </span>
            )}
          </div>

          {/* AUTH */}
          {session ? (
            <div className="profile-wrapper flex gap-2 md:gap-6 items-center">
              <div className="profile relative group">
                <div className="profile-btn">
                  <Link className="nav__link" href="/profile">
                    <CgProfile className="text-xl md:text-2xl hover:text-primary transition-colors duration-300 ease-in-out cursor-pointer" />
                  </Link>
                </div>

                <div className="profile-dropdown hidden group-hover:block rounded border-gray-500 bg-white p-2 py-4 pt-6 md:pt-8 absolute w-[150px] z-100 right-[-60] top-5 md:top-6 shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)]">
                  <ul className="flex flex-col items-center justify-center gap-2">
                    <li>
                      <Link
                        className="nav__link md:text-base text-sm"
                        href="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav__link md:text-base text-sm"
                        href="/orders"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav__link md:text-base text-sm"
                        href="/settings"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="nav__link md:text-base text-sm cursor-pointer"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="hidden md:block greeting">
                <p className="md:text-base text-sm">
                  Hi, {session.user.name.split(" ")[0]}!
                </p>
              </div>
            </div>
          ) : (
            <Link className="nav__link" href="/login">
              <CgLogIn className="text-xl md:text-2xl" />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
