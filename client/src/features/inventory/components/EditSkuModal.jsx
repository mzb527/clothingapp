import React, { useState, useEffect } from "react";
import { useUpdateSku }      from "../../../hooks/useSkus";
import { fetchCategories }   from "../../../services/categories";
import { fetchVendors }      from "../../../services/vendors";

export default function EditSkuModal({ sku, isOpen, onClose }) {
  const updateSku = useUpdateSku();
  const [cats, setCats] = useState([]);
  const [vens, setVens] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (isOpen && sku) {
      fetchCategories().then(setCats);
      fetchVendors().then(setVens);
      setForm({
        name: sku.name,
        sku_code: sku.sku_code,
        stock: sku.stock,
        price: sku.price,
        color: sku.color,
        size: sku.size,
        category_id: sku.category || "",
        vendor_id: sku.vendor   || ""
      });
    }
  }, [isOpen, sku]);

  const handleSubmit = async e => {
    e.preventDefault();
    await updateSku.mutateAsync({ id: sku.id, data: form });
    onClose();
  };

  if (!isOpen || !sku) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-80 space-y-4"
      >
        <h3 className="text-lg font-semibold">Edit {sku.name}</h3>
        {["name","sku_code","color","size"].map(fld => (
          <input
            key={fld}
            placeholder={fld.replace("_"," ")}
            value={form[fld]||""}
            onChange={e => setForm({...form, [fld]: e.target.value})}
            className="w-full p-2 border rounded"
          />
        ))}
        <div className="flex space-x-2">
          <input
            type="number" placeholder="stock"
            value={form.stock}
            onChange={e => setForm({...form, stock:+e.target.value})}
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number" placeholder="price"
            value={form.price}
            onChange={e => setForm({...form, price:+e.target.value})}
            className="w-1/2 p-2 border rounded"
          />
        </div>
        <select
          value={form.category_id}
          onChange={e => setForm({...form, category_id:e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="">Category…</option>
          {cats.map(c=>(
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={form.vendor_id}
          onChange={e => setForm({...form, vendor_id:e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="">Vendor…</option>
          {vens.map(v=>(
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose}
            className="px-3 py-1 border rounded">Cancel</button>
          <button type="submit"
            className="px-3 py-1 bg-green-600 text-white rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}