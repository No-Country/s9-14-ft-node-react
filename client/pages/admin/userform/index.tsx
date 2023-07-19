import { AdminLayout } from "@/components/AdminLayout";
import DataForm from '@/components/DataForm';

export default function AdminDashboard () {
  return (
    <AdminLayout >
      <section >
        <DataForm/>
      </section>
    </AdminLayout>
  )
}