import style from './style.module.scss';
import { Icons } from '../Icons';

const {Burger} = Icons

export function AdminHeader () {
  return (
    <header className={style.header}>
      <Burger className={style.burger} />
    </header>
  )

}