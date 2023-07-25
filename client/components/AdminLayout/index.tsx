import { AdminHeader } from "@/components/AdminHeader"
import { AsideBar } from "@/components/AsideBar"
import styles from './style.module.scss'
import { ProtectedWrapper } from "@/components/ProtectedWrapper"

interface Props {
  children: React.ReactNode
  placeholder: string
  onSearch: (arg: string)=> void
}

export function AdminLayout ({children, placeholder, onSearch}: Props) {

  return (
    <ProtectedWrapper>
      <main className={styles.main}>
        <AsideBar />
        <section className={styles.content}>
          <AdminHeader placeholder={placeholder} onSearch={onSearch} />
          {children}
        </section>
      </main>
    </ProtectedWrapper>
  )
}