import {create} from 'zustand'
import type { Activity } from '@/types'
import { useEffect } from 'react'
import { useSession } from './useSession'

interface Store {
  activities: Activity[]
  actions: {
    getActivities: (token?: string) => Promise<void>
    deleteActivity: (id: string, token: string) => Promise<void>
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

      const trainerStatus = data.map((activity: Activity) => {
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
        for (let i = 0; i < data.length; i++) {
          if (!data[i].trainer) {
            data[i].trainer = trainers[i].user
            continue
          }
          data[i].trainer.status = trainers[i].user.status
        }
      })()

      set({activities: data})
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
    }
  }
}))

export function useActivitiesActions () {
  const getActivities = useActivityStore(state => state.actions.getActivities)
  const deleteActivity = useActivityStore(state => state.actions.deleteActivity)

  return {getActivities, deleteActivity}
}

export function useActivities () { // Returns activities
  const activities = useActivityStore((state) => state.activities)
  const {getActivities} = useActivitiesActions() // getActivities is a function that fetches activities from the server
  const session = useSession()

  useEffect(() => {
    if (session?.token) getActivities(session?.token)
  }, [session?.token])

  return activities 
}