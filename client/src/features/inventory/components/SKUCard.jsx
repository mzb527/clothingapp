import React, { useState } from "react";
import { useDeleteSku } from "../../../hooks/useSkus";

export default function SKUCard({ sku, userRole }) {
  const deleteSku = useDeleteSku();
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="border p-3 rounded shadow-sm relative">
      <h4 className="font-semibold">{sku.name}</h4>
      <p>Code: {sku.sku_code}</p>
      <p>Stock: {sku.stock}</p>
      <p>Category: {sku.category || "—"}</p>
      <p>Vendor: {sku.vendor   || "—"}</p>

      {userRole === "manager" && (
        <div className="absolute top-2 right-2 space-x-1">
          <button onClick={() => sku.onEdit(sku)}
            className="text-blue-600">Edit</button>
          <button onClick={() => setConfirm(true)}
            className="text-red-600">Delete</button>
        </div>
      )}

      {confirm && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center space-y-2">
          <p>Confirm delete?</p>
          <div className="space-x-2">
            <button onClick={() => { setConfirm(false); }}
              className="px-2 py-1 border rounded">Cancel</button>
            <button onClick={() => deleteSku.mutate(sku.id)}
              className="px-2 py-1 bg-red-600 text-white rounded">Yes</button>
          </div>
        </div>
      )}
    </div>
  );
}