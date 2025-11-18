'use client';

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

function Avatar({ name, image }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="w-8 h-8 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isProfilePage = pathname === "/profile";

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        <div className="shrink-0">
          <Link href="/">
            <div className="text-2xl font-bold text-primary cursor-pointer">
              CraftCart
            </div>
          </Link>
        </div>

        <div className="hidden md:flex space-x-8 justify-center flex-1">
          <ul className="flex space-x-8 font-medium w-full justify-center">
            <li className="text-foreground hover:text-primary cursor-pointer transition-colors">
              Watch
            </li>
            <Link href="/marketplace" passHref>
              <li className="text-foreground hover:text-primary cursor-pointer transition-colors">
                Marketplace
              </li>
            </Link>
          </ul>
        </div>
        
        <div className="hidden md:flex items-center space-x-4 shrink-0">

          {session ? (
            <>
              {/* Avatar + Username */}
              <Link href="/profile" className="flex items-center space-x-2">
                <Avatar name={session.user.name} image={session.user.image} />
                <span className="cursor-pointer font-medium hover:text-primary">
                  {session.user.name}
                </span>
              </Link>

              {/* Sign Out ONLY on Profile Page */}
              {isProfilePage && (
                <button
                  className="btn-primary"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </button>
              )}

              <div className="cursor-pointer text-2xl">🛒</div>
            </>
          ) : (
            <>
              <button
                className="btn-primary"
                onClick={() => (window.location.href = "/login")}
              >
                Sign In
              </button>
              <div className="cursor-pointer text-2xl">🛒</div>
            </>
          )}

        </div>

        <div className="md:hidden text-2xl text-primary ml-auto cursor-pointer">☰</div>
      </div>
    </nav>
  );
}

export default Navbar;
