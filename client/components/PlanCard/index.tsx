import type { ExercisePlan } from "@/types"
import style from './style.module.scss'

export function PlanCard ({name, exercises ,...props}: ExercisePlan) {
  console.log(exercises)
  return (
    <article className={style.container}>
      <h3>{name}</h3>
      <ul className={style.exercise}>
        {
          exercises.map(({name, setsAndRepetitions}) => (
            <li className={style.item} key={name}>
              <p>{name}</p>
              <small>{setsAndRepetitions}</small>
              <small>Ver mas</small>
            </li>
          )
        )}
      </ul>
    </article>
  )
}