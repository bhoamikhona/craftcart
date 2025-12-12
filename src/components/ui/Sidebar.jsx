"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useContext, useState, createContext } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`h-screen transition-all duration-300 ${expanded ? "w-64" : "w-20"}`}>
      {/* <nav className="sticky top-0 h-full flex flex-col bg-orange-50 border-2 border-l-0 border-orange-100 rounded-r-lg"> */}
      <nav className="sticky top-0 h-full flex flex-col 
                      bg-[#ff6600]/10 
                      border border-[#ff6600]/20 
                      rounded-r-2xl 
                      shadow-sm
                      space-y-4">
        <div className="p-4 pb-2 flex justify-end items-center">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100"
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
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
          flex items-center gap-2
          py-2 px-3 my-2
          font-semibold text-[#3b3b3b]
          rounded-lg transition-all
          ${active
            ? "bg-linear-to-tr from-[#FFE6CC] to-[#FFD9B0] text-[#cc5500] shadow-sm"
            : "hover:bg-[#FFF2E6]"
          }
        `}
      >
        {icon}
        <strong
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
            }`}
        >
          {text}
        </strong>
      </div>
      <div
        className={`overflow-visible transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {expanded &&
          checkList &&
          checkList.map((c) => (
            <div
              key={c}
              // className="input-control flex items-center justify-start pl-5 gap-3"
              className="
                flex items-center gap-3 
                pl-3 py-1.5
                text-sm text-black
                hover:text-[#ff6600] 
                transition-colors
              "
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-400 text-[#ff6600] focus:ring-[#ff6600]/40"
                name={c} id={c} />
              <label htmlFor={c}>{c}</label>
            </div>
          ))}

        {expanded && range && (
          <div className="input-control relative w-full overflow-visible">
            {/* PRICE BUBBLE */}
            <div
              className="
                absolute -top-5 z-50
                text-xs bg-white px-2 py-1 rounded-md shadow 
                border border-[#ffd8b3] text-gray-700
              "
              style={{
                left: `calc(${((value - range[0]) / (range[1] - range[0])) * 100}% - 12px)`
              }}
            >
              ${value}
            </div>
            <input
              type="range"
              name={`${text}-range`}
              id={`${text}-range`}
              min={range[0]}
              max={range[1]}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="
                w-full accent-[#ff6600] cursor-pointer
                mt-1 mb-3 appearance-none h-2 rounded-full 
                bg-linear-to-r from-[#ffcc99] to-[#ff9966] 
                hover:from-[#ffb366] hover:to-[#ff8533]
              "
            />
            <label htmlFor={`${text}-range`} className="sr-only">
              {text} Range
            </label>
          </div>
        )}
      </div>
    </li>
  );
}
