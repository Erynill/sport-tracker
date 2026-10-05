import { ChevronRight } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface HistoryCardProps {
  icon: String;
  title: String;
  subtitle: String;
  date: String;
  onClick?: () => void;
}

export default function HistoryCard({ icon, title, subtitle, date, onClick }: HistoryCardProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="flex items-center px-5 py-3 gap-5 bg-card border border-line w-full rounded-xl cursor-pointer transition-all hover:border-accent hover:scale-101"
      >
        <div className="p-2 bg-accent/10 rounded-xl">
          <DynamicIcon name={icon as IconName} size={32} className="text-accent-soft" />
        </div>
        <div className="text-left flex-1">
          <p className="text-lg">{title}</p>
          <p className="text-muted">{subtitle}</p>
        </div>
        <div className="flex text-muted gap-3">
          <p>{date}</p>
          <ChevronRight />
        </div>
      </button>
    </>
  );
}
