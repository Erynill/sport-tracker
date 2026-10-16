import { Plus, Trash } from "lucide-react";
import SetRow from "./SetRow";

interface ExerciseBlockProps {
  exercise: ExerciseFormSession;
  index: number;
  onRemove: () => void;
  onUpdateSet: (setIndex: number, field: "rep" | "weightSet", value: number | "") => void;
  onAddSet: () => void;
}

export default function ExerciseBlock({ exercise, onRemove, onUpdateSet, onAddSet }: ExerciseBlockProps) {
  return (
    <article className="flex flex-col p-5 px-7 bg-card rounded-xl border border-line gap-3">
      <div className="flex justify-between">
        <h3 className="text-xl">{exercise.name}</h3>
        <button type="button" onClick={onRemove}>
          <Trash className="text-muted cursor-pointer transition-all hover:text-warning hover:scale-110" />
        </button>
      </div>
      <div className="grid grid-cols-[0.1fr_1fr_1fr] gap-5 gap-y-2 px-7 items-center">
        <span></span>
        <span>REPS</span>
        <span>POIDS (KG)</span>
        {exercise.sets.map((set, i) => (
          <SetRow key={i} set={set} index={i + 1} onChange={(field, value) => onUpdateSet(i, field, value)} />
        ))}
      </div>
      <div>
        <button
          type="button"
          className="flex items-center gap-2 text-accent-soft text-lg p-1 px-2 rounded-xl cursor-pointer transition-all active:scale-95"
          onClick={onAddSet}
        >
          <Plus />
          Ajouter une série
        </button>
      </div>
    </article>
  );
}
