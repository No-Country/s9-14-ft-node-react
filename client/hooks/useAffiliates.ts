import { useEffect } from 'react'
import {create} from 'zustand'
import { useSession } from './useSession'
import { User } from '@/types'

interface Store {
  affiliates: User[]
  actions: {
    getAffiliates: (token: string) => void
    deleteAffiliate: (id: string, token: string) => void
  }
}

const useAffiliatesStore = create<Store>((set)=> ({
  affiliates: [],
  actions: {
    getAffiliates: async (token) => {
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/users?role=affiliate`, {
        headers: {
          'x-token': token,
          'Content-Type': 'application/json'
        }
      })

      if (request.ok) {
        const data = await request.json()
        set({affiliates: data.users})
      }
    },
    deleteAffiliate: async (id: string, token: string) => {
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'x-token': token,
          'Content-Type': 'application/json'
        }})
        if (request.ok) {
          set((state) => ({affiliates: state.affiliates.filter((affiliate) => affiliate._id !== id)}))
        }
    }
  }
}))

export function useAffiliatesActions () {
  const getAffiliates = useAffiliatesStore(state => state.actions.getAffiliates)
  const deleteAffiliate = useAffiliatesStore(state => state.actions.deleteAffiliate)

  return { getAffiliates, deleteAffiliate }
}

export function useAffiliates () {
  const affiliates = useAffiliatesStore((state) => state.affiliates)
  const session = useSession()
  const { getAffiliates } = useAffiliatesActions()
  
  useEffect(()=> {
    if (session?.token && affiliates.length === 0) getAffiliates(session.token)
  }, [session?.token])

  return affiliates
}