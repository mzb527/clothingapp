import React, { useState } from "react";
import { useSkus } from "../../../hooks/useSkus";
import useAuth         from "../../../hooks/useAuth";
import SearchBar       from "../components/SearchBar";
import FilterPanel     from "../components/FilterPanel";
import SortDropdown    from "../components/SortDropdown";
import SKUCard         from "../components/SKUCard";
import AddSkuModal     from "../components/AddSkuModal";
import EditSkuModal    from "../components/EditSkuModal";
import useFilters      from "../../../hooks/useFilters";

export default function InventoryPage() {
  const { user }      = useAuth();
  const { filters, setFilter, resetFilters } = useFilters();
  const [q, setQ]     = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ by: "name", order: "asc" });
  const [addOpen, setAddOpen] = useState(false);
  const [editSku, setEditSku] = useState(null);

  const { data, isLoading } = useSkus({
    page, per_page:25, q, sort_by:sort.by, order:sort.order, filters
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <SearchBar value={q} onChange={setQ} />
        {user.role === "manager" && (
          <button
            onClick={() => setAddOpen(true)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            + Add SKU
          </button>
        )}
      </div>
      <FilterPanel filters={filters} setFilter={setFilter} resetFilters={resetFilters} />
      <SortDropdown sort={sort} onChange={setSort} />

      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {data.items.map(item => (
            <SKUCard
              key={item.id}
              sku={{
                ...item,
                onEdit: () => setEditSku(item)
              }}
              userRole={user.role}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between">
        <button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
        <span>{data.page} / {Math.ceil(data.total/data.per_page)}</span>
        <button disabled={page>=Math.ceil(data.total/data.per_page)} onClick={()=>setPage(page+1)}>Next</button>
      </div>

      <AddSkuModal isOpen={addOpen} onClose={()=>setAddOpen(false)} />
      <EditSkuModal sku={editSku} isOpen={!!editSku} onClose={()=>setEditSku(null)} />
    </div>
  );
}