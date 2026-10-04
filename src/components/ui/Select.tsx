import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export default function Select({ id, label, ...props }: SelectProps) {
  return (
    <>
      <div>
        <label htmlFor={id} className="text-white/80 text-lg">
          {label}
        </label>
      </div>
      <div>
        <select name="sport" id={id} className=""></select>
      </div>
    </>
  );
}
