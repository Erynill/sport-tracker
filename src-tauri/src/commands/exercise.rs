use rusqlite::Result;
use tauri::State;

use crate::{ db::DbConnection, models::Exercise };

#[tauri::command]
pub async fn list_exercises_by_sport(db: State<'_, DbConnection>, sport_id: i64) -> Result<Vec<Exercise>, String> {
  let conn = db.0.lock().map_err(|e| e.to_string())?;

  let mut stmt = conn
    .prepare("SELECT * FROM exercises WHERE sport_id = :id ORDER BY name ASC")
    .map_err(|e| e.to_string())?;

  let exercises = stmt
    .query_map(&[(":id", &sport_id)], |row| Exercise::from_row(row))
    .map_err(|e| e.to_string())?
    .collect::<Result<Vec<Exercise>>>()
    .map_err(|e| e.to_string())?;

  Ok(exercises)
}
