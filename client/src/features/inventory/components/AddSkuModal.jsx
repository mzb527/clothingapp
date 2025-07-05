import React, { useState, useEffect } from "react";
import { useCreateSku } from "../../../hooks/useSkus";
import { fetchCategories } from "../../../services/categories";
import { fetchVendors }    from "../../../services/vendors";

export default function AddSkuModal({ isOpen, onClose }) {
  const createSku = useCreateSku();
  const [cats, setCats] = useState([]);
  const [vens, setVens] = useState([]);
  const [form, setForm] = useState({
    name: "", sku_code: "", stock: 0, price: 0, color: "", size: "",
    category_id: "", vendor_id: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchCategories().then(setCats);
      fetchVendors().then(setVens);
      setForm(f => ({ ...f, name: "", sku_code: "", stock: 0, price: 0 }));
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createSku.mutateAsync({
        ...form,
        category_id: form.category_id || null,
        vendor_id: form.vendor_id   || null
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create SKU");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-80 space-y-4"
      >
        <h3 className="text-lg font-semibold">Add SKU</h3>
        {error && <p className="text-red-600">{error}</p>}
        {["name","sku_code","color","size"].map(fld => (
          <input
            key={fld}
            placeholder={fld.replace("_"," ")}
            value={form[fld]}
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
            className="px-3 py-1 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}