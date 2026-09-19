use chrono::NaiveDate;
use rusqlite::{ Result, Row };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Session {
  id: i64,
  sport_id: i64,
  date_session: NaiveDate,
  notes: Option<String>,
}

impl Session {
  pub fn from_row(row: &Row) -> Result<Session> {
    Ok(Session {
      id: row.get("id")?,
      sport_id: row.get("sport_id")?,
      date_session: row.get("date_session")?,
      notes: row.get("notes")?,
    })
  }
}
