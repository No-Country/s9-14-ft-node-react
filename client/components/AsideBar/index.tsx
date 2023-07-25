import style from './style.module.scss'
import { AdminNav } from '../AdminNav'
import { Icons } from '../Icons'
import Link from 'next/link'
import { useUserActions } from '@/hooks/useUser'
import { useSessionActions } from '@/hooks/useSession'
import { useRouter } from 'next/router'

const { Logo, User, Exit } = Icons

export function AsideBar () {
  const {removeUser} = useUserActions()
  const {removeData} = useSessionActions()
  const {push} = useRouter()

  const logout = () => {
    removeUser()
    removeData()
    push('/login')
  }
  
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
                <div className={style.exit} onClick={()=> logout()}>
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