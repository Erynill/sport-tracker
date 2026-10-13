//models types

interface ExerciseSet {
  id: number;
  exerciseId: number;
  sessionId: number;
  rep: number;
  weightSet: number;
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
  dateSession: Date;
  notes: string | null;
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

//form types

interface ExerciseFormSession {
  exerciseId: number;
  name: string;
  sets: SetFormSession[];
}

interface SetFormSession {
  reps: number | "";
  weightSet: number | "";
}
