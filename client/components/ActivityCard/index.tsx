import type { Activity } from "@/types";
import style from './style.module.scss'
import Image from "next/image";
import { Icons } from "../Icons";
import { useActivitiesActions } from "@/hooks/useActivities";

const { Trash, Person, Clock, Calendar } = Icons

interface Props extends Activity {
  token: string
}

export function ActivityCard ({name, trainer, image, quota, days, token, _id, schedule}: Props) {
  const { deleteActivity } = useActivitiesActions()

  function formatDaysOfWeek(days: string[]) {

  if (days.length === 1) {
    return days[0];
  } else if (days.length === 2) {
    return `${days[0]} y ${days[1]}`;
  } else {
    const lastDay = days.pop();
    return `${days.join(', ')} y ${lastDay}`;
  }
}

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
            <p>Cupo: {quota}</p>
          </span>
          <span>
            <Calendar className={style.icon} />
            <p>Días: {formatDaysOfWeek(days)}</p>
          </span>
          <span>
            <Clock className={style.icon} />
            <p>Horario: {schedule.join(' - ')}</p>
          </span>
        </div>
      </section>
    </div>
  )
}