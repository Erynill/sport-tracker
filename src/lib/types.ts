//models types

interface ExerciseSet {
  id: number;
  exerciseId: number;
  sessionId: number;
  rep: number;
  weightSet: number;
  rpe?: number;
}

interface Exercise {
  id: number;
  sportId: number;
  name: string;
}

interface Session {
  id: number;
  sportId: number;
  name: string;
  dateSession: string;
  notes?: string;
}

interface Sport {
  id: number;
  name: string;
  icon: string;
}

interface WeightTracking {
  id: number;
  dateWeight: string;
  weightTracked: number;
}

interface SessionWithSport {
  session: Session;
  sport: Sport;
}

interface ExerciseDetail {
  id: number;
  name: string;
  totalSets: number;
  totalReps: number;
  estimated1rm: number;
  sets: ExerciseSet[];
}

interface FullSession {
  session: Session;
  sport: Sport;
  exercises: ExerciseDetail[];
  totalExercises: number;
  totalSets: number;
  totalReps: number;
  averageRpe?: number;
}

//form types

interface ExerciseFormSession {
  exerciseId: number;
  name: string;
  sets: SetFormSession[];
}

interface SetFormSession {
  rep: number | "";
  weightSet: number | "";
  rpe: number | "";
}
