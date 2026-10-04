import { ArrowLeft } from "lucide-react";
import Select from "../components/ui/Select";
import { useNavigate } from "react-router-dom";

export default function NewSession() {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft className="text-muted" size={30} />
        </button>
        <h1>Nouvelle séance</h1>
      </header>
      <Select id="sport" label="Sport" />
    </>
  );
}
