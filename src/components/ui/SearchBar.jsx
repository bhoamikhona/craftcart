"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar({ value, onChange, onSearch, placeholder = "Search" }) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6 flex">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
      <button
        onClick={onSearch}
        className="flex items-center justify-center bg-primary text-white px-6 rounded-r-full font-medium hover:bg-primary-dark transition"
      >
        <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
        
      </button>
    </div>
  );
}
