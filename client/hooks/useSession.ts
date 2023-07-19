import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {create} from 'zustand'

type Data = {
  token: string
  role: 'admin' | 'trainer' | 'affiliate' | ''
}

interface Store {
  data?: Data
  actions: {
    setData: (data: Data) => void
    getData: () => Data | null
    removeData: () => void
  }
}

const useSessionStore = create<Store>((set)=> ({
  data: undefined,
  actions: {
    setData: (data: Data) => {
      localStorage.setItem('data', JSON.stringify(data))     
      set({data})
    },
    removeData: () => {
      localStorage.removeItem('data')
      set({data: undefined})
    },
    getData: () => {
      const data: Data | null = JSON.parse(localStorage.getItem('data') || '{}')
      if (data?.token && data?.role) {
        set({data: {token: data.token, role: data.role}})
      }
      return data
    }
  }
}))

export function useSessionActions () {
  const setData = useSessionStore(state => state.actions.setData)
  const getData = useSessionStore(state => state.actions.getData)
  const removeData = useSessionStore(state => state.actions.removeData)

  return {setData, getData, removeData}
}

export function useSession () {
  const session = useSessionStore((state) => state.data)
  const { getData } = useSessionActions()
  const {push, pathname} = useRouter()

  useEffect(()=> {
    if (!session?.token) {
      const data = getData()

      if (!data?.token || !(pathname.includes(`/${data?.role}`))) {
        push('/login')  
      }
    } else if (session.token && !pathname.includes(`/${session?.role}`)) {
      push('/login')
    }
  }, [])

  return session
}