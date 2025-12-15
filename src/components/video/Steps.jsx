"use client";
import { useState } from "react";
import { Check } from "lucide-react";

export default function Steps({ steps = [] }) {
  const [done, setDone] = useState(() => new Set());

  const toggleDone = (num) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 w-full">
      <h2 className="text-md font-bold mb-6">How It Is Made:</h2>

      <div className="flex flex-col gap-4">
        {steps.map((step) => {
          const isDone = done.has(step.number);

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => toggleDone(step.number)}
              className={`border rounded-xl p-3 cursor-pointer transition text-left
                ${
                  isDone
                    ? "bg-[#FFF4EA] border-[#F66322]"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs text-white font-semibold
                    ${isDone ? "bg-orange-500" : "bg-gray-300"}`}
                >
                  {step.number}
                </div>

                <div className="flex-1 px-4">
                  <p className={`text-sm ${isDone ? "text-gray-600" : ""}`}>
                    {step.text}
                  </p>
                </div>

                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full border
                    ${
                      isDone
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-gray-200 bg-white text-transparent"
                    }`}
                >
                  <Check className="w-4 h-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
