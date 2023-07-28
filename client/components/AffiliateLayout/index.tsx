import { ProtectedWrapper } from "../ProtectedWrapper"
import style from '@/styles/pages/affiliate_dashboard.module.scss'
import Head from "next/head"

interface Props {
  children: React.ReactNode
}

export function AffiliateLayout ({children}: Props) {
  return (
    <ProtectedWrapper>
      <Head>
        <title>Affiliate | MANAGYM</title>
      </Head>
      <main className={style.main}>
        <section className={style.content}>
          {children}
        </section>
      </main>
    </ProtectedWrapper>
  )
}