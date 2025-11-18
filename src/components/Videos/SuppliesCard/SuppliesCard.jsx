import React from "react";
import "./SuppliesCard.css";

export default function SuppliesCard({ products }) {
  return (
    <div className="supplies-card">
      <div className="supplies-header">
        <h3>Supplies Needed</h3>
        <span>$24.99</span>
      </div>

      {products.map((item, i) => (
        <div key={i} className="supply-row">
          <p>{item.name}</p>
          <p>${item.price}</p>
          <button>+</button>
        </div>
      ))}

      <button className="add-all">Add All</button>
      <button className="save-tutorial">Save Tutorial</button>
    </div>
  );
}
