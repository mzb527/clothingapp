import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSkus, createSku, updateSku, deleteSku } from "../services/inventory";
import useDebounce from "./useDebounce";

export function useSkus({ page, per_page, q, sort_by, order, filters }) {
  const debouncedQ = useDebounce(q, 300);
  return useQuery(
    ["skus", { page, per_page, debouncedQ, sort_by, order, filters }],
    () => fetchSkus({ page, per_page, q: debouncedQ, sort_by, order, ...filters }),
    { keepPreviousData: true }
  );
}

export function useCreateSku() {
  const qc = useQueryClient();
  return useMutation(createSku, {
    onSuccess: () => qc.invalidateQueries("skus")
  });
}
export function useUpdateSku() {
  const qc = useQueryClient();
  return useMutation(({ id, data }) => updateSku(id, data), {
    onSuccess: () => qc.invalidateQueries("skus")
  });
}
export function useDeleteSku() {
  const qc = useQueryClient();
  return useMutation(deleteSku, {
    onSuccess: () => qc.invalidateQueries("skus")
  });
}