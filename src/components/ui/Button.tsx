import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "neutralWarning";
}

const buttonColor = {
  primary:
    "flex items-center gap-2 font-medium p-2 px-4 rounded-xl text-sidebar bg-accent cursor-pointer transition-all hover:bg-accent-soft hover:scale-102 disabled:cursor-not-allowed disabled:bg-muted disabled:scale-100 active:bg-accent/70 active:scale-95",
  neutralWarning:
    "flex items-center gap-2 font-medium p-2 px-4 rounded-xl text-white bg-card border border-line cursor-pointer transition-all hover:text-warning-soft hover:scale-102 disabled:cursor-not-allowed disabled:bg-muted disabled:scale-100 active:bg-card/70 active:scale-95",
};

export default function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  return (
    <>
      <button className={className + " " + buttonColor[variant]} {...props}>
        {children}
      </button>
    </>
  );
}
