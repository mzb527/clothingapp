import React from "react";

export default function FilterPanel({ filters, setFilter, resetFilters }) {
  return (
    <div className="space-x-2">
      {/* Example: Color filter */}
      <select
        value={filters.color || ""}
        onChange={e => setFilter("color", e.target.value || null)}
      >
        <option value="">All colors</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </select>

      <button onClick={resetFilters} className="text-sm text-gray-600">
        Clear filters
      </button>
    </div>
  );
}