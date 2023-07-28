import {create} from 'zustand'
import type { Activity } from '@/types'
import { useEffect } from 'react'
import { useSession } from './useSession'

interface Store {
  activities: Activity[]
  actions: {
    getActivities: (token?: string) => Promise<void>
    deleteActivity: (id: string, token: string) => Promise<void>
    addActivity: (token:string, activity: Activity) => void
  }
}

const useActivityStore = create<Store>((set)=> ({ // Store creation
  activities: [],
  actions: {
    getActivities: async (token) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/activities`, {
        headers: {
          'x-token': token || '',
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) {
        console.error('Error fetching activities')
        return
      }
      
      const data = await res.json()
      
      const trainerStatus = data.activities.map((activity: Activity) => {
        if (!activity.trainer) return Promise.resolve({user: {status: null, name: 'No hay'}})

        return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/users/${activity.trainer._id}/profile`, {
          headers: {
            'x-token': token || '',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.ok ? res.json() : res)
        .catch(console.error)
      })

      const trainers = await Promise.all(trainerStatus)

      await (async () => {
        for (let i = 0; i < data.activities.length; i++) {
          if (!data.activities[i].trainer) {
            data.activities[i].trainer = trainers[i].user
            continue
          }
          data.activities[i].trainer.status = trainers[i].user.status
        }
      })()

      set({activities: data.activities})
    },
    deleteActivity: async (id: string, token: string) => {
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/activities/${id}`, {
        method: 'DELETE',
        headers: {
          'x-token': token,
          'Content-Type': 'application/json'
        }})

        if (request.ok) {
          set((state) => ({activities: state.activities.filter((activity) => activity._id !== id)}))
        }
    },
    addActivity: async (token, activity: Activity) => {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/users/${activity.trainer}/profile`, {
          headers: {
            'x-token': token || '',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.ok ? res.json() : res)
        .then(res=> {
          const withTrainerActivity = {...activity, trainer: res.user}
          set((state) => ({activities: [...state.activities, withTrainerActivity]}))
        })
        .catch(console.error)
    }
  }
}))

export function useActivitiesActions () {
  const getActivities = useActivityStore(state => state.actions.getActivities)
  const deleteActivity = useActivityStore(state => state.actions.deleteActivity)
  const addActivity = useActivityStore(state => state.actions.addActivity)

  return {getActivities, deleteActivity, addActivity}
}

export function useActivities () { // Returns activities
  const activities = useActivityStore((state) => state.activities)
  const {getActivities} = useActivitiesActions() // getActivities is a function that fetches activities from the server
  const session = useSession()

  useEffect(() => {
    if (session?.token && activities.length === 0) getActivities(session?.token)
  }, [session?.token])

  return activities 
}