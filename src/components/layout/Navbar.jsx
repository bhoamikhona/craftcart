'use client';
import React from "react";
import Link from "next/link"; 

import Container from "./Container";

function Navbar() {
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
          <Link href="/marketplace" passHref legacyBehavior>
              <li className="text-foreground hover:text-primary cursor-pointer transition-colors">
                  Marketplace
              </li>
          </Link>
            {/* <li className="hover:text-primary cursor-pointer">Workshops</li></Link> */}
            {/* <li className="hover:text-primary cursor-pointer">Sell</li></Link> */}
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-4 shrink-0">
            <button className="btn-primary" onClick={() => (window.location.href = "/login")}>Sign In</button>
            <div className="cursor-pointer text-2xl">🛒</div>
        </div>

        <div className="md:hidden text-2xl text-primary ml-auto cursor-pointer">☰</div>
      </div>
    </nav>
  );
}

export default Navbar;
