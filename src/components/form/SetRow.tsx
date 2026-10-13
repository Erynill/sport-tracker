import Input from "../ui/Input";

interface SetRowProps {
  set: SetFormSession;
  index: number;
  onChange: (field: "reps" | "weightSet", value: number | "") => void;
}

export default function SetRow({ set, index, onChange }: SetRowProps) {
  return (
    <>
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
    </>
  );
}
