use tauri::Manager;

mod db;
mod models;
mod commands;

use commands::sport;
use commands::exercise;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder
    ::default()
    .setup(|app| {
      let db_connection = db::init_db(app.handle())?;
      app.manage(db_connection);
      Ok(())
    })
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![sport::list_sports, exercise::list_exercises_by_sport])
    .run(tauri::generate_context!())
    .expect("Une erreur a eu lieu au démarrage");
}
