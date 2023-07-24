import HomeNav from "@/components/HomeNav";
import style from "@/styles/pages/home_trainers.module.scss";
import trainer1 from "@/public/trainer_1.png"
import trainer2 from "@/public/trainer_2.png"
import trainer3 from "@/public/trainer_3.png"
import trainer4 from "@/public/trainer_4.png"
import trainer5 from "@/public/trainer_5.png"
import trainer6 from "@/public/trainer_6.png"
import trainer7 from "@/public/trainer_7.png"
import trainer8 from "@/public/trainer_8.png"

import Image from "next/image";

export default function Trainers(){
    return(
    <div className={style.trainers}>
      <HomeNav />
    <h1 className={style.title}>CON LOS MEJORES <br></br> <span className={style.color_orange}>ENTRENADORES</span></h1>
    <section className={style.cards}>
        <article>
            <Image src={trainer1}></Image>
        </article>
        <article>
            <Image src={trainer2}></Image>
        </article>
        <article>
            <Image src={trainer3}></Image>
        </article>
        <article>
            <Image src={trainer4}></Image>
        </article>
        <article>
            <Image src={trainer5}></Image>
        </article>
        <article>
            <Image src={trainer6}></Image>
        </article>
        <article>
            <Image src={trainer7}></Image>
        </article>
        <article>
            <Image src={trainer8}></Image>
        </article>
    </section>
    </div>)
}