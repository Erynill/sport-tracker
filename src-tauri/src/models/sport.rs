use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Sport {
  id: i64,
  name: String,
}
