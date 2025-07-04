import React from "react";

export default function SKUCard({ sku }) {
  return (
    <div className="border p-2 rounded shadow-sm">
      <h4 className="font-semibold">{sku.name}</h4>
      <p>SKU#: {sku.sku}</p>
      <p>Stock: {sku.stock}</p>
    </div>
  );
}