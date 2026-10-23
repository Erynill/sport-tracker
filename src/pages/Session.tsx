import { ArrowLeft, Calendar, NotebookText, Pencil, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteSession, useGetFullSession } from "../hooks/useSession";
import Button from "../components/ui/Button";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import MinimalCard from "../components/ui/card/MinimalCard";
import ExerciseCard from "../components/ui/card/ExerciseCard";

export default function Session() {
  const navigate = useNavigate();
  const { id: sessionId } = useParams();
  const { data: fullSession } = useGetFullSession(Number(sessionId));
  const { mutateAsync: deleteSession } = useDeleteSession();

  async function handleDeleteSession(sessionId: number) {
    try {
      await deleteSession(sessionId);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {fullSession && (
        <>
          <header className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="cursor-pointer">
                  <ArrowLeft className="text-muted" size={30} />
                </button>
                <h1>{fullSession.session.name}</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="neutral">
                  <Pencil size={18} />
                  Modifier
                </Button>
                <Button variant="warningInverted" onClick={() => handleDeleteSession(fullSession.session.id)}>
                  <Trash />
                </Button>
              </div>
            </div>
            <div className="flex gap-10 items-center ml-11 text-muted w-fit text-base">
              <div className="flex gap-2 items-center text-accent-soft bg-accent/20 rounded-3xl p-1 px-2">
                <DynamicIcon name={fullSession.sport.icon as IconName} />
                {fullSession.sport.name}
              </div>
              <div className="flex gap-2">
                <Calendar />
                <p className="capitalize">
                  {new Date(fullSession.session.dateSession).toLocaleDateString("fr-FR", { dateStyle: "full" })}
                </p>
              </div>
            </div>
          </header>
          <section className="mt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <MinimalCard className="w-full">
                  <div className="text-muted">Exercices</div>
                  <div className="text-3xl ml-2">{fullSession.totalExercises}</div>
                </MinimalCard>
                <MinimalCard className="w-full">
                  <div className="text-muted">Séries</div>
                  <div className="text-3xl ml-2">{fullSession.totalSets}</div>
                </MinimalCard>
                <MinimalCard className="w-full">
                  <div className="text-muted">Répétitions</div>
                  <div className="text-3xl ml-2 text-accent-soft">{fullSession.totalReps}</div>
                </MinimalCard>
                {fullSession.averageRpe && (
                  <MinimalCard className="w-full">
                    <div className="text-muted">RPE moyen</div>
                    <div
                      className={`text-3xl ml-2 ${fullSession.averageRpe >= 9 ? "text-warning-soft" : "text-white"}`}
                    >
                      {fullSession.averageRpe}
                    </div>
                  </MinimalCard>
                )}
              </div>
              {fullSession.session.notes && (
                <div>
                  <MinimalCard className="w-full">
                    <div className="text-muted flex gap-2 items-center">
                      <NotebookText />
                      Notes
                    </div>
                    <div className="ml-2">{fullSession.session.notes}</div>
                  </MinimalCard>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl">Exercices</h3>
              {fullSession.exercises.map((exercise, i) => (
                <ExerciseCard key={i} exercise={exercise} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
