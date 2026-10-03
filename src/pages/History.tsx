import HistoryCard from "../components/ui/card/HistoryCard";

export default function History() {
  return (
    <>
      <header>
        <h1 className="pt-1">Historique des séances</h1>
      </header>
      <section className="py-15 px-10">
        <HistoryCard icon="info" title="Titre" subtitle="soustitre" date="date" />
      </section>
    </>
  );
}
