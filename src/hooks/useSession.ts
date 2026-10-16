import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api-tauri";

export function useCreateFullSession() {
  return useMutation({
    mutationFn: api.session.createFull,
  });
}
