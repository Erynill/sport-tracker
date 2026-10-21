use serde::Serialize;

use crate::models::{ ExerciseSet, Session, Sport };

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ExerciseDetail {
  pub id: i64,
  pub name: String,
  pub total_sets: i32,
  pub total_reps: i32,
  pub estimated_1rm: f64,
  pub sets: Vec<ExerciseSet>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FullSession {
  pub session: Session,
  pub sport: Sport,
  pub exercises: Vec<ExerciseDetail>,
  pub total_exercises: i32,
  pub total_sets: i32,
  pub total_reps: i32,
  pub average_rpe: Option<f64>,
}
