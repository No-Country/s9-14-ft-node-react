import HomeNav from "@/components/HomeNav";
import style from "@/styles/pages/home_membership.module.scss";

export default function Membership(){
    return(
    <div className={style.membership}>
      <HomeNav />
        <h1 className={`${style.title} ${style.color_orange}`}>PLAN DE MEMBRESIAS</h1>
        <section className={style.plans}>
          <article className={`${style.plan} ${style.basic}`}>
            <h2 className={style.font_30}>Básico</h2>
            <p>Membresia</p>
            <p className={style.price}><span className={style.font_50}>$5000</span>/mensual</p>
            <p className={style.color_orange}>Ahorras 30%</p>
            <ul className={style.list}>
                <li className={style.li}>Acceso limitado al gimnasio</li>
                <li className={style.li}>Uso de equipos de entrenamiento</li>
                <li className={style.li}>Asesoramiento básico</li>
            </ul>
            <button className={`${style.button} ${style.button_basic}`}>Elegir Plan</button>
          </article>
          <article className={`${style.plan} ${style.premium}`}>
            <h2 className={style.font_30}>Premium</h2>
            <p>Membresia</p>
            <p className={style.price}><span className={style.font_50}>7500$</span>/mensual</p>
            <p className={style.color_orange}>Ahorras 30%</p>

            <ul className={style.list}>
                <li className={style.li}>Todas las opciones del plan básico</li>
                <li className={style.li}>Acceso ilimitado y prioritario</li>
                <li className={style.li}>Entrenador personal dedicado</li>
                <li className={style.li}>Clases especializadas</li>
            </ul>
            <button className={`${style.button} ${style.button_premium}`}>Elegir Plan</button>
          </article>
        </section>
    </div>)
}