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
  dateSession: Date;
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
