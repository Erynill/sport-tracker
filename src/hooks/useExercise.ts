import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api-tauri";

export function useExerciseBySport(sportId: number) {
  return useQuery({
    queryKey: ["exercisesBySport"],
    queryFn: () => api.exercise.listBySport(sportId),
    staleTime: Infinity,
  });
}
