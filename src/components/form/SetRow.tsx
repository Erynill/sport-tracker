import Input from "../ui/Input";

interface SetRowProps {
  set: SetFormSession;
  index: number;
  onChange: (field: "reps" | "weightSet" | "rpe", value: number | "") => void;
}

export default function SetRow({ set, index, onChange }: SetRowProps) {
  return (
    <div className="grid grid-cols-[0.1fr_1fr_1fr_1fr] gap-5 px-7 items-center">
      <span>{index}</span>
      <Input
        id={`reps${index}`}
        type="number"
        value={set.reps}
        onChange={(e) => onChange("reps", e.target.value === "" ? "" : Number(e.target.value))}
      />
      <Input
        id={`weightSet${index}`}
        type="number"
        value={set.weightSet}
        onChange={(e) => onChange("weightSet", e.target.value === "" ? "" : Number(e.target.value))}
      />
      <Input
        id={`rpe${index}`}
        type="number"
        value={set.rpe}
        onChange={(e) => onChange("rpe", e.target.value === "" ? "" : Number(e.target.value))}
      />
    </div>
  );
}
