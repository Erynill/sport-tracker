import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api-tauri";

export function useSport() {
  return useQuery({ queryKey: ["sports"], queryFn: () => api.sport.list(), staleTime: Infinity });
}
