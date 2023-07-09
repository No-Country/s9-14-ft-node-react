import style from "./style.module.scss";
import { Icons } from "../Icons";
import Image from "next/image";
import entrenadores from "../../public/entrenadores.png";
import adtividades from "../../public/adtividades .png";
import icon_florian from "../../public/icon_florian.png";
import Foto from "../../public/Foto.png";
import miembros from "../../public/miembros.png";
import sedes from "../../public/sedes.png";

const { Burger } = Icons;

export function AdminHeader() {
  return (
    <>
      <header className={style.header}>
        <div>
          <input type="search" placeholder="buscar" className={style.search} />
        </div>
        <div>
          <Burger className={style.burger} />
        </div>
      </header>
      <section className={style.container_image}>
        <div>
          <Image src={miembros} alt="" width={174} height={100} className={style.miembros} />

          <Image src={entrenadores} alt="" width={174} height={100} className="" />
        </div>
        <div>
          <Image src={sedes} alt="" width={174} height={100} className={style.sedes} />

          <Image src={sedes} alt="" width={174} height={100} className="" />
        </div>
      </section>
      <section className={style.miembro_container}>
        <div>
          <h2 className={style.h2_entrenadores}>Entrenadores</h2>
        </div>
        <div className={style.entrenadores_container}>
          <Image src={icon_florian} alt="" width={40} height={40} className={style.img} />
          <h5>Florian B</h5>
          <span>activo</span>
          <p>Ver mas</p>
        </div>
        <div className={style.entrenadores_container}>
          <Image src={icon_florian} alt="" width={40} height={40} className={style.img} />
          <h5>Florian B</h5>
          <span>activo</span>
          <p>Ver mas</p>
        </div>
        <div className={style.entrenadores_container}>
          <Image src={icon_florian} alt="" width={40} height={40} className={style.img} />
          <h5>Florian B</h5>
          <span>activo</span>
          <p>Ver mas</p>
        </div>
        <button className={style.btn}>Ver todos</button>
      </section>
      <section className={style.adtividades_container}>
        <div>
          <h2 className={style.h2_adtividades}>Adtividades</h2>
        </div>
        <div className={style.adtividades_container_p}>
          <h5>Florian B</h5>
          <span>activo</span>
          <p>Ver mas</p>
        </div>
        <div className={style.adtividades_container_p}>
          <h5>Florian B</h5>
          <span>activo</span>
          <p>Ver mas</p>
        </div>
        <div className={style.adtividades_container_p}>
          <h5>Florian B</h5>
          <span>activo</span>
          <p>Ver mas</p>
        </div>
        <div className={style.adtividades_container_p}>
          <h5>Florian B</h5>
          <span>activo</span>
          <p>Ver mas</p>
        </div>
        <div className={style.adtividades_container_p}>
          <h5>Florian B</h5>
          <span>activo</span>
          <p>Ver mas</p>
        </div>
        <button className={style.btn_adtiv}>Ver todos</button>
      </section>
      <section className={style.search_client}>
        <h4>Todos los miembros</h4>
        <p>Gestiona y añade nuevos miembros</p>
        <div className={style.container_btn}>
          <input type="search" placeholder="Buscar miembros" />
          <button className={style.btn_buscar}>Filter</button>
        </div>
        <hr className={style.hr} />
        <div className={style.container_img}>
          <div className={style.img_span}>
            <Image src={Foto} alt="" width={30} height={30} className="" />
            <span className={style.span}>El pistolero</span>
            <button>Al dia</button>
          </div>
          <div className={style.p_p}>
            <span>Mensual</span>
            <span>Florian</span>
            <span>Detalles</span>
          </div>
          <hr className={style.hr} />
        </div>
        <div className={style.container_img}>
          <div className={style.img_span}>
            <Image src={Foto} alt="" width={30} height={30} className="" />
            <span className={style.span}>El pistolero</span>
            <button>Al dia</button>
          </div>
          <div className={style.p_p}>
            <span>Mensual</span>
            <span>Florian</span>
            <span>Detalles</span>
          </div>
        </div>
        <hr className={style.hr} />
        <div className={style.container_img}>
          <div className={style.img_span}>
            <Image src={Foto} alt="" width={30} height={30} className="" />
            <span className={style.span}>El pistolero</span>
            <button>Al dia</button>
          </div>
          <div className={style.p_p}>
            <span>Mensual</span>
            <span>Florian</span>
            <span>Detalles</span>
          </div>
        </div>
        <hr className={style.hr} />
      </section>
    </>
  );
}
