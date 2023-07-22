import { AdminLayout } from "@/components/AdminLayout";
import { useActivities } from "@/hooks/useActivities";
import { useTrainers } from "@/hooks/useTrainers";
import style from '@/styles/pages/menu.module.scss'
import Link from "next/link"
import Image from "next/image";

export default function AdminDashboard () {
  const activities = useActivities().slice(0, 5);
  const trainers = useTrainers().slice(0,3);
  const trainersShown = trainers.slice(0, 3);
  const activitiesShown = activities.slice(0, 3);

  return (
    <AdminLayout placeholder="Buscar usuarios, miembros, actividades..." onSearch={()=> null}>
      <div className={style.adminDashboard}>
        <section className={style.menu}>
            <article className={style.menu_article}><Image width={300} height={80} alt="miembro" src='/miembros.png' />Miembros Activos</article> 
            <article className={style.menu_article}><Image width={300} height={80} alt="entrenador" src='/entrenadores.png' />{trainers.length} Entrenadores</article>
            <article className={style.menu_article}><Image width={300} height={80} alt="sede" src='/sedes.png' />Sedes</article>
            <article className={style.menu_article}><Image width={300} height={80} alt="actividad" src='/actividades.png' />{activities.length}  Actividades activas</article>
        </section>
        <section className={style.trainers}>
          <h2 className={style.title}>Entrenadores</h2>
          {
          trainersShown.map((trainer)=> (
            <li key={trainer._id}>{trainer.name} {trainer.status}</li>
          ))
          }
          <Link href="/trainers" className={style.trainers_button}>Ver Todos</Link>
        </section>
        <section className={style.members}>
        Todos los miembros 
        </section>
        <section className={style.activities}>
          <h2 className={style.title}>Actividades</h2>
          {
          activitiesShown.map((activity)=> (
            <li key={activity._id}>{activity.name} {activity.trainer.name}</li>
          ))
          }
          <Link href="/actividades" className={style.activities_button}>Ver Todos</Link>
        </section>
      </div>
    </AdminLayout>
  )
}