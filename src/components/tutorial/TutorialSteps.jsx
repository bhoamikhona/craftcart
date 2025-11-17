"use client";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function TutorialSteps({ steps }) {
  const [activeStep, setActiveStep] = useState(0); // first step expanded

  const toggleStep = (index) => {
    setActiveStep(index === activeStep ? -1 : index);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full">
      <h2 className="text-xl font-bold mb-6">Step-by-Step Instructions</h2>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          return (
            <div
              key={step.stepNumber}
              className={`border rounded-xl p-4 cursor-pointer transition 
                          ${isActive ? "bg-[#FFF4EA] border-[#F66322]" : "bg-white border-gray-200"}`}
              onClick={() => toggleStep(index)}
            >
              <div className="flex items-center justify-between">
                {/* Number Badge */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold 
                              ${isActive ? "bg-orange-500" : "bg-gray-300"}`}
                >
                  {step.stepNumber}
                </div>

                {/* Step Title + Description preview */}
                <div className="flex-1 px-4">
                  <p className="font-semibold">{step.title}</p>
                  {!isActive && <p className="text-gray-500 text-sm truncate">{step.description}</p>}
                </div>

                {/* Icon */}
                <div>
                  {isActive ? <Check className="text-orange-500" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </div>

              {/* Expanded content */}
              {isActive && (
                <div className="mt-4 text-gray-700 text-sm">
                  <p>{step.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
