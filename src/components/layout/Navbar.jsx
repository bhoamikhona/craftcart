import React from "react";
import Container from "./Container";

function Navbar() {
  return (
    <nav className="bg-background border-b border-[var(--border-color)] sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
    
    <div className="flex-shrink-0">
      <div className="text-2xl font-bold text-primary cursor-pointer">
        CraftCart
      </div>
    </div>

    <div className="hidden md:flex space-x-8 justify-center flex-1">
      <ul className="flex space-x-8 font-medium text-foreground w-full justify-center">
        <li className="hover:text-primary cursor-pointer">Tutorials</li>
        <li className="hover:text-primary cursor-pointer">Marketplace</li>
        <li className="hover:text-primary cursor-pointer">Workshops</li>
        <li className="hover:text-primary cursor-pointer">Sell</li>
      </ul>
    </div>

    <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
      <button className="btn-primary">Sign In</button>
      <div className="cursor-pointer text-2xl">🛒</div>
    </div>

    {/* Mobile Hamburger */}
    <div className="md:hidden text-2xl text-primary ml-auto cursor-pointer">☰</div>
  </div>
</nav>

  );
}

export default Navbar;
