import { AdminLayout } from "@/components/AdminLayout";
import { useSession } from "@/hooks/useSession";

export default function AdminDashboard () {
  const {session} = useSession()
  console.log(session)

  

  return (
    <AdminLayout placeholder="Buscar usuarios, miembros, actividades...">


    </AdminLayout>
  )
}