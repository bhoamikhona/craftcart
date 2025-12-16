"use client";

export default function Tabs({ activeTab, setActiveTab }) {
  const tabBase = "px-4 py-2 rounded-full transition-colors cursor-pointer";
  const active =
    "bg-primary text-white font-bold border-orange-200 text-gray-900 tracking-wide";
  const inactive = "bg-white border-gray-200 text-gray-600 hover:bg-gray-100";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => setActiveTab("details")}
        className={`${tabBase} ${activeTab === "details" ? active : inactive}`}
      >
        Details
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("products")}
        className={`${tabBase} ${activeTab === "products" ? active : inactive}`}
      >
        Products
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("steps")}
        className={`${tabBase} ${activeTab === "steps" ? active : inactive}`}
      >
        Steps
      </button>
    </div>
  );
}
