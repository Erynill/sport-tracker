use rusqlite::{ Result, Row };
use serde::Serialize;

use crate::models::{ Session, Sport };

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SessionWithSport {
  session: Session,
  sport: Sport,
}

impl SessionWithSport {
  pub fn from_row(row: &Row) -> Result<SessionWithSport> {
    Ok(SessionWithSport {
      session: Session {
        id: row.get("id")?,
        sport_id: row.get("sport_id")?,
        name: row.get("session_name")?,
        date_session: row.get("date_session")?,
        notes: row.get("notes")?,
      },
      sport: Sport {
        id: row.get("sport_id")?,
        name: row.get("sport_name")?,
        icon: row.get("icon")?,
      },
    })
  }
}
