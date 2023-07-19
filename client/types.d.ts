export interface Trainer {
   _id: string;
  name: string;
  surname: string;
  email: string;
  status: boolean;
  phone: number;
  phoneEmergency: number;
  role: string;
  subscriptions: any[];
  birthday: string; 
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
  name: string;
  trainer: Trainer
  image: string;
  totalVacancies: any //definir
  _id: string;
  description: string;
  schedule: any //definir
  freeVacancies: any // definir
  affiliates: any[]; // Puedes cambiar 'any[]' por un tipo específico si conoces la estructura de affiliates.
}

