import { AdminHeader } from "@/components/AdminHeader";
import styles from '@/styles/pages/admin.module.scss'
import { AsideBar } from "@/components/AsideBar";

export default function AdminDashboard () {
  return (
    <main className={styles.main}>
      <AsideBar />
      <section className={styles.content}>
        <AdminHeader placeholder="Buscar usuarios, miembros, actividades..." />
  
      </section>
    </main>
  )
}