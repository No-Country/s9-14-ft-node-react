import {create} from 'zustand'
import type { Activity } from '@/types'
import { useEffect } from 'react'

interface Store {
  activities: Activity[]
  actions: {
    getActivities: () => Promise<void>
  }
}

const useActivityStore = create<Store>((set)=> ({ // Store creation
  activities: [],
  actions: {
    getActivities: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/activities`)
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

  useEffect(() => {
    getActivities()
  }, [])

  return {activities}
}