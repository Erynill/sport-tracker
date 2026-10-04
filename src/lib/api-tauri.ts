import { invoke } from "@tauri-apps/api/core";

export const api = {
  sport: {
    list: () => invoke<Sport[]>("list_sports"),
  },

  exercise: {
    listBySport: (sportId: number) => invoke<Exercise[]>("list_exercises", { sportId }),
  },
};
