use chrono::NaiveDate;
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Session {
  id: i64,
  sport_id: i64,
  date_session: NaiveDate,
  notes: Option<String>,
}
