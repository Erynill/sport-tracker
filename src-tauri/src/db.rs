use std::{ error::Error, fs::create_dir_all, sync::Mutex };

use rusqlite::Connection;
use tauri::{ AppHandle, Manager };

mod pool;
mod schema;

pub struct DbConnection(Mutex<Connection>);

pub fn init_db(app_handle: &AppHandle) -> Result<DbConnection, Box<dyn Error>> {
  let db_path = app_handle.path().app_data_dir()?.join("sport_tracker.db");

  if let Some(parent_dir) = db_path.parent() {
    create_dir_all(parent_dir)?;
  }

  let mut conn = pool::open_connection(db_path)?;

  schema::migrations().to_latest(&mut conn)?;

  Ok(DbConnection(Mutex::new(conn)))
}
