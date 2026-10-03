use rusqlite::Result;
use tauri::State;

use crate::{ db::DbConnection, models::Sport };

#[tauri::command]
pub async fn list_sports(db: State<'_, DbConnection>) -> Result<Vec<Sport>, String> {
  let conn = db.0.lock().map_err(|e| e.to_string())?;

  let mut stmt = conn.prepare("SELECT * FROM sports ORDER BY name ASC").map_err(|e| e.to_string())?;

  let sports = stmt
    .query_map([], |row| Sport::from_row(row))
    .map_err(|e| e.to_string())?
    .collect::<Result<Vec<Sport>>>()
    .map_err(|e| e.to_string())?;

  Ok(sports)
}
