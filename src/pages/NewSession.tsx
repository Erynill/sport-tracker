import { ArrowLeft } from "lucide-react";
import Select from "../components/ui/Select";
import { useNavigate } from "react-router-dom";
import { useSport } from "../hooks/useSport";
import { useState } from "react";
import Input from "../components/ui/Input";
import ExercisePicker from "../components/form/ExercisePicker";
import ExerciseBlock from "../components/form/ExerciseBlock";
import Button from "../components/ui/Button";
import { newSessionSchema } from "../lib/schemas";
import { useCreateFullSession } from "../hooks/useSession";
import TextArea from "../components/ui/TextArea";

export default function NewSession() {
  const navigate = useNavigate();
  const { data: sports } = useSport();
  const { mutateAsync: createFullSession } = useCreateFullSession();

  const [sportId, setSportId] = useState<number | null>(null);
  const [dateSession, setDateSession] = useState(() => new Date().toLocaleDateString("en-CA"));
  const [name, setName] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [exercises, setExercises] = useState<ExerciseFormSession[]>([]);

  function handleAddExercise(exerciseId: number, exerciseName: string): void {
    setExercises((prev) => [
      ...prev,
      { exerciseId: exerciseId, name: exerciseName, sets: [{ rep: "", weightSet: "" }] },
    ]);
  }

  function handleRemoveExercise(index: number): void {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  }

  function handleUpdateExercise(
    exerciseIndex: number,
    setIndex: number,
    field: "rep" | "weightSet",
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
        i === exerciceIndex ? { ...exercise, sets: [...exercise.sets, { rep: "", weightSet: "" }] } : exercise,
      ),
    );
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const payload = {
      sportId,
      name,
      dateSession,
      notes,
      exercises: exercises.map((exercise) => ({
        exerciseId: exercise.exerciseId,
        sets: exercise.sets.map((set) => ({
          rep: set.rep === "" ? undefined : Number(set.rep),
          weightSet: set.weightSet === "" ? undefined : Number(set.weightSet),
        })),
      })),
    };

    const result = newSessionSchema.safeParse(payload);
    if (!result.success) {
      console.log(result.error);
      return;
    }

    try {
      await createFullSession(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 bg-card border border-line p-5 px-7 rounded-xl">
            <div className="col-span-2">
              <Input
                id="nameSession"
                label="Nom de la séance"
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Nom..."
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
            <div>
              <Input
                id="dateSession"
                label="Date"
                type="date"
                value={dateSession}
                onChange={(e) => setDateSession(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2">
              <TextArea
                id="notes"
                label="Notes (optionnel)"
                value={notes ?? ""}
                onChange={(e) => setNotes(e.target.value)}
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
                key={i}
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
          <div className="grid grid-cols-3 gap-5">
            <Button type="button" onClick={() => navigate(-1)} variant="neutralWarning">
              <div className="text-center w-full">Annuler</div>
            </Button>
            <Button type="submit" variant="primary" className="col-span-2">
              <div className="text-center w-full">Enregistrer la séance</div>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
