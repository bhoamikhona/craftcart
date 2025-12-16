"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useContext, useState, createContext } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children, onApplyFilters }) {
  const [expanded, setExpanded] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);

  return (
    <aside className=" left-0 bg-white rounded-4xl">
      <nav className="sticky top-0 h-full flex flex-col shadow-[0_0_48px_rgba(0,0,0,0.15)] rounded-r-4xl">
        <div className="p-4 pb-2 flex justify-end items-center">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-full shadow-md bg-gray-100 hover:bg-gray-200 cursor-pointer mb-2"
            aria-label={expanded ? "Collapse filters" : "Expand filters"}
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <SidebarContext.Provider
          value={{
            expanded,
            selectedCategories,
            setSelectedCategories,
            selectedMaterials,
            setSelectedMaterials,
            selectedAvailability,
            setSelectedAvailability,
            selectedPrice,
            setSelectedPrice,
          }}
        >
          <ul className="flex-1 px-3 flex flex-col gap-4">{children}</ul>
        </SidebarContext.Provider>

        {expanded && (
          <div className="flex flex-col">
            {/* APPLY FILTERS */}
            <button
              className="bg-primary h-10 m-4 rounded-xl text-white hover:bg-orange-600 cursor-pointer"
              onClick={() =>
                onApplyFilters({
                  selectedCategories,
                  selectedMaterials,
                  selectedAvailability,
                  selectedPrice,
                })
              }
            >
              Apply Filters
            </button>

            {/* RESET FILTERS */}
            <button
              className="bg-gray-200 h-10 m-4 mt-0 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-gray-900 cursor-pointer"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedMaterials([]);
                setSelectedAvailability([]);
                setSelectedPrice(null);

                document
                  .querySelectorAll("input[type='checkbox']")
                  .forEach((el) => (el.checked = false));

                document
                  .querySelectorAll("input[type='range']")
                  .forEach((el) => {
                    el.value = el.min;
                  });

                onApplyFilters({
                  selectedCategories: [],
                  selectedMaterials: [],
                  selectedAvailability: [],
                  selectedPrice: null,
                });
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, checkList, range }) {
  const {
    expanded,
    setSelectedCategories,
    setSelectedMaterials,
    setSelectedAvailability,
    setSelectedPrice,
  } = useContext(SidebarContext);

  const [rangeValue, setRangeValue] = useState(range ? range[0] : 0);

  const makeId = (s) =>
    String(s)
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <li
      className={`${
        expanded && "bg-[#f8f8fa]"
      } rounded-2xl py-2 pb-4 flex flex-col items-center`}
    >
      <div
        className={`
          relative flex items-center text-gray-600 px-3 my-1 font-medium rounded-md transition-colors
          ${
            active
              ? "bg-linear-to-tr from-orange-200 to-orange-100 text-orange-600"
              : expanded
              ? "hover:bg-[#f8f8fa]"
              : "hover:bg-white"
          }
          ${expanded ? "ml-8 py-2" : ""}
        `}
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
        className={`transition-all ${
          expanded ? "w-52 overflow-visible" : "w-0 overflow-hidden"
        }`}
      >
        {expanded &&
          checkList &&
          checkList.map((c) => {
            const id = makeId(`${text}-${c}`);
            return (
              <div
                key={c}
                className="input-control flex flex-row-reverse items-center justify-between gap-3 w-full"
              >
                <input
                  type="checkbox"
                  name={c}
                  id={id}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    if (text === "Category") {
                      setSelectedCategories((prev) =>
                        checked ? [...prev, c] : prev.filter((x) => x !== c)
                      );
                    }

                    if (text === "Material") {
                      setSelectedMaterials((prev) =>
                        checked ? [...prev, c] : prev.filter((x) => x !== c)
                      );
                    }

                    if (text === "Availability") {
                      setSelectedAvailability((prev) =>
                        checked ? [...prev, c] : prev.filter((x) => x !== c)
                      );
                    }
                  }}
                  className="peer
                    relative appearance-none cursor-pointer w-3.5 h-3.5 border border-gray-500 rounded-sm
                    focus:outline-none checked:bg-primary checked:border-primary
                    hover:border hover:border-primary
                    after:content-[''] after:w-full after:h-full after:absolute after:left-0 after:top-0
                    after:bg-no-repeat after:bg-center after:bg-size-[27px]
                    after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')]
                  "
                />

                <label
                  htmlFor={id}
                  className="text-sm text-gray-500 w-full peer-checked:text-black cursor-pointer"
                >
                  {c}
                </label>
              </div>
            );
          })}

        {expanded &&
          range &&
          (() => {
            const min = range[0];
            const max = range[1];
            const percent = ((rangeValue - min) / (max - min)) * 100;

            return (
              <div className="input-control w-full px-1">
                <div className="relative w-full pt-6 mb-2">
                  <div
                    className="absolute top-0 pointer-events-none"
                    style={{
                      left: `calc(${percent}%)`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <span className="rounded-md bg-gray-900 text-white text-[11px] px-2 py-0.5 shadow-sm">
                      ${rangeValue}
                    </span>
                  </div>

                  <input
                    type="range"
                    name={makeId(`${text}-range`)}
                    id={makeId(`${text}-range`)}
                    min={min}
                    max={max}
                    value={rangeValue}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setRangeValue(val);
                      setSelectedPrice(val);
                    }}
                    className="w-full accent-orange-500 cursor-pointer appearance-none h-2 rounded-full bg-linear-to-r from-orange-200 to-orange-400 hover:from-[#ffb366] hover:to-[#ff8533] transition-all duration-75 ease-in-out"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>${min}</span>
                  <span>${max}</span>
                </div>

                <label htmlFor={makeId(`${text}-range`)} className="sr-only">
                  {text} Range
                </label>
              </div>
            );
          })()}
      </div>
    </li>
  );
}
