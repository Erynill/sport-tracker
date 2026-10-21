use rusqlite::{ Result, Row };

use crate::models::{ ExerciseSet };

#[derive(Debug)]
pub struct SetWithExercise {
  pub set: ExerciseSet,
  pub exercise_name: String,
}

impl SetWithExercise {
  pub fn from_row(row: &Row) -> Result<SetWithExercise> {
    Ok(SetWithExercise {
      set: ExerciseSet::from_row(row)?,
      exercise_name: row.get("name")?,
    })
  }
}
