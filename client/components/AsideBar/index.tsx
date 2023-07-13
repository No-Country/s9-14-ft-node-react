import style from './style.module.scss'
import { AdminNav } from '../AdminNav'
import { Icons } from '../Icons'
import Link from 'next/link'

const { Logo, User, Exit } = Icons

export function AsideBar () {
  return (
    <aside className={style.aside}>
      <Logo className={style.logo} />
      <div>
        <AdminNav />

        <div className={style.others}>
            <ul className={style.list}>
              <li className={style.item}>
                <Link href="/admin/profile" className={style.link}>
                <User className={style.icons} />
                <p>
                  Perfil
                </p>
                </Link>
              </li>
              <li className={style.item}>
                <div className={style.exit} onClick={()=> {}}>
                <Exit className={style.icons} />
                <p>
                  Salir
                </p>
                </div>
              </li>
            </ul>
          </div>
      </div>
    </aside>
  )
}