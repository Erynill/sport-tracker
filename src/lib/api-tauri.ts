import { invoke } from "@tauri-apps/api/core";
import { NewSessionPayload } from "./schemas";

export const api = {
  sport: {
    list: () => invoke<Sport[]>("list_sports"),
  },

  exercise: {
    listBySport: (sportId: number) => invoke<Exercise[]>("list_exercises_by_sport", { sportId }),
  },

  session: {
    createFull: (payload: NewSessionPayload) => invoke<number>("create_full_session", { payload }),
  },
};
