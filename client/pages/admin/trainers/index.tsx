import { AdminLayout } from "@/components/AdminLayout"
import Link from "next/link"
import style from '@/styles/pages/trainers.module.scss'
import { useTrainers } from "@/hooks/useTrainers"
import { Loader } from "@/components/Loader"
import { TrainerCard } from "@/components/TrainerCard"
import { Slider } from "@/components/Slider"
import { useSession } from "@/hooks/useSession"
import { useState, useMemo } from "react"
import type { Trainer } from "@/types"

export default function Trainers () {
  const trainers = useTrainers()
  const session = useSession()
  const [searchResults, setSearchResults] = useState<Trainer[]>([])
  
  const search = (value: string) => {
    if (value) {
      const filtered = trainers.filter((trainer: any)=> trainer.name.toLowerCase().includes(value.toLowerCase()))
      if (filtered.length > 0) {
        setSearchResults(filtered)
      }
    } else {
      setSearchResults([])
    }
  }

  const shown = useMemo(()=> searchResults.length > 0 ? searchResults : trainers, [searchResults, trainers])

  return (
     <AdminLayout placeholder="Buscar entrenadores..." onSearch={search}>

      <div className={style.title}>
        <h1>ENTRENADORES</h1>
        <Link href={'/admin/trainers/add-trainer'} className={style.add}>Añadir nuevo</Link>
      </div>
      {
        shown.length > 0 ? (
          <>
          <section className={style.section}>
            <h2 className={style.heading}>ACTIVOS</h2>
            <Slider>
              {
                shown.map((trainer)=> trainer.status ? <TrainerCard key={trainer._id} token={session!.token} {...trainer} /> : null)
              }
            </Slider>
          </section>
          <section className={style.section}>
            <h2 className={style.heading}>INACTIVOS</h2>
            <Slider>
              {
                shown.map((trainer)=> !trainer.status ? <TrainerCard key={trainer._id} token={session!.token} {...trainer} /> : null)
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
    </AdminLayout>
  )
}