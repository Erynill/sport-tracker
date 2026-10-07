import { useState, useEffect, useRef } from "react";
import { useExerciseBySport } from "../../hooks/useExercise";
import { Plus } from "lucide-react";

interface ExercisePickerProps {
  sportId: number | null;
  onSelect: (exerciseId: number, exerciseName: string) => void;
}

export default function ExercisePicker({ sportId, onSelect }: ExercisePickerProps) {
  const { data: exercises } = useExerciseBySport(sportId ?? 0);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative text-lg">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={!sportId}
        className="flex items-center gap-2 text-accent-soft border border-line p-1 px-2 rounded-xl cursor-pointer transition-colors hover:border-accent-soft focus:border-accent-soft"
      >
        <Plus />
        Ajouter un exercice
      </button>
      {open && (
        <ul className="absolute right-0 w-70 max-h-60 overflow-y-auto bg-app z-10 border border-line rounded-xl">
          {exercises && exercises.length > 0 ? (
            exercises?.map((exercise) => (
              <li key={exercise.id}>
                <button
                  type="button"
                  className="p-1 px-2 hover:text-accent-soft w-full text-left cursor-pointer hover:bg-card"
                  onClick={() => {
                    onSelect(exercise.id, exercise.name);
                    setOpen(false);
                  }}
                >
                  {exercise.name}
                </button>
              </li>
            ))
          ) : (
            <li className="p-1 px-2 text-warning font-bold">Aucun exercice pour ce sport</li>
          )}
        </ul>
      )}
    </div>
  );
}
