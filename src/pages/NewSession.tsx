import { ArrowLeft } from "lucide-react";
import Select from "../components/ui/Select";
import { useNavigate } from "react-router-dom";
import { useSport } from "../hooks/useSport";
import { useState } from "react";
import Input from "../components/ui/Input";
import ExercisePicker from "../components/form/ExercisePicker";
import ExerciseBlock from "../components/form/ExerciseBlock";

export default function NewSession() {
  const navigate = useNavigate();
  const { data: sports } = useSport();

  const [sportId, setSportId] = useState<number | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [exercises, setExercises] = useState<ExerciseFormSession[]>([]);

  function handleAddExercise(exerciseId: number, exerciseName: string): void {
    setExercises((prev) => [
      ...prev,
      { id: exerciseId, name: exerciseName, sets: [{ reps: "", weightSet: "", rpe: "" }] },
    ]);
  }

  function handleRemoveExercise(index: number): void {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  }

  function handleUpdateExercise(
    exerciseIndex: number,
    setIndex: number,
    field: "reps" | "weightSet" | "rpe",
    value: number | "",
  ): void {
    setExercises((prev) =>
      prev.map((exercise, i) =>
        i === exerciseIndex
          ? { ...exercise, sets: exercise.sets.map((set, j) => (j === setIndex ? { ...set, [field]: value } : set)) }
          : exercise,
      ),
    );
  }

  function handleAddSet(exerciceIndex: number): void {
    setExercises((prev) =>
      prev.map((exercise, i) =>
        i === exerciceIndex
          ? { ...exercise, sets: [...exercise.sets, { reps: "", weightSet: "", rpe: "" }] }
          : exercise,
      ),
    );
  }

  return (
    <>
      <header className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft className="text-muted" size={30} />
        </button>
        <h1>Nouvelle séance</h1>
      </header>
      <section className="mt-10">
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 bg-card border border-line p-5 px-7 rounded-xl">
            <div>
              <Input id="nameSession" label="Nom de la séance" type="text" placeholder="Nom..." />
            </div>
            <div>
              <Input
                id="dateSession"
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Select
                id="sport"
                label="Sport"
                value={sportId ?? ""}
                placeholder="Selectionnez votre sport"
                onChange={(value) => {
                  setExercises([]);
                  setSportId(Number(value));
                }}
                options={sports?.map((sport) => ({ value: sport.id, label: sport.name, icon: sport.icon })) ?? []}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h3 className="text-xl">Exercices</h3>
              <ExercisePicker sportId={sportId} onSelect={handleAddExercise} />
            </div>
            {exercises.map((exercise, i) => (
              <ExerciseBlock
                exercise={exercise}
                index={i}
                onRemove={() => handleRemoveExercise(i)}
                onUpdateSet={(setIndex, field, value) => handleUpdateExercise(i, setIndex, field, value)}
                onAddSet={() => handleAddSet(i)}
              />
            ))}
            <div className="border border-dashed border-line rounded-xl bg-card text-muted text-center py-10 text-lg">
              Aucun autre exercice ajouté
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
