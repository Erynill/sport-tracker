import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api-tauri";

export function useCreateFullSession() {
  return useMutation({
    mutationFn: api.session.createFull,
  });
}

export function useSessionWithSport() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: () => api.session.list(),
    staleTime: 3 * 60 * 1000,
  });
}
