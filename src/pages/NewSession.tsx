import { ArrowLeft } from "lucide-react";
import Select from "../components/ui/Select";
import { useNavigate } from "react-router-dom";
import { useSport } from "../hooks/useSport";
import { useState } from "react";
import Input from "../components/ui/Input";

export default function NewSession() {
  const navigate = useNavigate();
  const { data: sports } = useSport();
  const [sportId, setSportId] = useState<number | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  return (
    <>
      <header className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft className="text-muted" size={30} />
        </button>
        <h1>Nouvelle séance</h1>
      </header>
      <section className="mt-15">
        <form className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-4 bg-card border border-line p-5 px-7 rounded-xl">
            <div>
              <Input label="Nom de la séance" type="text" placeholder="Nom..." />
            </div>
            <div>
              <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <Select
                id="sport"
                label="Sport"
                value={sportId ?? ""}
                placeholder="Selectionnez votre sport"
                onChange={(value) => setSportId(Number(value))}
                options={sports?.map((sport) => ({ value: sport.id, label: sport.name, icon: sport.icon })) ?? []}
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
