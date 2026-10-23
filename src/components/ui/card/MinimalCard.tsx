interface MinimalCardProps {
  className?: string;
  children?: React.ReactNode;
}

export default function MinimalCard({ className, children }: MinimalCardProps) {
  return (
    <div className={className + " " + "flex flex-col gap-1 p-3 px-5 bg-card border border-line rounded-xl text-lg"}>
      {children}
    </div>
  );
}
