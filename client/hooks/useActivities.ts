import {create} from 'zustand'
import type { Activity } from '@/types'
import { useEffect } from 'react'
import { useSession } from './useSession'

interface Store {
  activities: Activity[]
  actions: {
    getActivities: (token?: string) => Promise<void>
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
      set({activities: data})
    }
  }
}))

export function useActivitiesActions () {
  const getActivities = useActivityStore(state => state.actions.getActivities)

  return {getActivities}
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