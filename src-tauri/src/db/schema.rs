use rusqlite_migration::{ Migrations, M };

pub fn migrations() -> Migrations<'static> {
  Migrations::new(
    vec![
      // Migration 1 : schéma initial
      M::up(
        "
      CREATE TABLE sports (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE exercises (
        id INTEGER PRIMARY KEY,
        sport_id INTEGER NOT NULL,
        name TEXT NOT NULL UNIQUE,
        FOREIGN KEY (sport_id) REFERENCES sports(id)
      );

      CREATE TABLE sessions (
        id INTEGER PRIMARY KEY,
        sport_id INTEGER NOT NULL,
        date_session TEXT NOT NULL CHECK (date_session IS date(date_session)),
        notes TEXT,
        FOREIGN KEY (sport_id) REFERENCES sports(id)
      );

      CREATE TABLE sets (
        id INTEGER PRIMARY KEY,
        exercise_id INTEGER NOT NULL,
        session_id INTEGER NOT NULL,
        rep INTEGER NOT NULL CHECK (rep > 0),
        weight_set INTEGER NOT NULL CHECK (weight_set >= 0),
        FOREIGN KEY (exercise_id) REFERENCES exercises(id),
        FOREIGN KEY (session_id) REFERENCES sessions(id)
      );

      CREATE TABLE weight_tracking (
        id INTEGER PRIMARY KEY,
        date_weight TEXT NOT NULL CHECK (date_weight IS date(date_weight)),
        weight_tracked REAL NOT NULL
      );
      "
      )
    ]
  )
}
