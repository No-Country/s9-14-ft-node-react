import { AsideBar } from "@/components/AsideBar";
import DataForm from '@/components/DataForm';

export default function AdminDashboard () {
  return (
    <main >
      <AsideBar />
      <section >
        <DataForm/>
      </section>
    </main>
  )
}