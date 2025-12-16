import Link from "next/link.js";
import "./ui-styles/ProductCard.css";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SmallProductCard({ product }) {
  const handleAddToCart = (e) => {
    e.preventDefault(); // stop Link navigation
    e.stopPropagation(); // stop bubbling

    try {
      const cartItem = {
        id: product.productId,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0] ?? "",
      };

      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

      const index = existingCart.findIndex(
        (item) => item.id === product.productId
      );

      if (index !== -1) {
        existingCart[index].quantity += 1;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));

      // 🔔 notify the app immediately
      window.dispatchEvent(new Event("cart-updated"));

      toast.success("Successfully added");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Could not add to cart");
    }
  };

  return (
    <Link
      className="product-link p-4 py-6 border-b border-orange-300 last:border-b-0"
      href={`/shop/${product.productId}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-4">
          <div className="img-container h-[60] w-[60] rounded-lg overflow-hidden">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <div className="pt-1.5">
            <h3>{product.name}</h3>
            <span className="text-sm text-gray-600">${product.price}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="cursor-pointer px-3 py-2 rounded-lg hover:bg-orange-200"
        >
          <ShoppingCart color="black" size={20} />
        </button>
      </div>
    </Link>
  );
}
