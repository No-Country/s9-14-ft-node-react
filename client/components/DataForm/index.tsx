import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./style.module.scss";

interface FormData {
  name: string;
  email: string;
  birthday: string;
  phone: string;
  lastName: string;
  password: string;
  age: number;
  emergency: number;
  meddoc: string;
  member: string;
}

const DataForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    birthday: "",
    phone: "",
    lastName: "",
    password: "",
    age: 0,
    emergency: 0,
    meddoc: "",
    member: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(formData)

    // Reset form fields
    setFormData({
      name: "",
      email: "",
      birthday: "",
      phone: "",
      lastName: "",
      password: "",
      age: 0,
      emergency: 0,
      meddoc: "",
      member: "",

    });
  };

  return (
    <div className={styles.App}>
      <h2 className={styles.Title}>DATOS AFILIADO</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formcont}>
          <div className={`${styles.first} ${styles.part}`}>
            <div className={styles.field}>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="birthday">Fecha de nacimiento:</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Telefono:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={`${styles.second} ${styles.part}`}>
            <div className={styles.field}>
              <label htmlFor="lastName">Apellido:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="age">Edad:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="emergency">Emergency:</label>
              <input
                type="number"
                id="emergency"
                name="emergency"
                value={formData.emergency}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className={`${styles.last} ${styles.part}`}>
          <div className={`${styles.lasts} ${styles.field}`}>
            <label htmlFor="name">Apto medico:</label>
            <div className={styles.status}><p>Vencido</p></div>
            <input
              type="date"
              id="meddoc"
              name="meddoc"
              value={formData.meddoc}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={`${styles.lasts} ${styles.field}`}>
            <label htmlFor="name">Membresia:</label>
            <div className={styles.plan}><p>Mensual</p></div>
            <input
              type="date"
              id="member"
              name="member"
              value={formData.member}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default DataForm;
