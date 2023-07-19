import { AdminLayout } from "@/components/AdminLayout";
import AffiliateList from "@/components/AffiliateList"
import DataForm from '@/components/DataForm';

export default function AdminDashboard () {
  return (
    <AdminLayout >
      <section >
        <AffiliateList/>
      </section>
    </AdminLayout>
  )
}