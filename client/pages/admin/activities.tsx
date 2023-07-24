import { AdminLayout } from "@/components/AdminLayout";
import { useActivities} from "@/hooks/useActivities";
import { Slider } from "@/components/Slider";
import { ActivityCard } from "@/components/ActivityCard";
import style from '@/styles/pages/activities.module.scss'
import { Loader } from "@/components/Loader";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";

export default function AdminActivities () {
  const activities = useActivities()
  const user = useSession()

  return (
    <AdminLayout placeholder="Buscar actividades..." onSearch={()=> null}>
      <div className={style.title}>
        <h1>ACTIVIDADES</h1>
        <Link href={'/admin/newActivity'} className={style.add}>Añadir nueva</Link>
      </div>
      {
        activities.length > 0 ? (
          <>
            <section className={style.section}>
              <h2 className={style.heading}>ACTIVAS</h2>
              <Slider>
                {
                  activities.map((activity)=> activity.trainer.status ? <ActivityCard key={activity._id} {...activity} token={user!.token} /> : null )     
                }
              </Slider>
            </section>
            <section className={style.section}>
              <h2 className={style.heading}>INACTIVAS</h2>
              <Slider>
                {
                  activities.map((activity)=> !activity.trainer.status ? <ActivityCard key={activity._id} {...activity} token={user!.token} /> : null )     
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