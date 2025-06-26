import React from "react";
import SKUCard from "./SKUCard";

export default function SKUList({ items }) {
  if (!items.length) return <p>No SKUs found.</p>;
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(sku => (
        <SKUCard key={sku.id} sku={sku} />
      ))}
    </div>
  );
}