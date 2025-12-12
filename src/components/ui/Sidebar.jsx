
"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useContext, useState, createContext } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`
        h-screen
        transition-all duration-300
        ${expanded ? "w-64" : "w-20"}
        bg-[#FFF8F1]
      `}
    >
      <nav
        className="
          sticky top-0 h-full flex flex-col
          bg-[#FFF8F1]
          rounded-r-3xl
          shadow-[4px_0_30px_rgba(0,0,0,0.05)]
          py-4
        "
      >
        {/* TOGGLE BUTTON */}
        <div className="px-4 pb-4 flex justify-end">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="
              p-2 rounded-full
              bg-white
              shadow-sm
              hover:bg-[#FFF2E6]
              transition
            "
          >
            {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 space-y-1">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}


export function SidebarItem({ icon, text, active, checkList, range }) {
  const { expanded } = useContext(SidebarContext);
  const [value, setValue] = useState(range ? range[0] : 0);

  return (
    <li>
      <div
        className={`
          flex items-center gap-3
          py-2.5 px-3
          rounded-xl
          font-medium
          transition-all
          cursor-pointer
          ${active
            ? "bg-white text-[#ff6600] shadow-sm"
            : "text-gray-700 hover:bg-white/70"
          }
        `}
      >
        <span className="p-2 rounded-lg bg-[#FFF2E6] text-[#ff6600]">
          {icon}
        </span>

        <span
          className={`overflow-hidden transition-all ${expanded ? "w-44 ml-1" : "w-0"
            }`}
        >
          {text}
        </span>
      </div>

      <div
        className={`transition-all ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden ml-12`}
      >
        {expanded &&
          checkList &&
          checkList.map((c) => (
            <label
              key={c}
              className="
                flex items-center gap-3
                py-1.5 px-2
                rounded-lg
                text-sm text-gray-700
                hover:bg-white/60
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                className="
                  w-4 h-4
                  rounded
                  border-gray-300
                  text-[#ff6600]
                  focus:ring-[#ff6600]/30
                "
              />
              {c}
            </label>
          ))}

        {expanded && range && (
          <div className="relative w-full px-1 pt-6 pb-2">
            {/* Price bubble */}
            <div
              className="
        absolute -top-1 z-20
        text-xs font-medium
        bg-white px-2 py-1
        rounded-md shadow
        border border-orange-200
        text-gray-700
        pointer-events-none
      "
              style={{
                left: `calc(${((value - range[0]) / (range[1] - range[0])) * 100}% - 16px)`
              }}
            >
              ${value}
            </div>

            {/* Range input */}
            <input
              type="range"
              min={range[0]}
              max={range[1]}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="
        w-full cursor-pointer
        appearance-none
        h-2 rounded-full
        bg-linear-to-r from-orange-200 to-orange-400
        accent-orange-500
      "
            />
          </div>
        )}

      </div>
    </li>
  );
}
