use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Set {
  id: i64,
  exercise_id: i64,
  session_id: i64,
  rep: i32,
  weight_set: i32,
}
