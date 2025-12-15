"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function StepsTab({ video, setVideo }) {
  const [stepText, setStepText] = useState("");

  function addStep() {
    const text = stepText.trim();
    if (!text) return;

    setVideo((prev) => ({
      ...prev,
      steps: [...prev.steps, { number: prev.steps.length + 1, text }],
    }));

    setStepText("");
  }

  function deleteStep(number) {
    setVideo((prev) => {
      const remaining = prev.steps.filter((s) => s.number !== number);
      const renumbered = remaining.map((s, idx) => ({ ...s, number: idx + 1 }));
      return { ...prev, steps: renumbered };
    });
  }

  function updateStep(number, newText) {
    setVideo((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.number === number ? { ...s, text: newText } : s
      ),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Steps</h3>
        <p className="text-sm text-gray-600 mt-1">
          Guide your viewers through the process, one step at a time.
        </p>
      </div>

      <div className="space-y-3">
        {video.steps.map((s) => (
          <div
            key={s.number}
            className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3"
          >
            <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold shrink-0 border border-orange-200">
              {s.number}
            </div>

            <input
              value={s.text}
              onChange={(e) => updateStep(s.number, e.target.value)}
              className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-200"
              placeholder={`Step ${s.number}...`}
            />

            <button
              type="button"
              onClick={() => deleteStep(s.number)}
              className="h-10 w-10 rounded-xl border border-gray-300 bg-white grid place-items-center hover:bg-gray-50"
              aria-label="Delete step"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-300 bg-white p-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">Add a step</p>

        <div className="flex gap-2">
          <input
            value={stepText}
            onChange={(e) => setStepText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addStep()}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="Type and press Enter..."
          />

          <button
            type="button"
            onClick={addStep}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
