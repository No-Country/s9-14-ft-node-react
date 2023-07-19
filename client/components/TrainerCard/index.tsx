import style from './style.module.scss'
import Image from 'next/image'
import type { Trainer } from '@/types'
import {Icons} from '@/components/Icons'
import { useTrainersActions } from '@/hooks/useTrainers'

const {Trash, Cake, Phone, Dumbell} = Icons

interface Props extends Trainer {
  token: string
}

export function TrainerCard ({name, phone, birthday, token, _id, ...props}: Props) {
  const {deleteTrainer} = useTrainersActions()
  
  function convertDate(fechaISO: string) {
  const date = new Date(fechaISO);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
}

  console.log(props)
  return (
    <div className={style.card}> 
      <section>
        <Image className={style.image} src={'/trainer.png'} width={187} height={128} alt={name} />
      </section>
      <section className={style.data}>
        <div className={style.name}>
          <h2>{name}</h2>
          <Trash className={style.trash} onClick={()=> deleteTrainer(_id, token)} />
        </div>
        <div className={style.metadata}>
          <span>
            <Cake className={style.icon} />
            <p>{convertDate(birthday)}</p>
          </span>
          <span>
            <Phone className={style.icon} />
            <p>{phone}</p>
          </span>
          <span>
            <Dumbell className={style.icon} />
            <p>Crosstraining</p>
          </span>
        </div>
      </section>
    </div>
  )
}