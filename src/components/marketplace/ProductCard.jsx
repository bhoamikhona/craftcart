// File: src/components/marketplace/ProductCard.jsx

import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    // Helper function to render star ratings
    const renderRating = (rating) => {
        const filledStars = Math.round(rating);
        // Note: Using standard Tailwind colors for star rating remains acceptable here
        // for distinct visibility (yellow-500).
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < filledStars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-100'}`}
                        aria-hidden="true"
                    />
                ))}
                <span className="ml-1 text-xs text-[var(--foreground)] opacity-70 font-medium">({rating.toFixed(1)})</span>
            </div>
        );
    };

    return (
        // Using the 'card' utility class for background, border, and shadow
        <div className="card group relative overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl">
            {/* Product Image Link */}
            <div className="w-full h-48 overflow-hidden bg-[var(--muted)] rounded-t-lg -m-4 -mt-4 mb-2">
                <img
                    // Using product.image or product.imageUrl (depending on your final mock data key)
                    src={product.image || product.imageUrl || '/assets/placeholder-craft.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
                />
            </div>

            <div className="p-4 flex flex-col justify-between h-full">
                {/* Name, Price, and Rating */}
                <div className="mb-3">
                    <h3 className="text-base text-[var(--foreground)] font-bold leading-snug">
                        {/* Link to detail page */}
                        <a href={`/products/${product.productId}`} className="hover:text-[var(--primary-hover)] transition-colors">
                            <span aria-hidden="true" className="absolute inset-x-0 bottom-14 top-0" />
                            {product.name}
                        </a>
                    </h3>
                    {/* Price uses the primary color */}
                    <p className="text-2xl font-extrabold text-[var(--primary)] mt-1">${product.price.toFixed(2)}</p>
                    <div className="mt-2">
                        {renderRating(product.rating)}
                    </div>
                </div>
                
                {/* Add to Cart Button (Using btn-primary utility) */}
                <button
                    onClick={() => console.log('Add to cart:', product.id)}
                    className="relative z-10 w-full flex items-center justify-center btn-primary text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;