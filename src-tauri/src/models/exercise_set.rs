use rusqlite::{ Result, Row };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ExerciseSet {
  pub id: i64,
  pub exercise_id: i64,
  pub session_id: i64,
  pub rep: i32,
  pub weight_set: i32,
  pub rpe: Option<f64>,
}

impl ExerciseSet {
  pub fn from_row(row: &Row) -> Result<ExerciseSet> {
    Ok(ExerciseSet {
      id: row.get("id")?,
      exercise_id: row.get("exercise_id")?,
      session_id: row.get("session_id")?,
      rep: row.get("rep")?,
      weight_set: row.get("weight_set")?,
      rpe: row.get("rpe")?,
    })
  }
}
