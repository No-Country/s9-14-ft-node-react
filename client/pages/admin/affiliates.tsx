import { AdminLayout } from "@/components/AdminLayout";
import { useAffiliates } from "@/hooks/useAffiliates";
import Link from "next/link";
import style from '@/styles/pages/affiliates.module.scss'
import { AffiliateCard } from "@/components/AffiliateCard";
import { Loader } from "@/components/Loader";
import { useSession } from "@/hooks/useSession";

export default function AdminAffiliates () {
  const affiliates = useAffiliates()
  const user = useSession()

  return (
    <AdminLayout placeholder="Buscar afiliados..." onSearch={()=> null}>
     <div className={style.title}>
        <h1>AFILIADOS</h1>
        <Link href={'#'} className={style.add}>Añadir nuevo</Link>
      </div>     
      {

        affiliates.length > 0 ? (
          <>
            <section className={style.section}>
              <h2 className={style.heading}>ACTIVOS</h2>
              <div>
                {
                  affiliates.map((affiliate)=> affiliate.status ? <AffiliateCard key={affiliate._id} {...affiliate} token={user!.token} /> : null )     
                }
              </div>
            </section>
            <section className={style.section}>
              <h2 className={style.heading}>INACTIVOS</h2>
              <div>
                {
                  affiliates.map((affiliate)=> !affiliate.status ? <AffiliateCard key={affiliate._id} {...affiliate} token={user!.token} /> : null )     
                }
              </div>
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