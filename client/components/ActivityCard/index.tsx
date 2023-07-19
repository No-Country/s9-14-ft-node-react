import type { Activity } from "@/types";
import style from './style.module.scss'
import Image from "next/image";
import { Icons } from "../Icons";

const { Trash, Person } = Icons

export function ActivityCard ({name, trainer, image, totalVacancies, ...img}: Activity) {
  console.log(img)
  return (
    <div className={style.card}> 
      <section>
        <Image className={style.image} src={image} width={222} height={128} alt={name} />
      </section>
      <section className={style.data}>
        <div className={style.name}>
          <h2>{name}</h2>
          <Trash />
        </div>
        <div>
          <b>Profesor:</b> {trainer.name}
        </div>
        <div>
          <span>
            <Person />
            <p>Cupo: </p>
          </span>
        </div>

        
      </section>
    </div>
  )
}