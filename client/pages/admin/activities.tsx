import { AdminLayout } from "@/components/AdminLayout";
import { useActivities} from "@/hooks/useActivities";
import { Slider } from "@/components/Slider";
import { ActivityCard } from "@/components/ActivityCard";
import style from '@/styles/pages/activities.module.scss'
import { Loader } from "@/components/Loader";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import type { Activity } from "@/types";
import { useState, useMemo } from "react";

export default function AdminActivities () {
  const activities = useActivities()
  const user = useSession()
  const [searchResults, setSearchResults] = useState<Activity[]>([])

  const search = (value: string) => {
    if (value) {
      const filtered = activities.filter((activity: any)=> activity.name.toLowerCase().includes(value.toLowerCase()))
      if (filtered.length > 0) {
        setSearchResults(filtered)
      }
    } else {
      setSearchResults([])
    }
  }

  const shown = useMemo(()=> searchResults.length > 0 ? searchResults : activities, [searchResults, activities])

  return (
    <AdminLayout placeholder="Buscar actividades..." onSearch={search}>
      <div className={style.title}>
        <h1>ACTIVIDADES</h1>
        <Link href={'/admin/newActivity'} className={style.add}>Añadir nueva</Link>
      </div>
      {
        shown.length > 0 ? (
          <>
            <section className={style.section}>
              <h2 className={style.heading}>ACTIVAS</h2>
              <Slider>
                {
                  shown.map((activity)=> activity.trainer.status ? <ActivityCard key={activity._id} {...activity} token={user!.token} /> : null )     
                }
              </Slider>
            </section>
            <section className={style.section}>
              <h2 className={style.heading}>INACTIVAS</h2>
              <Slider>
                {
                  shown.map((activity)=> !activity.trainer.status ? <ActivityCard key={activity._id} {...activity} token={user!.token} /> : null )     
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