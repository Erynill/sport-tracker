import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function TextArea({ id, label, ...props }: TextAreaProps) {
  return (
    <div className="text-lg">
      {label && (
        <label htmlFor={id} className="text-white/70">
          {label}
        </label>
      )}
      <textarea
        name={id}
        id={id}
        className="block w-full p-1 px-2 bg-app border border-line scheme-dark rounded-lg cursor-text focus:border-accent/80 focus:outline-none placeholder:text-muted"
        {...props}
      ></textarea>
    </div>
  );
}
