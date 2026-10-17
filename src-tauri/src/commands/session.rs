use chrono::NaiveDate;
use rusqlite::{ Result, params };
use serde::Deserialize;
use tauri::State;

use crate::{ db::DbConnection, models::{ Session, SessionWithSport } };

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewSetPayload {
  rep: i32,
  weight_set: i32,
  rpe: Option<f64>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewExercisePayload {
  exercise_id: i64,
  sets: Vec<NewSetPayload>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NewSessionPayload {
  sport_id: i64,
  name: String,
  date_session: NaiveDate,
  notes: Option<String>,
  exercises: Vec<NewExercisePayload>,
}

#[tauri::command]
pub async fn create_full_session(db: State<'_, DbConnection>, payload: NewSessionPayload) -> Result<i64, String> {
  let mut conn = db.0.lock().map_err(|e| e.to_string())?;

  let tx = conn.transaction().map_err(|e| e.to_string())?;

  tx
    .execute(
      "INSERT INTO sessions (sport_id, name, date_session, notes) VALUES (?1, ?2, ?3, ?4)",
      params![payload.sport_id, payload.name, payload.date_session, payload.notes]
    )
    .map_err(|e| e.to_string())?;
  let session_id = tx.last_insert_rowid();

  {
    let mut stmt = tx
      .prepare("INSERT INTO sets (exercise_id, session_id, rep, weight_set, rpe) VALUES (?1, ?2, ?3, ?4, ?5)")
      .map_err(|e| e.to_string())?;

    for exercise in &payload.exercises {
      for set in &exercise.sets {
        stmt
          .execute(params![exercise.exercise_id, session_id, set.rep, set.weight_set, set.rpe])
          .map_err(|e| e.to_string())?;
      }
    }
  }

  tx.commit().map_err(|e| e.to_string())?;
  Ok(session_id)
}

#[tauri::command]
pub async fn list_sessions_history(db: State<'_, DbConnection>) -> Result<Vec<SessionWithSport>, String> {
  let conn = db.0.lock().map_err(|e| e.to_string())?;

  let mut stmt = conn
    .prepare(
      "SELECT s.id, s.sport_id, s.name AS session_name, s.date_session, s.notes, sp.name AS sport_name, sp.icon
      FROM sessions AS s 
      JOIN sports AS sp ON sp.id = s.sport_id
      ORDER BY s.date_session DESC"
    )
    .map_err(|e| e.to_string())?;

  let sessions_history = stmt
    .query_map([], |row| SessionWithSport::from_row(row))
    .map_err(|e| e.to_string())?
    .collect::<Result<Vec<SessionWithSport>>>()
    .map_err(|e| e.to_string())?;

  Ok(sessions_history)
}
