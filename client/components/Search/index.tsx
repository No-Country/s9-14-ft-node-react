import style from './style.module.scss'
import { Icons } from '../Icons'
import { useEffect, useState } from "react"

const { Search: Icon } = Icons

export function Search ({className, placeholder, onSearch, disabled} : {className?: string, placeholder: string, onSearch?: (arg: string)=> void, disabled: boolean}) { //Should receive a prop to filter the search and extra styles
  const [value, setValue] = useState('')

  useEffect(()=> {
    if (onSearch) {
      const doSearch = setTimeout(()=> {
        onSearch(value)
      }, 500)
      
      return ()=> clearTimeout(doSearch)
    }
  }, [value])

  return (
    <span className={style.container}>
      <Icon className={style.icon} />
      <input className={`${style.input} ${className}`} disabled={disabled || (location.pathname === '/admin' ? true : false)} placeholder={placeholder} type="text" value={value} onChange={(e)=> setValue(e.target.value)} />
    </span>
  )
}