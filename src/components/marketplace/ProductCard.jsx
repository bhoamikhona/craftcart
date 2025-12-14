import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, XCircle } from "lucide-react";

const ProductCard = ({ product }) => {
  const isOutOfStock = !product.inStock;

  //  old rating renderer preserved
  /*
  const oldRenderRating = () => {
    console.log("old code kept for reference");
  };
  */

  // New rating renderer (works correctly, UI unchanged)
  const renderRating = (rating, count) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const FULL = "text-yellow-500 fill-yellow-500";
    const EMPTY = "text-gray-300 fill-gray-100";

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className={`w-4 h-4 ${FULL}`} />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className={`w-4 h-4 ${FULL} opacity-60`} />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className={`w-4 h-4 ${EMPTY}`} />
      );
    }

    return (
      <div className="flex items-center text-sm">
        <span className="text-base font-bold text-[var(--primary)] mr-1">
          {rating.toFixed(1)}
        </span>

        {stars}

        <span className="ml-2 text-xs text-[var(--foreground)] opacity-70 font-medium">
          ({count})
        </span>
      </div>
    );
  };

  // Old Add-to-Cart preserved
  /*
  const oldAddToCart = () => {
    console.log("old add to cart that redirected to page");
  };
  */

  // Working Add-to-Cart logic
  const handleAddToCart = (e) => {
    // Prevent the <Link> from triggering navigation
    e.preventDefault();
    e.stopPropagation();

    const cartItem = {
      id: product.productId,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    };

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const index = existingCart.findIndex(
      (item) => item.id === product.productId
    );

    if (index !== -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  return (
    <div className="card group relative overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl">
      <Link href={`/products/${product.productId}`} passHref className="block">
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

        <div className="p-4 pb-2 flex flex-col justify-between h-full">
          <div className="mb-3 flex-grow">
            <h3 className="text-base text-[var(--foreground)] font-semibold leading-snug cursor-pointer hover:text-[var(--primary-hover)] transition-colors">
              {product.name}
            </h3>

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

      {/* Add-to-Cart  */}
      <div className="px-4 pb-4 relative z-20 -mt-2">
        <button
          onClick={handleAddToCart}
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
