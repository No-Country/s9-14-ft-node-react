import style from './style.module.scss'
import { Icons } from '../Icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import path from 'path'

const { Logo, Menu, Runner, Affiliate, Dumbell, User, Exit } = Icons

export function AdminNav () {
  const {pathname} = useRouter()

  const NavLinks = [
    { title: 'Menu', icon: Menu, href: '/admin' },
    { title: 'Entrenadores', icon: Runner, href: '/admin/trainers' },
    { title: 'Afiliados', icon: Affiliate, href: '/admin/affiliates' },
    { title: 'Actividades', icon: Dumbell, href: '/admin/activities' },
  ]

  console.log

  return (
    <aside className={style.aside}>
      <nav className={style.nav}>
          <Logo className={style.logo} />
          <ul className={style.list}>
            {NavLinks.map(({title, icon: Icon, href}) => (
              <li className={`${style.item} ${pathname === href ? style.active : ''}`} key={title}>
                <Link href={href} className={style.link}>
                  <Icon className={style.icons} />
                  <p>
                    {title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
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
      </nav>
    </aside>
  )
}