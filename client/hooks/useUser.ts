import {create} from 'zustand'
import type { User } from '@/types'

interface Store {
  user: User | {}
  actions: {
    setUser: (user: User) => void
  }
}

const useUserStore = create<Store>((set)=> ({
  user: {},
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

  return {user}
}