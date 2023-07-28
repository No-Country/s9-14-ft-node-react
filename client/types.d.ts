export interface Trainer {
   _id: string;
  name: string;
  surname: string;
  email: string;
  status: boolean;
  phone: number;
  phoneEmergency: number;
  role: string;
  activities: string[]
  birthday: string;
}

export interface User {
  fitMedical: {
    valid: boolean;
    expire: string;
  };
  _id: string;
  name: string;
  surname: string;
  email: string;
  status: boolean;
  phone: number;
  phoneEmergency: number;
  role: string;
  subscriptions: any[] //definir;
  birthday: string;
}
export interface Activity {
  _id: string;
  name: string;
  description: string;
  image: string;
  days: string[];
  schedule: string[];
  quota: number;
  trainer: Trainer;
  affiliates: User[];
  status: boolean
}

interface Exercise {
  name: string;
  setsAndRepetitions: string;
  weight: number;
  duration: number;
  days: string[];
  _id: string;
}

interface ExercisePlan {
  _id: string;
  name: string;
  trainer: Trainer[];
  affiliates: User[];
  exercises: Exercise[];
}