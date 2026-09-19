use rusqlite::{ Result, Row };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Set {
  id: i64,
  exercise_id: i64,
  session_id: i64,
  rep: i32,
  weight_set: i32,
}

impl Set {
  pub fn from_row(row: &Row) -> Result<Set> {
    Ok(Set {
      id: row.get("id")?,
      exercise_id: row.get("exercise_id")?,
      session_id: row.get("session_id")?,
      rep: row.get("rep")?,
      weight_set: row.get("weight_set")?,
    })
  }
}
