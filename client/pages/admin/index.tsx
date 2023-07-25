import style from '@/styles/pages/admin_dashboard.module.scss'
import { AdminLayout } from "@/components/AdminLayout";
import { useActivities } from "@/hooks/useActivities";
import { useTrainers } from "@/hooks/useTrainers";
import Image from "next/image";
import { useAffiliates } from "@/hooks/useAffiliates";
import { useMemo } from 'react';
import Link from 'next/link';
import { SearchMembers } from '@/components/SearchMembers/Admin';

export default function AdminDashboard () {
  const activities = useActivities();
  const trainers = useTrainers();
  const affiliates = useAffiliates();
  
  const activeTrainers = useMemo(()=> trainers.filter(trainer => trainer.status), [trainers]);
  const activeActivities = useMemo(()=> activities.filter(activity => activity.status), [activities]);
  const activeAffiliates = useMemo(()=> affiliates.filter(affiliate => affiliate.status), [affiliates]);

  return (
    <AdminLayout placeholder="Buscar usuarios, miembros, actividades..." onSearch={()=> null}>
      <article className={style.container}>
        <section className={style.generic}>
          <div>
            <span className={style.picture}>
              <Image className={style.image} width={156} height={80} src='/miembros.png' alt="miembros" />
              <span>
                <p>{activeAffiliates.length}</p>
                <small>Miembros activos</small>
              </span>
            </span>
            <span className={style.picture}>
              <Image className={style.image} width={156} height={80} src='/entrenadores.png' alt="entrenadores" />
              <span>
                <p>{activeTrainers.length}</p>
                <small>Entrenadores</small>
              </span>
            </span>
          </div>
          <div>
            <span className={style.picture}>
              <Image className={style.image} width={156} height={80} src='/sedes.png' alt="sedes"/>
              <span>
                <p>5</p>
                <small>Sedes activas</small>
              </span>
            </span>
            <span className={style.picture}>
              <Image className={style.image} width={156} height={80} src='/actividades.png' alt="actividades"/>
              <span>
                <p>{activeActivities.length}</p>
                <small>Actividades activas</small>
              </span>
            </span>
          </div>
        </section>

        <section className={style.info}>
          <ul className={style.card}>
            <h3>Entrenadores</h3>
              {trainers.slice(0,3).map((trainer) => {
                return (
                  <li className={style.item} key={trainer._id}>
                    <p>{trainer.name}</p>
                    <small>{trainer.status ? 'Activo' : 'Inactivo'}</small>
                    <small>Ver mas</small>
                  </li>
                )
              })}
            <Link className={style.more} href='/admin/trainers'>Ver todos</Link>
          </ul>
          <ul className={style.card}>
            <h3>Actividades</h3>
              {activities.slice(0,5).map((activity) => {
                return (
                  <li className={style.item} key={activity._id}>
                    <p>{activity.name}</p>
                    <small>{activity.trainer.name}</small> 
                    <small>Ver mas</small>
                  </li>
                )
              })}
            <Link className={style.more} href='/admin/activities'>Ver todos</Link>
          </ul>
        </section>

        <SearchMembers members={affiliates} />
      </article>
    </AdminLayout>
  )
}