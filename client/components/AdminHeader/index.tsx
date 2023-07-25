import style from "./style.module.scss";
import { Icons } from "../Icons";
import { Search } from "../Search";
import { UserPhoto } from "../UserPhoto";
import burgerSvg from '@/public/menuburger.svg'
import closeSvg from '@/public/close.svg'
import alertSvg from '@/public/alert.svg'
import Image from "next/image";
import { useState } from "react";
import { AdminNav } from "../AdminNav";
import { useUser } from "@/hooks/useUser";

const { Logo, Exit } = Icons;

interface Props {
  placeholder: string
  onSearch?: (arg: string)=> void
  disabled?:boolean
}

export function AdminHeader({placeholder, onSearch, disabled = false}: Props) {
  const [isActive, setIsActive] = useState(false)
  const user = useUser() 

  return (
    <>
      <header className={style.header}>
        <div className={style.user}>
          <div className={style.icons}>
            <Logo className={style.logo} />
            <div className={style.picture}>
            <span className={style.data}>
              <UserPhoto src="/adminPicture.svg" />
              <span>
                <h4>{user?.name}</h4>
                <small>Admin</small>
              </span>
            </span>
            <Image src={alertSvg} alt="alert" className={style.alert} />
          </div>
          </div>
        </div>

        <div className={style.menu}>
          <Search onSearch={onSearch} placeholder={placeholder} disabled={disabled} />
          <Image src={burgerSvg} className={style.burger} onClick={()=> setIsActive(!isActive)} alt="burgermenu" />
        </div>
      </header>

    {
      isActive ? 
      <div>

      <div className={style.active_menu}>
        <span>
          <h2>MENU</h2>
          <Image src={closeSvg} className={style.icon} onClick={()=> setIsActive(!isActive)} alt="close" />
        </span>
        <div className={style.active_items}>
          <AdminNav />
          <div className={style.others}>
            <ul className={style.list}>
              <li className={style.item}>
                <div className={style.exit} onClick={()=> {}}>
                <Exit className={style.icons} />
                <p>
                  Salir
                </p>
                </div>
              </li>
            </ul>
          </div>
      </div>
      </div>
      </div>
      : null
    }

      
    </>
  );
}
