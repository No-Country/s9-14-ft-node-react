export interface Trainer {
  _id: string
  name: string
  surname: string
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
  _id: string
  name: string
  trainer: Trainer
  description: string
  image: string
  days: string
  affiliates: unknown // TODO: define affiliates type
}

