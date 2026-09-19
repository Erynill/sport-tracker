use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Exercise {
  id: i64,
  sport_id: i64,
  name: String,
}
