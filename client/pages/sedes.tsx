import HomeNav from "@/components/HomeNav";
import style from "@/styles/pages/home_sedes.module.scss";
import Image from "next/image";
import instalaciones1 from "@/public/instalaciones 1.png"
import instalaciones2 from "@/public/instalaciones 2.png"
import instalaciones3 from "@/public/instalaciones 3.png"
import instalaciones4 from "@/public/instalaciones 4.png"

export default function Sedes(){
    return(
    <div className={style.sedes}>
      <HomeNav />
    <h1 className={style.title}>NUESTRAS INSTALACIONES</h1>
    <h5>En las mejores localizaciones de la ciudad</h5>
    <section className={style.cards}>
        <article>
          <Image src={instalaciones1}></Image>
        </article>
        <article>
          <Image src={instalaciones2}></Image>
        </article>
        <article>
          <Image src={instalaciones3}></Image>
        </article>
        <article>
          <Image src={instalaciones4}></Image>
        </article>
    </section>
    </div>)
}

/*<article>
<Image></Image>
</article>
<article>
<Image></Image>
</article>
<article>
<Image></Image>
</article>
<article>
<Image></Image>
</article>
*/