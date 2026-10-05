import { ArrowLeft } from "lucide-react";
import Select from "../components/ui/Select";
import { useNavigate } from "react-router-dom";
import { useSport } from "../hooks/useSport";
import { useState } from "react";

export default function NewSession() {
  const navigate = useNavigate();
  const { data: sports } = useSport();
  const [sportId, setSportId] = useState<number | null>(null);

  return (
    <>
      <header className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft className="text-muted" size={30} />
        </button>
        <h1>Nouvelle séance</h1>
      </header>
      <div className="bg-card">
        <Select
          id="sport"
          label="Sport"
          value={sportId ?? ""}
          placeholder="Selectionnez votre sport"
          onChange={(value) => setSportId(Number(value))}
          options={sports?.map((sport) => ({ value: sport.id, label: sport.name, icon: sport.icon })) ?? []}
        />
      </div>
    </>
  );
}
