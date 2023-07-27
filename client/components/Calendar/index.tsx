import styles from "./style.module.scss";

export const Calendar: React.FC = () => {

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.labels}>
          <div><p>07:00</p></div>
          <div><p>08:00</p></div>
          <div><p>09:00</p></div>
          <div><p>10:00</p></div>
          <div><p>11:00</p></div>
          <div><p>12:00</p></div>
          <div><p>13:00</p></div>
          <div><p>14:00</p></div>
          <div><p>15:00</p></div>
          <div><p>16:00</p></div>
          <div><p>17:00</p></div>
          <div><p>18:00</p></div>
          <div><p>19:00</p></div>
        </div>
        <div className={styles.labels2}>
          <div><p>Lunes</p></div>
          <div><p>Martes</p></div>
          <div><p>Miercoles</p></div>
          <div><p>Jueves</p></div>
          <div><p>Viernes</p></div>
          <div><p>Sabado</p></div>
        </div>
        <div className={styles.item}><p>Zumba</p></div>
        <div className={styles.item2}><p>Danza</p></div>
        <div className={styles.item3}><p>Zumba</p></div>
        <div className={styles.item4}><p>Aerobico</p></div>
        <div className={styles.item5}><p>Danza</p></div>
        <div className={styles.item6}><p>Zumba</p></div>
        <div className={styles.item7}><p>Danza</p></div>
        <div className={styles.item8}><p>Zumba</p></div>
        <div className={styles.item9}><p>Aerobico</p></div>
        <div className={styles.item10}><p>Danza</p></div>
      </div>
    </div>
  );
};