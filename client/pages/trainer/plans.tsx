import { TrainerLayout } from "@/components/TrainerLayout";
import { usePlans } from "@/hooks/usePlans";
import Link from "next/link";
import style from '@/styles/pages/trainer_plans.module.scss'
import { PlanCard } from "@/components/PlanCard";
import { Loader } from "@/components/Loader";
import { ExercisePlan } from "@/types";
import { useMemo, useState } from "react";

export default function TrainerPlans () {
  const plans = usePlans()
  const [searchResults, setSearchResults] = useState<ExercisePlan[]>([])

  const search = (value: string) => {
    if (value) {
      const filtered = plans.filter((plan: any)=> plan.name.toLowerCase().includes(value.toLowerCase()))
      if (filtered.length > 0) {
        setSearchResults(filtered)
      }
    } else {
      setSearchResults([])
    }
  }

  const shown = useMemo(()=> searchResults.length > 0 ? searchResults : plans, [searchResults, plans])

  return (
    <TrainerLayout placeholder="Buscar plan" onSearch={search}>
      <div className={style.title}>
        <h1>PLAN SEMANAL</h1>
        <Link href={'#'} className={style.add}>Asignar plan a afiliado</Link>
      </div>

      <section className={style.section}>
        {
          shown.length > 0 ? shown.map((plan)=> <PlanCard key={plan._id} {...plan} />) : (
            <div className={style.loader}>
              <Loader />
            </div>
          )
        }
      </section>
    </TrainerLayout>
  )
}