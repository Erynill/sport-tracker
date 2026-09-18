use std::path::PathBuf;

use rusqlite::{ Connection, Error };

pub fn open_connection(db_path: PathBuf) -> Result<Connection, Error> {
  let conn = Connection::open(db_path)?;

  conn.pragma_update(None, "foreign_keys", true)?;
  conn.pragma_update(None, "journal_mode", "WAL")?;
  conn.pragma_update(None, "synchronous", "NORMAL")?;

  Ok(conn)
}
