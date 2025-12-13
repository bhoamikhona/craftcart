"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useContext, useState, createContext } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen">
      <nav className="sticky top-0 h-full flex flex-col bg-orange-50 border-2 border-l-0 border-orange-100 rounded-r-lg">
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
  return (
    <li>
      <div
        className={`
      relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-colors ${
        active
          ? "bg-linear-to-tr from-orange-200 to-orange-100 text-orange-600"
          : "hover:bg-orange-50"
      }
      }`}
      >
        {icon}
        <strong
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </strong>
      </div>
      <div
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {expanded &&
          checkList &&
          checkList.map((c) => (
            <div
              key={c}
              className="input-control flex items-center justify-start pl-5 gap-3"
            >
              <input type="checkbox" name={c} id={c} />
              <label htmlFor={c}>{c}</label>
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
