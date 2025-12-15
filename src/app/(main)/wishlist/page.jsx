"use client";

import useWishlist from "@/hooks/useWishlist";
import ProductCard from "@/components/ui/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">You have no saved items.</p>
      ) : (
        <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => (
            <ProductCard
              key={item.id}
              product={{
                productId: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                images: [item.image],
                description: "",
                inStock: true,
                rating: 0,
                category: "",
                material: "",
                specs: [],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
