import type { User } from "@/types"
import { Icons } from "@/components/Icons";
import { AlDia } from "../Statuses/AlDia";
import { Vencido } from "../Statuses/Vencido";
import style from './style.module.scss'
import { useAffiliatesActions } from "@/hooks/useAffiliates";

const {Trash} = Icons

interface Props extends User {
  token: string
}

export function AffiliateCard ({name, email, phone, status, _id, token, birthday, fitMedical, phoneEmergency}: Props) {
  const {deleteAffiliate} = useAffiliatesActions()

  return (
    <article className={style.card}>

      <div className={style.description}>
        <p>Afiliado</p>
        <p>Vencimiento</p>
        <p className={style.dissapear}>Membresia</p>
        <p className={style.dissapear}>Edad</p>
        <p className={style.dissapear}>Nacimiento</p>
        <p className={style.dissapear}>Celular</p>
        <p className={style.dissapear}>Apto medico</p>
        <p className={style.dissapear}>Cel. de emergencia</p>
      </div>     

      <div className={style.info}>
        <span>
          <p>{name}</p>
          <p>{email}</p>
        </span>
        <span>
          <p>{status ? <AlDia /> : <Vencido />}</p>
          <p>08/10/2023</p>
        </span>
        <p className={style.dissapear}>Mensual</p>
        <p className={style.dissapear}>35 años</p>
        <p className={style.dissapear}>27/10/1987</p>
        <p>{phone}</p>
        <span className={style.dissapear}>
          <p>{fitMedical.valid ? <AlDia /> : <Vencido />}</p>
          <p>08/10/2023</p>
        </span>
        <p className={style.dissapear}>{phoneEmergency}</p>
        <Trash onClick={()=> deleteAffiliate(_id, token)} className={style.trash} />
      </div>
    </article>
  )
}