import { AdminHeader } from "@/components/AdminHeader"
import { AsideBar } from "@/components/AsideBar"
import styles from './style.module.scss'

interface Props {
  children: React.ReactNode
  placeholder: string
  onSearch: ()=> void
}

export function AdminLayout ({children, placeholder, onSearch}: Props) {
  return (
  <main className={styles.main}>
      <AsideBar />
      <section className={styles.content}>
        <AdminHeader placeholder={placeholder} onSearch={onSearch} />
  
      </section>
    </main>
  )
}