import style from './trainer.module.scss'
import type { User } from '@/types'
import { Loader } from '@/components/Loader'

export function Trainer ({affiliates}: {affiliates: User[]}) {

  return (
    <section className={style.container}>
      <div className={style.description}>
        <span className={style.title}>
          <h3>Afiliados</h3>
          <button className={style.add}>Añadir plan general</button>
        </span>
      </div>
      <ul className={style.shown}>
        {
          affiliates.length > 0 ? affiliates.map((member: User)=> {
            return (
              <li className={style.item} key={member._id}>
                <p>{member.name}</p>
                <p className={style.detail}>Detalles</p>
                <button className={style.add}>Asignar plan</button>
              </li>
            )
          })
          : (
            <div className={style.loader}>
              <Loader />
            </div>
          )
        } 
      </ul>
    </section>
  )
}