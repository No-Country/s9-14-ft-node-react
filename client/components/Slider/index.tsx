import style from './style.module.scss'

export function Slider ({children}: {children: React.ReactNode}) {
  return ( // Todo lo que este dentro se comportara como un slider
    <article className={style.slider}> 
      {children}
    </article>
  )
}