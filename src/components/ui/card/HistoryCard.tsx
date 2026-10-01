import { ChevronRight, icons, Info } from "lucide-react";

interface HistoryCardProps {
  icon: String;
  onClick?: () => void;
}

export default function HistoryCard() {
  return (
    <>
      <button className="flex items-center px-5 py-3 gap-5 bg-card border border-line w-full rounded-xl cursor-pointer transition-all hover:border-accent hover:scale-101">
        <div className="p-2 bg-accent/10 rounded-xl">
          <Info className="text-accent-soft" />
        </div>
        <div className="text-left flex-1">
          <p className="text-lg">Titre</p>
          <p className="text-muted">Sous-titre</p>
        </div>
        <div className="flex text-muted gap-2">
          <p>Date</p>
          <ChevronRight />
        </div>
      </button>
    </>
  );
}
