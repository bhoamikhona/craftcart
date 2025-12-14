"use client";

import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useContext, useState, createContext } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-[80vh] fixed left-0">
      {/* <nav className="sticky top-0 h-full flex flex-col bg-orange-50 border-2 border-l-0 border-orange-100 rounded-r-lg"> */}
      <nav className="sticky top-0 h-full flex flex-col shadow-[0_0_48px_rgba(0,0,0,0.15)] rounded-r-4xl">
        <div className="p-4 pb-2 flex justify-end items-center">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-full shadow-md bg-gray-100 hover:bg-gray-200 cursor-pointer mb-2"
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 flex flex-col gap-4">{children}</ul>
        </SidebarContext.Provider>
        {expanded && (
          <button className="bg-primary h-10 m-4 rounded-xl text-white hover:bg-orange-600 cursor-pointer">
            Apply Filters
          </button>
        )}
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, checkList, range }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`${
        expanded && "bg-[#f8f8fa]"
      } rounded-2xl py-2 pb-4 flex flex-col items-center`}
    >
      <div
        className={`
      relative flex items-center text-gray-600 px-3 my-1 font-medium rounded-md transition-colors ${
        active
          ? "bg-linear-to-tr from-orange-200 to-orange-100 text-orange-600"
          : "hover:bg-gray-100"
      } ${expanded && "ml-8 py-2"}
      }`}
      >
        {icon}
        <strong
          className={`text-sm overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </strong>
      </div>
      <div
        className={`overflow-hidden transition-all ${
          expanded ? "w-52" : "w-0"
        }`}
      >
        {expanded &&
          checkList &&
          checkList.map((c) => (
            <div
              key={c}
              className="input-control flex items-center justify-between gap-3 w-full "
            >
              <label className="text-sm text-gray-500" htmlFor={c}>
                {c}
              </label>
              {/* <input type="checkbox" name={c} id={c} /> */}
              <input
                id={c}
                name={c}
                type="checkbox"
                defaultChecked
                className="appearance-none"
              />

              <span className="">
                <Check size={15} />
              </span>
            </div>
          ))}

        {expanded && range && (
          <div className="input-control">
            <input
              type="range"
              name={`${text}-range`}
              id={`${text}-range`}
              min={range[0]}
              max={range[1]}
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
