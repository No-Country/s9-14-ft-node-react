import {create} from 'zustand'
import type { Trainer } from '@/types'
import { useEffect } from 'react'
import { useSession } from './useSession'

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

      if (request.ok) {
        const data = await request.json()
        set({trainers: data.users})
      }
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
    if (session?.token) getTrainers(session.token)
  }, [session?.token])

  return trainers
}

