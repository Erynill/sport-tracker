use rusqlite::{ Result, Row };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Exercise {
  id: i64,
  sport_id: i64,
  name: String,
}

impl Exercise {
  pub fn from_row(row: &Row) -> Result<Exercise> {
    Ok(Exercise {
      id: row.get("id")?,
      sport_id: row.get("sport_id")?,
      name: row.get("name")?,
    })
  }
}
