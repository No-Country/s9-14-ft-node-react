import {create} from 'zustand'
import type { ExercisePlan } from '@/types'
import { useEffect } from 'react'
import { useSession } from '@/hooks/useSession'

interface Store {
  plans: ExercisePlan[]
  actions: {
    getAllPlans: (token: string)=> Promise<void>
  }
}

const usePlanStore = create<Store>(set => ({
  plans: [],
  actions: {
    getAllPlans: async (token: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainingPlans`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-token': token
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          set({plans: data.userTrainingPlans})
        } else throw new Error('Error al obtener los planes de entrenamiento')

      } catch (e) {
        console.error(e)
      }
    }
  }
}))

export function usePlanActions () {
  const getAllPlans = usePlanStore(state => state.actions.getAllPlans)

  return {getAllPlans}
}

export function usePlans () {
  const session = useSession()
  const plans = usePlanStore(store => store.plans)
  const getAllPlans = usePlanStore(state => state.actions.getAllPlans)

  useEffect(()=> {
    if (plans.length === 0 && session?.token) getAllPlans(session.token)
  },[session?.token])

  return plans
}