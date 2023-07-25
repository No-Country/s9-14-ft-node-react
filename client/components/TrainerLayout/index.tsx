import { ProtectedWrapper } from "../ProtectedWrapper"
import { AsideBar } from "../AsideBar"
import { TrainerNav } from "@/components/Navigation/TrainerNav"
import { Header } from "@/components/Header"
import style from './style.module.scss'

export function TrainerLayout ({children}: {children: React.ReactNode}) {
  return (
    <ProtectedWrapper>
      <main className={style.main}>
        <AsideBar Nav={TrainerNav} />
        <section className={style.content}>
          <Header placeholder="" Nav={TrainerNav} disabled={true} image="/trainerPicture.svg" />
          {children}
        </section>
        {children}
      </main>
    </ProtectedWrapper>
  )
}