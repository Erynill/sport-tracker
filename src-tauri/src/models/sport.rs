use rusqlite::{ Result, Row };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Sport {
  id: i64,
  name: String,
}

impl Sport {
  pub fn from_row(row: &Row) -> Result<Sport> {
    Ok(Sport {
      id: row.get("id")?,
      name: row.get("name")?,
    })
  }
}
