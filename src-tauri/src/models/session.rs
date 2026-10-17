use chrono::NaiveDate;
use rusqlite::{ Result, Row };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Session {
  pub id: i64,
  pub sport_id: i64,
  pub name: String,
  pub date_session: NaiveDate,
  pub notes: Option<String>,
}

impl Session {
  pub fn from_row(row: &Row) -> Result<Session> {
    Ok(Session {
      id: row.get("id")?,
      sport_id: row.get("sport_id")?,
      name: row.get("name")?,
      date_session: row.get("date_session")?,
      notes: row.get("notes")?,
    })
  }
}
