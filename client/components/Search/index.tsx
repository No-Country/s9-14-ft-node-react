import style from './style.module.scss'
import { Icons } from '../Icons'
import { useEffect, useState } from "react"

const { Search: Icon } = Icons

export function Search ({className, placeholder} : {className?: string, placeholder: string}) { //Should receive a prop to filter the search and extra styles
  const [value, setValue] = useState('')

  useEffect(()=> {
    console.log(value)
  }, [value])

  return (
    <span className={style.container}>
      <Icon className={style.icon} />
      <input className={`${style.input} ${className}`} placeholder={placeholder} type="text" value={value} onChange={(e)=> setValue(e.target.value)} />
    </span>
  )
}