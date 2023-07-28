import { useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/pages/login.module.scss";
import logoSvg from "../public/Logo.svg";
import burgerSvg from "../public/menuburger.svg";
import Image from "next/image";
import Link from "next/link";
import { useSessionActions } from "@/hooks/useSession";
import { useUserActions } from "@/hooks/useUser";
import { useRouter } from "next/router";
import Head from "next/head";
interface FormData {
  email: string;
  password: string;
}

export default function LogIn() {
  const { setData } = useSessionActions()
  const { setUser } = useUserActions()
  const {push} = useRouter()

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.email &&  formData.password) {
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (request.ok) {
        const response = await request.json() 
        
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/profile`, {
          headers: {
            'Content-Type': 'application/json',
            'x-token': response.token
          }
        })
        .then(res => res.ok ? res.json() : res)
        // Se deberia redirigir a la pagina de inicio de su correspondiente rol
        .then (res => {
          setUser(res.user)
          setData({token: response.token, role: res.role})
          push(`${res.role}`)
        })
        .catch(console.error)

      } else {
        const error = await request.json()
        console.log(error)
      }
    } 
  
    // Reset form fields
    setFormData({
      email: "",
      password: ""
    });
  };

  return (
    <div className={styles.App}>
      <Head>
        <title>Login | MANAGYM</title>
      </Head>
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
