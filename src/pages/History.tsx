import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import HistoryCard from "../components/ui/card/HistoryCard";

export default function History() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="pt-1">Historique des séances</h1>
        <div className="self-center text-xl">
          <Button>
            <Plus />
            Nouvelle séance
          </Button>
        </div>
      </header>
      <section className="py-15 px-10">
        <HistoryCard />
      </section>
    </>
  );
}
