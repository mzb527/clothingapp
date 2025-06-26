import { useSearchParams } from "react-router-dom";

export default function useFilters() {
  const [params, setParams] = useSearchParams();
  const filters = Object.fromEntries(params.entries());
  
  function setFilter(key, value) {
    const next = new URLSearchParams(params);
    if (value == null) next.delete(key);
    else next.set(key, value);
    setParams(next);
  }

  function resetFilters() {
    setParams({});
  }

  return { filters, setFilter, resetFilters };
}