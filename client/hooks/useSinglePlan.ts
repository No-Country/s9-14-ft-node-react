// import { ExercisePlan } from "@/types";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useSession } from "./useSession";

export function useSinglePlan () {
  // const [plan, setPlan] = useState<ExercisePlan | undefined>()
  const user = useUser()
  const session = useSession()
  
  useEffect(()=> {
    // if (user?._id && session?.token) {
    //   fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainingPlans/${user?._id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'x-token': session.token
    //     }
    //   })
    //   .then(res => {
    //     if (!res.ok) {
    //       throw new Error('Not authorized')
    //     } else {
    //       return res.json()
    //     }
    //   })
    //   .then (res => setPlan(res))
    //   .catch(console.error)
    // }

    // Chicos del back, son unos genios. No se les ocurrió que si el afiliado no tiene permiso para acceder al endpoint, no se puede hacer el PUT :DDD
  }, [user?._id, session?.token])

  return {
    user,
    plan: {
  "_id": "64ad746f054ad30dc0fd2104",
  "name": "Plan 1",
  "trainer": [{
  _id: "64ad746f054ad30dc0fd20e5",
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  status: true,
  phone: 1234567890,
  phoneEmergency: 9876543210,
  role: "Head Trainer",
  birthday: "1990-08-15",
  activities: ['']
}],
  "affiliates": [
    user?._id
  ],
  "exercises": [
    {
      "_id": "64ad746f054ad30dc0fd2105",
      "name": "Sentadillas",
      "setsAndRepetitions": "4x20",
      "weight": 20,
      "duration": 0,
      "days": [
        "lunes",
        "miércoles",
        "viernes"
      ]
    },
    {
      "_id": "64ad746f054ad30dc0fd2106",
      "name": "Press de banca",
      "setsAndRepetitions": "4x12",
      "weight": 25,
      "duration": 0,
      "days": [
        "martes",
        "jueves"
      ]
    },
    {
      "_id": "64ad746f054ad30dc0fd2107",
      "name": "Peso muerto",
      "setsAndRepetitions": "3x10",
      "weight": 30,
      "duration": 0,
      "days": [
        "miércoles",
        "viernes"
      ]
    },
    {
      "_id": "64ad746f054ad30dc0fd2108",
      "name": "Flexiones de brazos",
      "setsAndRepetitions": "3x20",
      "weight": 0,
      "duration": 0,
      "days": [
        "lunes",
        "jueves"
      ]
    }
  ]
}

  }
  // return {plan, user}
}