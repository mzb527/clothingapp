import React from "react";

export default function SortDropdown({ sort, onChange }) {
  return (
    <select
      value={`${sort.by}_${sort.order}`}
      onChange={e => {
        const [by, order] = e.target.value.split("_");
        onChange({ by, order });
      }}
    >
      <option value="name_asc">Name ↑</option>
      <option value="name_desc">Name ↓</option>
      <option value="stock_asc">Stock ↑</option>
      <option value="stock_desc">Stock ↓</option>
    </select>
  );
}