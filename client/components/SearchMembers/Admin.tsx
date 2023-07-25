import { Icons } from '@/components/Icons';
import { useEffect, useState } from 'react';
import style from './style.module.scss'
import type { User } from '@/types';
import { AlDia } from '@/components/Statuses/AlDia';
import { Vencido } from '@/components/Statuses/Vencido';

const {Search} = Icons


export function SearchMembers ({members}: {members: User[]}) {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(members) 

  useEffect(()=> {
    const doSearch = setTimeout(()=> {
      // La busqueda es local porque no hay ninguna funcionalidad que requiera actualizacion
      if (value) {
        const filtered = members.filter((member: any)=> member.name.toLowerCase().includes(value.toLowerCase()))
        setSearch(filtered.length > 0 ? filtered : members)
      } else {
        setSearch(members)
      }
    }, 500)

    return ()=> clearTimeout(doSearch)
  }, [value, members])

  return (
    <section className={style.container}>
      <div className={style.description}>
        <span className={style.text}>
          <h3>Todos los miembros</h3>
          <small>Gestiona y añade nuevos miembros</small>
        </span>
        <div className={style.search}>
          <Search className={style.icon} />
          <input className={`${style.input}`} placeholder='Buscar miembros' type="text" value={value} onChange={(e)=> setValue(e.target.value)} />
        </div>
      </div>
      <ul className={style.shown}>
        {
          search.map((member: User)=> {
            return (
              <li className={style.item} key={member._id}>
                <span>
                  <p>{member.name}</p>
                  {member.status ? <AlDia /> : <Vencido />}
                </span>
                <span>
                  <p>Mensual</p>
                  <p>Detalles</p>
                </span>
              </li>
            )
          })
        }
      </ul>
    </section>
  
  )
}