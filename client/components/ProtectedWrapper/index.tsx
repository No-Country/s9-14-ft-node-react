import { useSession } from "@/hooks/useSession"
import { Loader } from "@/components/Loader"

export function ProtectedWrapper ({children}: {children: React.ReactNode}) {
  const session = useSession()

  return session?.token ? children : (
    <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Loader /> 
    </main>
  ) 
}