import type { Activity } from "@/types";
import style from './style.module.scss'
import Image from "next/image";
import { Icons } from "../Icons";
import { useActivitiesActions } from "@/hooks/useActivities";

const { Trash, Person, Clock, Calendar } = Icons

interface Props extends Activity {
  token: string
}

export function ActivityCard ({name, trainer, image, totalVacancies, token, _id, ...img}: Props) {
  const { deleteActivity } = useActivitiesActions()

  // const getSpanishDay = (nextDay?: boolean) => {
  //   const date = new Date()
  //   const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
  
  //   if (nextDay) {
  //     date.setDate(date.getDate() + 1)
  //   }
    
  //   return days[date.getDay()]
  // }

  return (
    <div className={style.card}> 
      <section>
        <Image className={style.image} src={image} width={222} height={128} alt={name} />
      </section>
      <section className={style.data}>
        <div className={style.name}>
          <h2>{name}</h2>
          <Trash className={style.trash} onClick={()=> deleteActivity(_id, token)} />
        </div>
        <div className={style.trainer}>
          <b>Profesor:</b> {trainer.name}
        </div>
        <div className={style.metadata}>
          <span>
            <Person className={style.icon} />
            {/* <p>Cupo: {totalVacancies[getSpanishDay()]}</p> */}
            <p>Cupo: 20</p>
          </span>
          <span>
            <Calendar className={style.icon} />
            <p>Días: Lunes, Miércoles y Viernes.</p>
          </span>
          <span>
            <Clock className={style.icon} />
            <p>Horario: 09:00 - 18:00</p>
          </span>
        </div>
      </section>
    </div>
  )
}