import { AdminHeader } from "@/components/AdminHeader"
import { AsideBar } from "@/components/AsideBar"
import styles from './style.module.scss'
import {useSession} from '@/hooks/useSession'

interface Props {
  children: React.ReactNode
  placeholder: string
  onSearch: (arg: string)=> void
}

export function AdminLayout ({children, placeholder, onSearch}: Props) {
  const session = useSession()

  return (
  <main className={styles.main}>
      {
        session?.token ?
        <>
          <AsideBar />
          <section className={styles.content}>
            <AdminHeader placeholder={placeholder} onSearch={onSearch} />
            {children}
          </section>
        </> : null
      }
    </main>
  )
}