import Link from "next/link.js";
import "./ui-styles/ProductCard.css";
import { ShoppingCart } from "lucide-react";

export default function SmallProductCard({ product }) {
  return (
    <Link
      // className="product-link block h-full shadow-[0_0_48px_rgba(0,0,0,0.15)] p-4 rounded-xl"
      className="product-link bg-[#f8f8fa] p-4 py-6 border-b border-gray-300 last:border-b-0"
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
        <button className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-200">
          <ShoppingCart color="black" size={20} />
        </button>
      </div>
    </Link>
  );
}
