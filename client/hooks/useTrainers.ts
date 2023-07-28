import {create} from 'zustand'
import type { Trainer } from '@/types'
import { useEffect } from 'react'
import { useSession } from './useSession'
import type {Activity} from '@/types'

interface Store {
  trainers: Trainer[]
  actions: {
    getTrainers: (token: string) => void
    deleteTrainer: (id: string, token: string) => void
  }
}

const useTrainerStore = create<Store>((set)=> ({
  trainers: [],
  actions: {
    getTrainers: async (token: string) => {
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/users?role=trainer`, {
      headers: {
        'x-token': token,
        'Content-Type': 'application/json'
      }})

      if (!request.ok) throw new Error('Error fetching trainers')
      const {users} = await request.json()
      
      const trainersWithActivities = users.map((trainer: Omit<Trainer, 'activities'>) => {
        return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/activities/trainer/${trainer._id}`, {
          headers: {
            'x-token': token,
            'Content-Type': 'application/json'
          }
        })
      })

      const trainers = await Promise.all(trainersWithActivities)
      await (async () => {
        for (let i = 0; i < trainers.length; i++) {
          const activities = await trainers[i].json()
          users[i].activities = activities.map((activity: Activity) => activity.name)
        }
      })()
      console.log(users)
      set({trainers: users})
      
    },
    deleteTrainer: async (id: string, token: string) => {
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'x-token': token,
          'Content-Type': 'application/json'
        }})

        if (request.ok) {
          set((state) => ({trainers: state.trainers.filter((trainer) => trainer._id !== id)}))
        }
    }
  }
}))

export function useTrainersActions () {
  const getTrainers = useTrainerStore(state => state.actions.getTrainers)
  const deleteTrainer = useTrainerStore(state => state.actions.deleteTrainer)

  return {getTrainers, deleteTrainer}
}

export function useTrainers () {
  const trainers = useTrainerStore((state) => state.trainers)
  const {getTrainers} = useTrainersActions()
  const session = useSession()
  
  useEffect(()=> {
    if (session?.token && trainers.length === 0) getTrainers(session.token)
  }, [session?.token])

  return trainers
}

