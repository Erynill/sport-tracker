import { ChevronDown } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { useEffect, useRef, useState } from "react";

interface SelectOptions {
  value: string | number;
  label: string;
  icon?: string;
}

interface SelectProps {
  id?: string;
  label?: string;
  options: SelectOptions[];
  value: string | number;
  placeholder?: string;
  onChange: (value: string | number) => void;
}

export default function Select({ id, label, options, value, placeholder, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative text-lg">
      <label htmlFor={id}>{label}</label>
      <button
        type="button"
        id={id}
        onClick={() => setOpen(!open)}
        className="flex w-full bg-app border border-line rounded-lg justify-between items-center p-1 pr-2 cursor-pointer focus:border-accent/80"
      >
        <p className={`flex gap-3 items-center ${selected ? "" : "text-muted"}`}>
          {selected?.icon && <DynamicIcon name={selected?.icon as IconName} className="text-accent-soft" />}
          {selected?.label ?? placeholder}
        </p>
        <ChevronDown className={`text-muted transition-all ${open && "rotate-180"}`} />
      </button>
      {open && (
        <ul className="absolute border border-line w-full rounded-lg z-10">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-1 ${selected?.value === option.value ? "text-accent-soft/80 bg-accent/10" : "cursor-pointer hover:bg-card"}`}
              >
                {option.icon && <DynamicIcon name={option.icon as IconName} className="text-accent-soft" />}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
