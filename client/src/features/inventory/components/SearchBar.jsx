import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search SKUs…"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-3 py-2 border rounded w-full"
    />
  );
}