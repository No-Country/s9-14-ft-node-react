import { AdminLayout } from "@/components/AdminLayout";
import { useAffiliates } from "@/hooks/useAffiliates";
import Link from "next/link";
import style from '@/styles/pages/affiliates.module.scss'
import { AffiliateCard } from "@/components/AffiliateCard";
import { Loader } from "@/components/Loader";
import { useSession } from "@/hooks/useSession";
import { useMemo, useState } from "react";
import type { User } from "@/types";

export default function AdminAffiliates () {
  const affiliates = useAffiliates()
  const user = useSession()
  const [searchResults, setSearchResults] = useState<User[]>([])

  const search = (value: string) => {
    if (value) {
      const filtered = affiliates.filter((affiliate: any)=> affiliate.name.toLowerCase().includes(value.toLowerCase()))
      if (filtered.length > 0) {
        setSearchResults(filtered)
      }
    } else {
      setSearchResults([])
    }
  }

  const shown = useMemo(()=> searchResults.length > 0 ? searchResults : affiliates, [searchResults, affiliates])

  return (
    <AdminLayout placeholder="Buscar afiliados..." onSearch={search}>
     <div className={style.title}>
        <h1>AFILIADOS</h1>
        <Link href={'#'} className={style.add}>Añadir nuevo</Link>
      </div>     
      {
        shown.length > 0 ? (
          <>
            <section className={style.section}>
              <h2 className={style.heading}>ACTIVOS</h2>
              <div>
                {
                  shown.map((affiliate)=> affiliate.status ? <AffiliateCard key={affiliate._id} {...affiliate} token={user!.token} /> : null )     
                }
              </div>
            </section>
            <section className={style.section}>
              <h2 className={style.heading}>INACTIVOS</h2>
              <div>
                {
                  shown.map((affiliate)=> !affiliate.status ? <AffiliateCard key={affiliate._id} {...affiliate} token={user!.token} /> : null )     
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