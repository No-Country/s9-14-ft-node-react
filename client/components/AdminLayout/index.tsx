import { Header } from "@/components/Header"
import { AsideBar } from "@/components/AsideBar"
import styles from './style.module.scss'
import { ProtectedWrapper } from "@/components/ProtectedWrapper"
import { AdminNav } from "@/components/Navigation/AdminNav";
interface Props {
  children: React.ReactNode
  placeholder: string
  onSearch?: (arg: string)=> void
  disabled?: boolean
}

export function AdminLayout ({children, placeholder, onSearch, disabled}: Props) {

  return (
    <ProtectedWrapper>
      <main className={styles.main}>
        <AsideBar Nav={AdminNav} />
        <section className={styles.content}>
          <Header placeholder={placeholder} image='/adminPicture.svg' Nav={AdminNav} onSearch={onSearch} disabled={disabled} />
          {children}
        </section>
      </main>
    </ProtectedWrapper>
  )
}