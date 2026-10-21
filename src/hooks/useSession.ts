import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api-tauri";

export function useCreateFullSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.session.createFull,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sessionsHistory"] });
    },
  });
}

export function useSessionWithSport() {
  return useQuery({
    queryKey: ["sessionsHistory"],
    queryFn: () => api.session.listWithSport(),
    staleTime: 3 * 60 * 1000,
  });
}
