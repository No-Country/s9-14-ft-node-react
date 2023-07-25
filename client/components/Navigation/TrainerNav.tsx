import { Icons } from '../Icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './style.module.scss'

const { Logo, Menu, Runner, Affiliate, Dumbell, User, Exit } = Icons

export function TrainerNav () {
  const {pathname} = useRouter()

  const NavLinks = [
    { title: 'Menu', icon: Menu, href: '/trainer' },
    { title: 'Afiliados', icon: Affiliate, href: '/trainer/affiliates' },
    { title: 'Planes', icon: Dumbell, href: '/trainer/plans' },
  ]

  return (
   <nav className={style.nav}>
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
      </nav>
  )
}