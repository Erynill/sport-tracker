import { Plus } from "lucide-react";
import Button from "../components/ui/Button";

function getCurrentWeekLabel(): String {
  const currentDate = new Date();
  const startCurrentWeek = new Date(currentDate);
  startCurrentWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  return startCurrentWeek.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

export default function Dashboard() {
  return (
    <>
      <header className="flex justify-between">
        <div>
          <span>Semaine du {getCurrentWeekLabel()}</span>
          <h1 className="pt-1">Dashboard</h1>
        </div>
        <div className="self-center text-xl">
          <Button>
            <Plus />
            Nouvelle séance
          </Button>
        </div>
      </header>
    </>
  );
}
