import {create} from 'zustand'
import type { User } from '@/types'
import { useSession, useSessionActions } from './useSession'
import { useEffect } from 'react'

interface Store {
  user?: User
  actions: {
    setUser: (user: User) => void
  }
}

const useUserStore = create<Store>((set)=> ({
  user: undefined,
  actions: {
    setUser: (user: User) => set({user})
  }
}))

export function useUserActions () {
  const setUser = useUserStore(state => state.actions.setUser)

  return {setUser}
}

export function useUser () {
  const user = useUserStore((state) => state.user)
  const session = useSession()
  const {setUser} = useUserActions()
  const {removeData} = useSessionActions()

  useEffect(()=> {
    if (!user?._id && session?.token) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'x-token': session?.token
        }
      })
      .then(res => {
        if (!res.ok) {
          removeData()
          throw new Error('Not authorized')
        } else {
          return res.json()
        }
      })
      .then (res => setUser(res))
      .catch(console.error)
    }
  }, [])

  return user
}