"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search",
}) {
  return (
    <div className="w-full mx-auto mb-6 flex border-b border-gray-300 relative">
      <div className="absolute">
        <FaMagnifyingGlass className="text-gray-600 absolute top-3" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 pl-8 px-4 py-2 focus:outline-none"
      />
      {/* <button
        onClick={onSearch}
        className="flex items-center justify-center bg-primary text-white px-6 rounded-r-full font-medium hover:bg-primary-dark transition"
      >
        <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
      </button> */}
    </div>
  );
}
