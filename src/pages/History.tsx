import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import HistoryCard from "../components/ui/card/HistoryCard";
import { useNavigate } from "react-router-dom";
import { useSessionWithSport } from "../hooks/useSession";

function formatDate(date: string): string {
  const formatedDate = new Date(date);
  const currentDate = new Date();
  const isCurrentYear = formatedDate.getFullYear() === currentDate.getFullYear();

  switch (isCurrentYear) {
    case true:
      return formatedDate.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
    case false:
      return formatedDate.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  }
}

export default function History() {
  const navigate = useNavigate();
  const { data: history } = useSessionWithSport();

  return (
    <>
      <header>
        <h1 className="pt-1">Historique des séances</h1>
      </header>
      <section className="mt-10 px-10 flex flex-col gap-3">
        {history ? (
          history.map((session) => (
            <HistoryCard
              key={session.session.id}
              icon={session.sport.icon}
              title={session.session.name}
              subtitle={session.sport.name}
              date={formatDate(session.session.dateSession)}
              onClick={() => navigate(`/session/${session.session.id}`)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center gap-2 bg-card border border-dashed border-line rounded-xl text-muted text-xl py-10">
            <p>Pas de séance enregistrée pour le moment</p>
            <Button onClick={() => navigate("/session/new")}>
              <Plus />
              Nouvelle séance
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
