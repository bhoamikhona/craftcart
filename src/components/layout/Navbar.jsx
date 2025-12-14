// 'use client';

// import React from "react";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { usePathname } from "next/navigation";

// function Avatar({ name, image }) {
//   if (image) {
//     return (
//       <img
//         src={image}
//         alt={name}
//         className="w-8 h-8 rounded-full object-cover"
//       />
//     );
//   }

//   return (
//     <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
//       {name.charAt(0).toUpperCase()}
//     </div>
//   );
// }

// function Navbar() {
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const isProfilePage = pathname === "/profile";

//   return (
//     <nav className="bg-background border-b border-border sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

//         <div className="shrink-0">
//           <Link href="/">
//             <div className="text-2xl font-bold text-primary cursor-pointer">
//               CraftCart
//             </div>
//           </Link>
//         </div>

//         <div className="hidden md:flex space-x-8 justify-center flex-1">
//           <ul className="flex space-x-8 font-medium w-full justify-center">
//             <Link href="/watch" passHref>
//               <li className="text-foreground hover:text-primary cursor-pointer transition-colors">
//                 Watch
//               </li>
//             </Link>

//             <Link href="/marketplace" passHref>
//               <li className="text-foreground hover:text-primary cursor-pointer transition-colors">
//                 Marketplace
//               </li>
//             </Link>

//             {/* <Link href="/studio" passHref>
//               <li className="text-foreground hover:text-primary cursor-pointer transition-colors">
//                 Studio
//               </li>
//             </Link> */}
//           </ul>
//         </div>

//         <div className="hidden md:flex items-center space-x-4 shrink-0">

//           {session ? (
//             <>
//               {/* Avatar + Username */}
//               <Link href="/profile" className="flex items-center space-x-2">
//                 <Avatar name={session.user.name} image={session.user.image} />
//                 <span className="cursor-pointer font-medium hover:text-primary">
//                   {session.user.name}
//                 </span>
//               </Link>

//               {/* Sign Out ONLY on Profile Page */}
//               {isProfilePage && (
//                 <button
//                   className="btn-primary"
//                   onClick={() => signOut({ callbackUrl: "/" })}
//                 >
//                   Sign Out
//                 </button>
//               )}

//               <div className="cursor-pointer text-2xl"
//               onClick={() => (window.location.href = "/cart")}>🛒</div>
//             </>
//           ) : (
//             <>
//               <button
//                 className="btn-primary"
//                 onClick={() => (window.location.href = "/login")}
//               >
//                 Sign In
//               </button>
//               <div className="cursor-pointer text-2xl"
//               onClick={() => (window.location.href = "/cart")}>🛒</div>

//             </>
//           )}

//         </div>

//         <div className="md:hidden text-2xl text-primary ml-auto cursor-pointer">☰</div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


"use client";

import Link from "next/link.js";
import { CgProfile, CgShoppingCart, CgLogIn } from "react-icons/cg";
import "./layout.css";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isProfilePage = pathname === "/profile";

  // CART BADGE STATE
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = stored.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    // Load initial cart count
    loadCart();

    // Listen for custom cart-updated events from ProductCard / CartItem
    window.addEventListener("cart-updated", loadCart);

    // Listen for storage updates (for safety)
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  return (
    <div className="sticky top-0 bg-white z-100">
      <nav className="p-6 max-w-7xl mx-auto flex items-center gap-2">
        <div className="nav__left">
          <div className="shrink-0">
            <Link href="/">
              <div className="text-2xl md:text-3xl font-bold text-primary cursor-pointer">
                craftcart
              </div>
            </Link>
          </div>
        </div>

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

        <div className="nav__right flex justify-end items-center gap-2 md:gap-6">

          {/* CART ICON WITH BADGE */}
          <div className="cart relative">
            <Link className="nav__link" href="/cart">
              <CgShoppingCart className="text-xl md:text-2xl" />
            </Link>

            {cartCount > 0 && (
              <span
                className="
                  absolute -top-2 -right-3
                  bg-orange-600 text-white
                  text-xs font-bold
                  w-5 h-5 rounded-full
                  flex items-center justify-center
                "
              >
                {cartCount}
              </span>
            )}
          </div>

          {session ? (
            <div className="profile-wrapper flex gap-2 md:gap-6 items-center">
              <div className="profile relative group">
                <div className="profile-btn">
                  <Link className="nav__link" href="/profile">
                    <CgProfile className="text-xl md:text-2xl hover:text-primary transition-colors duration-300 ease-in-out cursor-pointer" />
                  </Link>
                </div>

                <div className="profile-dropdown hidden group-hover:block rounded border-gray-500 bg-white p-2 py-4 pt-6 md:pt-8 absolute w-[150px] z-100 right-[-60] top-5 md:top-6 shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)]">
                  <ul className="flex flex-col items-center justify-center gap-2 ">
                    <li>
                      <Link className="nav__link md:text-base text-sm" href="/profile">
                        Profile
                      </Link>
                    </li>

                    <li>
                      <Link className="nav__link md:text-base text-sm" href="/orders">
                        Orders
                      </Link>
                    </li>

                    <li>
                      <Link className="nav__link md:text-base text-sm" href="/settings">
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

              <div className="greeting">
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

