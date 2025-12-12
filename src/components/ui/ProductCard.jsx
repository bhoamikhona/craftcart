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
    image,
    images,
    rating,
    category,
    material,
  },
}) {
  return (
    <Link href={`/shop/${productId}`} className="block h-full">
      <article
        className="
          relative
          flex flex-col
          h-full
          rounded-2xl
          bg-white
          shadow-[0_12px_30px_rgba(0,0,0,0.1)]
          overflow-hidden
          transition-transform duration-300
          hover:-translate-y-1
        "
      >

        {/* <div className="relative z-10 flex justify-center mt-8">
          <img
            src={images?.[0]}
            alt={name}
            className="
              h-44
              object-contain
              drop-shadow-xl
            "
          />
        </div> */}
        <div className="relative z-10 mt-6 px-4">
        {/* <div className="relative z-10 "> */}
          <div
            className="
      w-full
      h-48
      overflow-hidden
      rounded-bl-[3rem]
      rounded-tr-xl
      rounded-tl-xl
      rounded-br-xl
      bg-gray-100
      shadow-md
    "
          >
            <img
              src={images?.[0]}
              alt={name}
              className="
        w-full h-full
        object-cover
      "
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
          <h2 className="font-semibold text-lg text-gray-900 mb-1">
            {name}
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            {description?.substring(0, 90)}...
          </p>

          <div className="mt-auto flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">
              ${price}
            </p>

            <button
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-xl
                text-sm font-medium
                text-white
                transition-colors
                bg-orange-500
                hover:bg-orange-600
              "
            >
              Add to Cart <CgShoppingCart className="text-lg" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}


