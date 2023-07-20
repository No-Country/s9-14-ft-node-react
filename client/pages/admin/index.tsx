import { AdminLayout } from "@/components/AdminLayout";
import { useActivities } from "@/hooks/useActivities";
import { useSession } from "@/hooks/useSession";
import { useTrainers } from "@/hooks/useTrainers";
import { useUser } from "@/hooks/useUser";
import style from '@/styles/pages/menu.module.scss'
import Link from "next/link"
import entrenadores from "../../public/entrenadores.png"
import actividades from "../../public/adtividades.png"
import miembros from "../../public/miembros.png"
import sedes from "../../public/sedes.png"
import Image from "next/image";

export default function AdminDashboard () {
  const activities = useActivities().slice(0, 5);
  const trainers = useTrainers().slice(0,3);

  return (
    <AdminLayout placeholder="Buscar usuarios, miembros, actividades..." onSearch={()=> null}>
    <div className={style.adminDashboard}>
      <section className={style.menu}>
          <article className={style.menu_article}>{} <Image src={miembros}>Miembros Activos</Image></article>
          <article className={style.menu_article}> <Image src={entrenadores}>{useTrainers().length} Entrenadores</Image> </article>
          <article className={style.menu_article}>{} <Image src={sedes}>Sedes</Image></article>
          <article className={style.menu_article}><Image src={actividades} >{useActivities().length}  Actividades activas</Image></article>
      </section>
      <section className={style.trainers}>
        <h2 className={style.title}>Entrenadores</h2>
        {
        trainers.map((trainer)=> (
          <li>{trainer.name} {trainer.status}</li>
        ))
        }
        <Link href="/trainers" className={style.trainers_button}>Ver Todos</Link>
      </section>
      <section className={style.members}>
       Todos los miembros 
       {}
      </section>
      <section className={style.activities}>
        <h2 className={style.title}>Actividades</h2>
        {
        activities.map((activity)=> (
          <li>{activity.name} {activity.trainer.name}</li>
        ))
        }
        <Link href="/actividades" className={style.activities_button}>Ver Todos</Link>
      </section>
    </div>
      
    </AdminLayout>
  )
}