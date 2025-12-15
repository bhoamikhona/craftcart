"use client";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function Steps({ steps }) {
  const [activeStep, setActiveStep] = useState(0);

  const toggleStep = (index) => {
    setActiveStep(index === activeStep ? -1 : index);
  };

  return (
    // <div className="bg-white rounded-xl shadow-[0_0_28px_rgba(0,0,0,0.15)] p-6 w-full">
    <div className="border border-gray-200 rounded-xl p-6 w-full">
      <h2 className="text-md font-bold mb-6">How It Is Made:</h2>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          return (
            <div
              key={step.number}
              className={`border rounded-xl p-2 cursor-pointer transition 
                          ${
                            isActive
                              ? "bg-[#FFF4EA] border-[#F66322]"
                              : "bg-white border-gray-200"
                          }`}
              onClick={() => toggleStep(index)}
            >
              <div className="flex items-center justify-between">
                {/* Number Badge */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs text-white font-semibold 
                              ${isActive ? "bg-orange-500" : "bg-gray-300"}`}
                >
                  {step.number}
                </div>

                <div className="flex-1 px-4">
                  <p className="text-sm">{step.text}</p>
                </div>

                <div>
                  {isActive ? (
                    <Check className="text-orange-500" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
