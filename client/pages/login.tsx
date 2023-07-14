import { useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/pages/login.module.scss";
import { Icons } from "../components/Icons";
import logoSvg from "../public/Logo.svg";
import burgerSvg from "../public/menuburger.svg";
import Image from "next/image";
import Link from "next/link";

const { Logo, Menu, Runner, Affiliate, Dumbell, User, Exit } = Icons;

interface FormData {
  email: string;
  password: string;
}

export default function LogIn() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData); // Log the form data to the console

    // Reset form fields
    setFormData({
      email: "",
      password: ""
    });
  };

  return (
    <div className={styles.App}>
      <nav className={styles.Nav}>
        <Image src={logoSvg} alt="Logo" />
        <Image src={burgerSvg} alt="burgermenu" />
      </nav>
      <div className={styles.Main}>
        <div className={styles.loginform}>
          <h2>
            ¡Hola de vuelta!
            <br />
            Ingresa para continuar tus metas
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contrasena"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button type="submit">Iniciar Sesion</button>
          </form>
          <a href="">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
      <footer className={styles.Footer}>
        <Image src={logoSvg} alt="FooterLogo" />
        <div className={styles.Footer_holder}>
          <Link href="">Principal</Link>
          <Link href="">Membresias</Link>
          <Link href="">Entrenadores</Link>
          <Link href="">Actividades</Link>
          <Link href="">Sedes</Link>
        </div>
        <div className={styles.Icons_holder}>
          <div className={styles.IconCont}></div>
          <div className={styles.IconCont}></div>
          <div className={styles.IconCont}></div>
        </div>
      </footer>
    </div>
  );
}
