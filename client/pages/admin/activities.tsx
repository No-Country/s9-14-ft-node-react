import { AdminLayout } from "@/components/AdminLayout";
import { useActivities} from "@/hooks/useActivities";
import { Slider } from "@/components/Slider";
import { ActivityCard } from "@/components/ActivityCard";
import style from '@/styles/pages/activities.module.scss'
import { Loader } from "@/components/Loader";

export default function AdminActivities () {
  const activities = useActivities()

  return (
    <AdminLayout placeholder="Buscar actividades..." onSearch={()=> null}>
      <h1 className={style.title}>ACTIVIDADES</h1>
      {
        activities.length > 0 ? (
          <>
            <section className={style.section}>
              <h2 className={style.heading}>ACTIVAS</h2>
              <Slider>
                {
                  activities.map((activity)=> activity.trainer.status ? <ActivityCard key={activity._id} {...activity} /> : null )     
                }
              </Slider>
            </section>
            <section className={style.section}>
              <h2 className={style.heading}>INACTIVAS</h2>
              <Slider>
                {
                  activities.map((activity)=> !activity.trainer.status ? <ActivityCard key={activity._id} {...activity} /> : null )     
                }
              </Slider>
            </section>
          </>
        )
       : (
        <div className={style.loader}>
          <Loader />
        </div>
      )
    }
    </AdminLayout>
  )
}