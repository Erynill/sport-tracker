import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ id, label, ...props }: InputProps) {
  return (
    <div className="text-lg">
      {label && (
        <label htmlFor={id} className="text-white/70">
          {label}
        </label>
      )}
      <input
        id={id}
        className="block w-full p-1 px-2 bg-app border border-line scheme-dark rounded-lg cursor-text focus:border-accent/80 focus:outline-none placeholder:text-muted [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        {...props}
      />
    </div>
  );
}
