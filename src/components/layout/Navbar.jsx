// src/components/layout/Navbar.jsx

import React from "react";
// 🎯 IMPORT THE NEXT.JS LINK COMPONENT
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

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 justify-center flex-1">

          <ul className="flex space-x-8 font-medium w-full justify-center">
    
        <li className="text-[var(--foreground)] hover:text-primary cursor-pointer transition-colors">
            Watch
        </li>
    {/* Marketplace Link (Connects to /marketplace page) */}
    <Link href="/marketplace" passHref legacyBehavior>
        {/* Marketplace Link: Default color is text-foreground, only primary on hover */}
        <li className="text-[var(--foreground)] hover:text-primary cursor-pointer transition-colors">
            Marketplace
        </li>
    </Link>
    
      {/* <li className="hover:text-primary cursor-pointer">Workshops</li></Link> */}
            {/* <li className="hover:text-primary cursor-pointer">Sell</li></Link> */}
    
</ul>
        </div>

        {/* Sign In & Cart Icons */}
        <div className="hidden md:flex items-center space-x-4 shrink-0">
            <button className="btn-primary">Sign In</button>
          {/* Cart icon links to the cart page */}
            <div className="cursor-pointer text-2xl">🛒</div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-2xl text-primary ml-auto cursor-pointer">☰</div>
      </div>
    </nav>
  );
}

export default Navbar;
