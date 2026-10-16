import z from "zod";

export const setSessionFormSchema = z.object({
  rep: z
    .number()
    .int("Le nombre de répétitions doit être entier")
    .positive("Le nombre de répétition doit être supérieur à 0"),
  weightSet: z.number().min(0, "Le poids ne peut pas être négatif"),
});

export const exerciseFormSessionSchema = z.object({
  exerciseId: z.number(),
  sets: z.array(setSessionFormSchema).min(1, "Chaque exercice doit contenir au moins une série"),
});

export const newSessionSchema = z.object({
  sportId: z.number(),
  name: z.string().max(20, "Le nom ne doit pas excéder 20 caractères"),
  dateSession: z.iso.date("La date doit être sous le format ISO 8601"),
  notes: z.string().max(200, "Vos notes doivent comportés maximum 200 caractères").optional(),
  exercises: z.array(exerciseFormSessionSchema).min(1, "Une séance doit avoir au moins un exercice"),
});

export type NewSessionPayload = z.infer<typeof newSessionSchema>;
