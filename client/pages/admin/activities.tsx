import { AdminLayout } from "@/components/AdminLayout";
import { useActivities} from "@/hooks/useActivities";
import { Slider } from "@/components/Slider";
import { ActivityCard } from "@/components/ActivityCard";

export default function AdminActivities () {
  const activities = useActivities()
  console.log(activities)

  return (
    <AdminLayout placeholder="Buscar actividades..." onSearch={()=> null}>
      <Slider>
        {
          activities.map((activity)=> <ActivityCard key={activity._id} {...activity} /> )     
        }
      </Slider>
    </AdminLayout>
  )
}