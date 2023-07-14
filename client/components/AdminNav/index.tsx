import { Icons } from '../Icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './style.module.scss'

const { Logo, Menu, Runner, Affiliate, Dumbell, User, Exit } = Icons

export function AdminNav ({invert} : {invert?: boolean}) {
  const {pathname} = useRouter()

  const NavLinks = [
    { title: 'Principal', icon: Menu, href: '/admin' },
    { title: 'Entrenadores', icon: Runner, href: '/admin/trainers' },
    { title: 'Afiliados', icon: Affiliate, href: '/admin/affiliates' },
    { title: 'Actividades', icon: Dumbell, href: '/admin/activities' },
  ]


  return (
   <nav className={style.nav}>
          <ul className={style.list}>
            {NavLinks.map(({title, icon: Icon, href}) => (
              <li className={`${style.item} ${pathname === href ? style.active : ''} ${invert ? 'invert' : ''}`} key={title}>
                <Link href={href} className={style.link}>
                  <Icon className={style.icons} />
                  <p>
                    {title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
      </nav>
  )
}