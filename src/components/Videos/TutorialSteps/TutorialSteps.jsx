'use client';
import React, { useState } from "react";
import './TutorialSteps.css';

export default function TutorialSteps({ steps }) {
  const [active, setActive] = useState(0);
  return (
    <div className="steps-container">
      <h3>Step-by-Step Instructions</h3>

      {steps.map((s, i) => (
        <div
          key={i}
          className={`step-card ${active === i ? "active" : ""}`}
          onClick={() => setActive(i)}
        >
          <div className="step-number">{i + 1}</div>
          <div>
            <h4>{s.title}</h4>
            {active === i && <p className="step-desc">{s.description}</p>}
          </div>
          <div className="chevron">{active === i ? "✔" : "›"}</div>
        </div>
      ))}
    </div>
  );
}
