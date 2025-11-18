// File: src/components/marketplace/ProductCard.jsx (PERFECTED RATING DISPLAY)

import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, XCircle } from "lucide-react";

const ProductCard = ({ product }) => {
  const isOutOfStock = !product.inStock;

  // Renders the star rating with appropriate coloring AND the numerical score
  const renderRating = (rating, count) => {
    // 1. Calculate Full Stars (e.g., 4.7 becomes 4)
    const fullStars = Math.floor(rating);

    // 2. Check for Half Star (if the remainder is 0.5 or greater)
    const hasHalfStar = rating - fullStars >= 0.5;

    // 3. Calculate Empty Stars (5 total minus full and half stars)
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Helper class for fully colored stars
    const FULL_STAR_CLASS = "text-yellow-500 fill-yellow-500";
    // Helper class for empty stars
    const EMPTY_STAR_CLASS = "text-gray-300 fill-gray-100";

    const stars = [];

    // Add FULL Stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className={`w-4 h-4 transition-colors ${FULL_STAR_CLASS}`}
          aria-hidden="true"
        />
      );
    }

    // Add HALF Star (Simulated)
    if (hasHalfStar) {
      // We use a full star icon but give it reduced opacity (50%)
      // and a slightly darker fill color to visually suggest a half-fill.
      stars.push(
        <Star
          key="half"
          className={`w-4 h-4 transition-colors ${FULL_STAR_CLASS} opacity-60`}
          aria-hidden="true"
        />
      );
    }

    // Add EMPTY Stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className={`w-4 h-4 transition-colors ${EMPTY_STAR_CLASS}`}
          aria-hidden="true"
        />
      );
    }

    return (
      <div className="flex items-center text-sm">
        {/* Display the Numerical Rating (Digit) in bold primary color */}
        <span className="text-base font-bold text-[var(--primary)] mr-1">
          {rating.toFixed(1)}
        </span>

        {/* Visual Stars Array */}
        {stars}

        {/* Display review count */}
        <span className="ml-2 text-xs text-[var(--foreground)] opacity-70 font-medium">
          ({count})
        </span>
      </div>
    );
  };

  return (
    // Outer wrapper uses the global .card style and hover effects
    <div className="card group relative overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl">
      <Link href={`/products/${product.productId}`} passHref className="block">
        {/* Image Area (unchanged) */}
        <div className="w-full h-40 md:h-48 overflow-hidden bg-[var(--muted)] rounded-t-lg -m-4 -mt-4 mb-2 relative">
          <img
            src={product.image || "/assets/placeholder-craft.jpg"}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
          />

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-2">
              <XCircle className="w-8 h-8 text-red-400 mb-1" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Product Info Content Area */}
        <div className="p-4 pb-2 flex flex-col justify-between h-full">
          <div className="mb-3 flex-grow">
            <h3 className="text-base text-[var(--foreground)] font-semibold leading-snug cursor-pointer hover:text-[var(--primary-hover)] transition-colors">
              {product.name}
            </h3>

            {/* <p className="text-sm text-[var(--foreground)] opacity-70 mt-1 mb-2 line-clamp-2">
                            {product.description}
                        </p> */}

            {/* RATING BLOCK USAGE */}
            <div className="flex items-center justify-between mt-2 mb-1">
              {renderRating(product.rating, product.reviewCount)}

              <span className="text-xs text-[var(--secondary)] font-medium">
                {product.category || "Item"}
              </span>
            </div>

            <p className="text-2xl font-extrabold text-[var(--primary)]">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button (unchanged) */}
      <div className="px-4 pb-4 relative z-20 -mt-2">
        <button
          onClick={() => console.log("Add to cart:", product.productId)}
          disabled={isOutOfStock}
          className={`relative w-full flex items-center justify-center text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] 
                        ${
                          isOutOfStock
                            ? "bg-gray-400 text-white cursor-not-allowed rounded-lg px-4 py-2"
                            : "btn-primary"
                        }
                    `}
        >
          {isOutOfStock ? (
            <XCircle className="w-4 h-4 mr-2" />
          ) : (
            <ShoppingCart className="w-4 h-4 mr-2" />
          )}
          {isOutOfStock ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
