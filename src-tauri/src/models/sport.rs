use rusqlite::{ Result, Row };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Sport {
  pub id: i64,
  pub name: String,
  pub icon: String,
}

impl Sport {
  pub fn from_row(row: &Row) -> Result<Sport> {
    Ok(Sport {
      id: row.get("id")?,
      name: row.get("name")?,
      icon: row.get("icon")?,
    })
  }
}
