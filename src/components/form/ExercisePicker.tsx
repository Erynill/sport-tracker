import { useState } from "react";
import { useExerciseBySport } from "../../hooks/useExercise";
import { Plus } from "lucide-react";

interface ExercisePickerProps {
  sportId: number | null;
}

export default function ExercisePicker({ sportId }: ExercisePickerProps) {
  const { data: exercises } = useExerciseBySport(sportId ?? 0);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-lg text-accent-soft border border-line p-1 px-2 rounded-xl cursor-pointer transition-colors hover:border-accent-soft"
      >
        <Plus />
        Ajouter un exercice
      </button>
      {open && (
        <ul className="absolute w-full max-h-60 overflow-y-auto">
          {exercises?.map((exercise) => (
            <li key={exercise.id}>
              <button type="button">{exercise.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
