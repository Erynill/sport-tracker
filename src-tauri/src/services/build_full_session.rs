use crate::{
  models::{ ExerciseDetail, FullSession, SessionWithSport, SetWithExercise },
  services::stats::estimate_1rm,
};

pub fn build_full_session(session: SessionWithSport, rows: Vec<SetWithExercise>) -> FullSession {
  let mut exercises: Vec<ExerciseDetail> = Vec::new();

  for row in rows {
    let existing = exercises.iter().position(|exercise| exercise.id == row.set.id);
    match existing {
      Some(i) => exercises[i].sets.push(row.set),
      None =>
        exercises.push(ExerciseDetail {
          id: row.set.exercise_id,
          name: row.exercise_name,
          total_sets: 0,
          total_reps: 0,
          estimated_1rm: 0.0,
          sets: vec![row.set],
        }),
    }
  }

  for exercise in &mut exercises {
    exercise.total_sets = exercise.sets.len() as i32;
    exercise.total_reps = exercise.sets
      .iter()
      .map(|set| set.rep)
      .sum();
    exercise.estimated_1rm = exercise.sets
      .iter()
      .map(|set| estimate_1rm(set.weight_set as f64, set.rep as f64))
      .fold(0.0, f64::max);
  }

  let total_exercises = exercises.len() as i32;
  let total_sets = exercises
    .iter()
    .map(|exercise| exercise.total_sets)
    .sum::<i32>();
  let total_reps = exercises
    .iter()
    .map(|exercise| exercise.total_reps)
    .sum::<i32>();
  let rpes = exercises
    .iter()
    .flat_map(|exercise| exercise.sets.iter())
    .filter_map(|set| set.rpe)
    .collect::<Vec<f64>>();
  let average_rpe = if rpes.is_empty() { None } else { Some(rpes.iter().sum::<f64>() / (rpes.len() as f64)) };

  FullSession {
    session: session.session,
    sport: session.sport,
    exercises,
    total_exercises,
    total_sets,
    total_reps,
    average_rpe,
  }
}
