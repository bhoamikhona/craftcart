import Image from "next/image.js";
import Link from "next/link.js";
import "./ui-styles/ProductCard.css";
import { CgShoppingCart } from "react-icons/cg";

export default function ProductCard({
  product: {
    productId,
    name,
    description,
    inStock,
    price,
    images,
    rating,
    category,
    material,
  },
}) {
  return (
    <Link className="product-link" href={`/shop/${productId}`}>
      <article className="flex flex-col h-full gap-4 items-stretch justify-stretch p-5 rounded-2xl shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)]">
        <div className="product-img-container rounded-lg overflow-hidden shadow-sm">
          <img src={images[0]} alt={name} className="product-img" />
        </div>
        <div className="product-info-container h-auto w-full flex flex-col justify-between flex-1">
          <div>
            <h2 className="font-bold mb-2">{name}</h2>
            <p className="text-sm text-gray-600 mb-8">
              {description.substring(0, 90) + "..."}
            </p>
          </div>

          <div className="flex items-center justify-between self-end w-full">
            <p className="font-bold text-xl text-[#353535]">${price}</p>
            <button className="btn-primary flex items-center gap-2">
              Add to Cart <CgShoppingCart className="text-bold text-lg" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
