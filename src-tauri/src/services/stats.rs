// Lombardi formula for estimate 1rm
pub fn estimate_1rm(weight: f64, reps: f64) -> f64 {
  weight * reps.powf(0.1)
}
