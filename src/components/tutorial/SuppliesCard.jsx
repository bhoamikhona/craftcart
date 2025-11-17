import { products as allProducts } from "@/data/products";

export default function SuppliesCard({ products }) {
  const tutorialProducts = products.map((id) =>
    allProducts.find((p) => p.productId === id)
  );

  const totalPrice = tutorialProducts.reduce((acc, p) => acc + (p?.price || 0), 0);

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <div className="flex justify-between font-semibold mb-4">
        <span>Supplies Needed</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex flex-col gap-4">
        {tutorialProducts.map((p) => (
          <div key={p.productId} className="grid grid-cols-[40px_1fr_auto] items-center gap-4">
            <img src={p.image} alt={p.name} className="w-10 h-10 rounded" />
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-gray-500 text-sm">{p.price.toFixed(2)} USD</p>
            </div>
            <button className="bg-orange-500 text-white px-3 py-1 rounded-lg font-semibold">
              Add
            </button>
          </div>
        ))}
      </div>

      <button className="mt-4 bg-orange-500 text-white py-2 rounded-lg font-semibold w-full">Add All Supplies</button>
      <button className="mt-2 border border-orange-500 text-orange-500 py-2 rounded-lg font-semibold w-full">Save Tutorial</button>
    </div>
  );
}
