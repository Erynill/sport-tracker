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

interface ExerciseSet {
  id: number;
  exerciseId: number;
  sessionId: number;
}

interface;
