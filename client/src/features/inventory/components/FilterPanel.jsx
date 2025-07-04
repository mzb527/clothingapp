import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../../services/categories";
import { fetchVendors }    from "../../../services/vendors";

export default function FilterPanel({ filters, setFilter, resetFilters }) {
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors]       = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchVendors().then(setVendors);
  }, []);

  return (
    <div className="space-x-2">
      {/* Category filter */}
      <select
        value={filters.category_id || ""}
        onChange={e => setFilter("category_id", e.target.value ? +e.target.value : null)}
      >
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* Vendor filter */}
      <select
        value={filters.vendor_id || ""}
        onChange={e => setFilter("vendor_id", e.target.value ? +e.target.value : null)}
      >
        <option value="">All Vendors</option>
        {vendors.map(v => (
          <option key={v.id} value={v.id}>{v.name}</option>
        ))}
      </select>

      <button onClick={resetFilters} className="text-sm text-gray-600">
        Clear filters
      </button>
    </div>
  );
}