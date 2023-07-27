// @ts-nocheck
import { AffiliateLayout } from "@/components/AffiliateLayout"
import Image from "next/image"
import { UserPhoto } from "@/components/UserPhoto"
import style from '@/styles/pages/affiliate_dashboard.module.scss'
import alertSvg from '@/public/alert.svg'
import {Calendar} from "@/components/Calendar"
import { Loader } from "@/components/Loader"
import { useSinglePlan } from "@/hooks/useSinglePlan"
import { PlanCard } from "@/components/PlanCard"

export default function AffiliateDashboard () {
  const {plan, user} = useSinglePlan()


  if (!user?.name) {
    return (
      <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Loader /> 
      </main>
    )
  }

  return (
    <AffiliateLayout>
      <header>
        <div className={style.header}>
          <div className={style.user}>
            <div className={style.icons}>
              <Image className={style.logo} src='/full-logo.svg' alt="logo" width={113} height={78}/>
              <div className={style.picture}>
                <span className={style.data}>
                  <UserPhoto src={'/usuario.png'} />
                  <span>
                    <h4>{user?.name}</h4>
                    <small>{user?.role}</small>
                  </span>
                </span>
                <Image src={alertSvg} alt="alert" className={style.alert} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={style.name}>
        <div>
          Bienvenido/a de vuelta <p>{user?.name + ' ' + user?.surname}</p>
        </div>
      </section>

      <section className={style.plan}>
        <PlanCard {...plan} />
      </section>

      <section className={style.calendar}>
        <Calendar />
      </section>
    </AffiliateLayout>
  )
}