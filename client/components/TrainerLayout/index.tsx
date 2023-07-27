import { ProtectedWrapper } from "../ProtectedWrapper"
import { AsideBar } from "../AsideBar"
import { TrainerNav } from "@/components/Navigation/TrainerNav"
import { Header } from "@/components/Header"
import style from './style.module.scss'
import Head from "next/head"

interface Props {
  children: React.ReactNode
  placeholder: string
  onSearch?: (arg: string)=> void
  disabled?: boolean
}

export function TrainerLayout ({children, disabled, placeholder, onSearch}: Props) {
  return (
    <ProtectedWrapper>
      <Head>
        <title>Trainer | MANAGYM</title>
      </Head>
      <main className={style.main}>
        <AsideBar Nav={TrainerNav} />
        <section className={style.content}>
          <Header placeholder={placeholder} onSearch={onSearch} disabled={disabled} Nav={TrainerNav} image="/trainerPicture.svg" />
          {children}
        </section>
      </main>
    </ProtectedWrapper>
  )
}