interface ExerciseCardProps {
  exercise: ExerciseDetail;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <article className="flex flex-col p-5 px-7 bg-card border border-line rounded-xl gap-3">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-xl">{exercise.name}</h3>
          <span>
            {exercise.totalSets} séries • {exercise.totalReps} reps
          </span>
        </div>
        <div className="text-accent-soft bg-accent/20 rounded-3xl p-1 px-2 text-base">
          {exercise.estimated1rm > 0 ? `1RM est ${Math.round(exercise.estimated1rm)} kg` : `Poids de corps`}
        </div>
      </div>
      <table className="text-left">
        <thead className="text-muted">
          <tr>
            <th scope="col">#</th>
            <th scope="col">REPS</th>
            <th scope="col">POIDS</th>
            <th scope="col">RPE</th>
          </tr>
        </thead>
        <tbody>
          {exercise.sets.map((set, i) => (
            <tr key={i} className="border-t border-line">
              <th scope="row" className="text-muted py-2">
                {i + 1}
              </th>
              <th>{set.rep}</th>
              <th>{set.weightSet} kg</th>
              <th className={set.rpe ? (set.rpe >= 9 ? "text-warning-soft" : "text-white") : ""}>
                {set.rpe ? set.rpe : "-"}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
