import React, { useState } from "react";
import { useSkus } from "../../hooks/useSkus";
import useFilters from "../../hooks/useFilters";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import SortDropdown from "../components/SortDropdown";
import SKUList from "../components/SKUList";

export default function InventoryPage() {
  const { filters, setFilter, resetFilters } = useFilters();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ by: "name", order: "asc" });

  const { data, isLoading } = useSkus({
    page,
    per_page: 25,
    q,
    sort_by: sort.by,
    order: sort.order,
    filters
  });

  return (
    <div className="space-y-4">
      <SearchBar value={q} onChange={setQ} />
      <FilterPanel
        filters={filters}
        setFilter={setFilter}
        resetFilters={resetFilters}
      />
      <SortDropdown sort={sort} onChange={setSort} />

      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <>
          <SKUList items={data.items} />
          <div className="flex justify-between">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <span>
              {data.page} / {Math.ceil(data.total / data.per_page)}
            </span>
            <button
              disabled={page >= Math.ceil(data.total / data.per_page)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}