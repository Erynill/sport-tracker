import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
}

const buttonColor = {
  primary:
    "flex items-center gap-2 text-sidebar font-medium bg-accent p-2 px-4 rounded-xl cursor-pointer transition-all hover:bg-accent-soft hover:scale-110 disabled:cursor-not-allowed disabled:bg-muted disabled:scale-100 active:bg-accent/70 active:scale-105",
};

export default function Button({ variant = "primary", children, ...props }: ButtonProps) {
  return (
    <>
      <button className={buttonColor[variant]} {...props}>
        {children}
      </button>
    </>
  );
}
