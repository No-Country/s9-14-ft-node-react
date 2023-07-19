import { AdminLayout } from "@/components/AdminLayout"
import Link from "next/link"
import style from '@/styles/pages/trainers.module.scss'
import { useTrainers } from "@/hooks/useTrainers"
import { Loader } from "@/components/Loader"
import { TrainerCard } from "@/components/TrainerCard"
import { Slider } from "@/components/Slider"
import { useSession } from "@/hooks/useSession"

export default function Trainers () {
  const trainers = useTrainers()
  const session = useSession()

  return (
     <AdminLayout placeholder="Buscar entrenadores..." onSearch={()=> null}>

      <div className={style.title}>
        <h1>ENTRENADORES</h1>
        <Link href={'#'} className={style.add}>Añadir nuevo</Link>
      </div>
      {
        trainers.length > 0 ? (
          <>
          <section className={style.section}>
            <h2 className={style.heading}>ACTIVOS</h2>
            <Slider>
              {
                trainers.map((trainer)=> trainer.status ? <TrainerCard key={trainer._id} token={session!.token} {...trainer} /> : null)
              }
            </Slider>
          </section>
          <section className={style.section}>
            <h2 className={style.heading}>INACTIVOS</h2>
            <Slider>
              {
                trainers.map((trainer)=> !trainer.status ? <TrainerCard key={trainer._id} token={session!.token} {...trainer} /> : null)
              }
            </Slider>
          </section>
          </>
        ) : (
          <div className={style.loader}>
            <Loader />
          </div>
        )
      }
      

      {/* <div className={style.title}>
        <h1>ACTIVIDADES</h1>
        <Link href={'#'} className={style.add}>Añadir nueva</Link>
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
    } */}
    </AdminLayout>
  )
}