const PRODUCTS = [
  {
    id: "prod-001",
    brand: "Calvin Klein",
    name: "Fall Limited Edition Sneakers",
    description:
      "These low-profile sneakers are your perfect casual wear companion.",
    price: 250,
    discountPercent: 50,
    image: "/images/sample-product.jpg"
  },
  {
    id: "prod-002",
    brand: "Nike",
    name: "Air Max 97",
    description:
      "Lightweight and comfortable sneakers designed for everyday use.",
    price: 180,
    discountPercent: null,
    image: "/images/sample-product.jpg"
  }
];

export default async function ProductDetailPage(props) {
  const params = await props.params;
  const id = params.id;

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <div className="max-w-7xl mx-auto p-8">Product not found</div>;
  }

  const discountedPrice = product.discountPercent
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : product.price;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT: Image section */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg border"
          />

          <div className="flex gap-4 mt-4">
            {[1, 2, 3, 4].map(i => (
              <img
                key={i}
                src={product.image}
                alt="Thumbnail"
                className="w-20 h-20 rounded border cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Product info */}
        <div>
          <p className="uppercase text-sm tracking-wide text-gray-500">
            {product.brand}
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          {/* Price section */}
          <div className="mt-6">
            {product.discountPercent ? (
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">
                  ${discountedPrice}
                </span>
                <span className="line-through text-gray-400">
                  ${product.price}
                </span>
                <span className="bg-orange-100 text-orange-600 px-2 py-1 text-sm rounded">
                  {product.discountPercent}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">
                ${product.price}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">
              Add to cart
            </button>

            <button className="border px-6 py-3 rounded hover:bg-gray-50">
              Wishlist
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
