use rusqlite_migration::{ Migrations, M };

pub fn migrations() -> Migrations<'static> {
  Migrations::new(
    vec![
      // Migration 1 : schéma initial
      M::up(
        "
      CREATE TABLE sports (
        id INTEGER PRIMARY KEY,
        nom TEXT NOT NULL UNIQUE
      );

      CREATE TABLE exercises (
        id INTEGER PRIMARY KEY,
        nom TEXT NOT NULL UNIQUE,
        sport_id INTEGER NOT NULL,
        FOREIGN KEY (sport_id) REFERENCES sports(id)
      );

      CREATE TABLE sessions (
        id INTEGER PRIMARY KEY,
        date_session TEXT NOT NULL CHECK (date_session IS date(date_session)),
        notes TEXT,
        sport_id INTEGER NOT NULL,
        FOREIGN KEY (sport_id) REFERENCES sports(id)
      );

      CREATE TABLE series (
        id INTEGER PRIMARY KEY,
        rep INTEGER NOT NULL CHECK (rep > 0),
        weight_serie INTEGER NOT NULL CHECK (weight_serie >= 0),
        exercise_id INTEGER NOT NULL,
        session_id INTEGER NOT NULL,
        FOREIGN KEY (exercise_id) REFERENCES exercises(id),
        FOREIGN KEY (session_id) REFERENCES sessions(id)
      );

      CREATE TABLE track_weight (
        id INTEGER PRIMARY KEY,
        date_weight TEXT NOT NULL CHECK (date_weight IS date(date_weight)),
        value_weight REAL
      );
      "
      )
    ]
  )
}
