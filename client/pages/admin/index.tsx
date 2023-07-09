import { AdminNav } from "@/components/AdminNav";
import { AdminHeader } from "@/components/AdminHeader";
import styles from '@/styles/pages/admin.module.scss'

export default function AdminDashboard () {
  return (
    <main className={styles.main}>
      <AdminNav />
      <section className={styles.content}>
        <AdminHeader />
      </section>
    </main>
  )
}