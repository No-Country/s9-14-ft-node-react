import { AdminLayout } from "@/components/AdminLayout";
import { useActivities} from "@/hooks/useActivities";
import { useEffect } from "react";

export default function AdminActivities () {
  const {activities} = useActivities()

 

  return (
    <AdminLayout placeholder="Buscar actividades..." onSearch={()=> null}>
      {
        activities.map((activity)=> (
          <div key={activity._id}>
            <h1>{activity.name}</h1>
            <p>{activity.description}</p>
          </div>
        ))
      }
    </AdminLayout>
  )
}