export interface Trainer {
  _id: string
  name: string
  surname: string
  status: boolean
}

export interface User {
  _id: string;
  status: boolean;
  subscriptions: any[];
  name: string;
  surname: string;
  password: string;
  email: string;
  phone: number;
  phoneEmergency: number;
  role_id: string;
  subscription_id: string;
}
export interface Activity {
  _id: string;
  name: string;
  description: string;
  image: string;
  schedule: {
    [day: string]: string;
  };
  vacancies: {
    [day: string]: number;
  };
  trainer: Trainer
  affiliates: User[];
}

