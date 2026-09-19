use chrono::NaiveDate;
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct WeightTracking {
  id: i64,
  date_weight: NaiveDate,
  weight_tracked: f64,
}
