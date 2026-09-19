use chrono::NaiveDate;
use rusqlite::{ Result, Row };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct WeightTracking {
  id: i64,
  date_weight: NaiveDate,
  weight_tracked: f64,
}

impl WeightTracking {
  pub fn from_row(row: &Row) -> Result<WeightTracking> {
    Ok(WeightTracking {
      id: row.get("id")?,
      date_weight: row.get("date_weight")?,
      weight_tracked: row.get("weight_tracked")?,
    })
  }
}
