import { AdminLayout } from "@/components/AdminLayout";
import styles from "../../../components/DataForm/style.module.scss";
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useTrainers } from "@/hooks/useTrainers";
import { useSession } from "@/hooks/useSession";
import { useActivitiesActions } from "@/hooks/useActivities";
import { useRouter } from "next/router";


interface FormData {
  name: string;
  description: string;
  image: string;
  days: string[];
  schedule: string[];
  limit: number;
  trainer: string;
}

interface CheckboxFormState {
  [key: number]: boolean;
}

interface weekFormState {
  [key: string]: boolean;
}

const Component2: React.FC = () => {
  const {push} = useRouter()
  const {addActivity} = useActivitiesActions()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image: "",
    days: [],
    schedule: [],
    limit: 0,
    trainer: ""
  });

  const imageRef = useRef<HTMLInputElement>(null);

  const initialFormState: CheckboxFormState = {
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false,
    21: false,
    22: false
  };

  const initialWeekFormState: weekFormState = {
    Lunes: false,
    Martes: false,
    Miercoles: false,
    Jueves: false,
    Viernes: false
  };

  const days = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
  const [checkboxes, setCheckboxes] = useState<CheckboxFormState>(initialFormState);
  const [weekCheckboxes, setWeekCheckboxes] = useState<weekFormState>(initialWeekFormState);
  const trainers = useTrainers();

  useEffect(() => {
    let finalDays: string[] = [];
    const checked = Object.values(weekCheckboxes)

    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) {
        finalDays.push(days[i])
      }
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      days: finalDays
    }));
  }, [weekCheckboxes]);

  useEffect(() => {
    let finalHours: string[] = [];
    for (let prop in checkboxes) {
      if (checkboxes[prop]) {
        let prop2 = `${prop}`;
        if (prop2.length > 1) {
          finalHours.push(`${prop}:00`);
        } else {
          finalHours.push(`0${prop}:00`);
        }
      }
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      schedule: finalHours
    }));
  }, [checkboxes]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes(prevCheckboxes => ({
      ...prevCheckboxes,
      [name]: checked
    }));
  };

  const handleWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setWeekCheckboxes(PrevWeekCheckboxes => ({
      ...PrevWeekCheckboxes,
      [name]: checked
    }));
  };

  const sesion = useSession();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const image = imageRef.current?.files?.[0];
    const toCloud = new FormData();
    toCloud.append("file", image as Blob);
    toCloud.append("upload_preset", "bkurgssr");
    let imageUrl

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfdgsotzz/image/upload",
        {
          method: "POST",
          body: toCloud,
        }
      );
      const data = await response.json();
      imageUrl = data.secure_url
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }


    if (formData && sesion?.token && imageUrl) {

      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": sesion.token
        },
        body: JSON.stringify({...formData, image: imageUrl, quota: 20})
      });

      if (request.ok) {
        const response = await request.json();
        addActivity(sesion.token, response.activity)
        push('/admin/activities')
      } else {
        const error = await request.json();
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.App}>
      <h2 className={styles.Title}>NUEVA ACTIVIDAD</h2>
      <form onSubmit={handleSubmit} className={styles.formNew}>
        <div className={styles.formcont}>
          <div className={`${styles.first} ${styles.part}`}>
            <div className={styles.field}>
              <label htmlFor="name">Actividad:</label>
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
              <label htmlFor="trainer">Profesor:</label>
              <select name="trainer" id="trainer" onChange={handleInputChange}>
                <option value="">Selecciona un profesor</option>
                {trainers.map(element => {
                  return (
                    <option value={element._id} key={element._id}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={`${styles.first} ${styles.part}`}>
            <div className={styles.field}>
              <label htmlFor="image">Imagen:</label>
              <input
                type="file"
                id="image"
                name="image"
                ref={imageRef}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="limit">Cupo:</label>
              <input
                type="number"
                id="limit"
                name="limit"
                value={formData.limit}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.timeline}>
          <label htmlFor="">Dias disponibles:</label>
          <div className={styles.checklist}>
            <article className={styles.articleweek}>
              <input
                type="checkbox"
                name="Lunes"
                checked={weekCheckboxes.Lunes}
                onChange={handleWeekChange}
                id="7"
                value="7"
              />
              <div>Lunes</div>
            </article>
            <article className={styles.articleweek}>
              <input
                type="checkbox"
                name="Martes"
                checked={weekCheckboxes.Martes}
                onChange={handleWeekChange}
                id="8"
                value="8"
              />
              <div>Martes</div>
            </article>
            <article className={styles.articleweek}>
              <input
                type="checkbox"
                name="Miercoles"
                checked={weekCheckboxes.Miercoles}
                onChange={handleWeekChange}
                id="9"
                value="9"
              />
              <div>Miercoles</div>
            </article>
            <article className={styles.articleweek}>
              <input
                type="checkbox"
                name="Jueves"
                checked={weekCheckboxes.Jueves}
                onChange={handleWeekChange}
                id="10"
                value="10"
              />
              <div>Jueves</div>
            </article>
            <article className={styles.articleweek}>
              <input
                type="checkbox"
                name="Viernes"
                checked={weekCheckboxes.Viernes}
                onChange={handleWeekChange}
                id="Viernes"
                value="Viernes"
              />
              <div>Viernes</div>
            </article>
          </div>
        </div>
        <div className={styles.timeline}>
          <label htmlFor="">Horarios disponibles:</label>
          <div className={styles.checklist}>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="7"
                checked={checkboxes[7]}
                onChange={handleChange}
                id="7"
                value="7"
              />
              <div>07:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="8"
                checked={checkboxes[8]}
                onChange={handleChange}
                id="8"
                value="8"
              />
              <div>08:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="9"
                checked={checkboxes[9]}
                onChange={handleChange}
                id="9"
                value="9"
              />
              <div>09:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="10"
                checked={checkboxes[10]}
                onChange={handleChange}
                id="10"
                value="10"
              />
              <div>10:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="11"
                checked={checkboxes[11]}
                onChange={handleChange}
                id="11"
                value="11"
              />
              <div>11:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="12"
                checked={checkboxes[12]}
                onChange={handleChange}
                id="12"
                value="12"
              />
              <div>12:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="13"
                checked={checkboxes[13]}
                onChange={handleChange}
                id="13"
                value="13"
              />
              <div>13:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="14"
                checked={checkboxes[14]}
                onChange={handleChange}
                id="14"
                value="14"
              />
              <div>14:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="15"
                checked={checkboxes[15]}
                onChange={handleChange}
                id="15"
                value="15"
              />
              <div>15:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="16"
                checked={checkboxes[16]}
                onChange={handleChange}
                id="16"
                value="16"
              />
              <div>16:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="17"
                checked={checkboxes[17]}
                onChange={handleChange}
                id="17"
                value="17"
              />
              <div>17:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="18"
                checked={checkboxes[18]}
                onChange={handleChange}
                id="18"
                value="18"
              />
              <div>18:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="19"
                checked={checkboxes[19]}
                onChange={handleChange}
                id="19"
                value="19"
              />
              <div>19:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="20"
                checked={checkboxes[20]}
                onChange={handleChange}
                id="20"
                value="20"
              />
              <div>20:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="21"
                checked={checkboxes[21]}
                onChange={handleChange}
                id="21"
                value="21"
              />
              <div>21:00</div>
            </article>
            <article className={styles.article}>
              <input
                type="checkbox"
                name="22"
                checked={checkboxes[22]}
                onChange={handleChange}
                id="22"
                value="22"
              />
              <div>22:00</div>
            </article>
          </div>
        </div>
        <div className={styles.field_description}>
          <label htmlFor="description">Descripcion:</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Describe la tarea"
            onChange={handleInputChange}
          />

        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// const Component: React.FC = () => {

//   interface exercice {
//     name: string;
//     setsAndRepetitions: string;
//     weight: string;
//     duration: string;
//     days: string[];
//   }

//   interface excercices extends Array<exercice> { }

//   interface newPlan {
//     name: string;
//     trainer: string;
//     affiliates: string[];
//     exercices: excercices;
//   }

//   const [first, setfirst] = useState(second)

//   function newExcercise() {
//     event.preventDefault();

//     // Step 1: Select the element with the id 'holder'
//     const holder = document.getElementById("holder");

//     // Make sure the 'holder' element exists
//     if (!holder) {
//       console.error("Element with id 'holder' not found.");
//       return;
//     }

//     // Step 2: Create a new div element with the classname attribute equal to {styles.exercises_item}
//     const newDiv = document.createElement("div");
//     newDiv.classList.add(`${styles.excercices_item}`);

//     // Step 3: Edit the HTML inside the div element (You can replace 'Your content goes here' with your desired content)
//     newDiv.innerHTML = `              
//     <input
//     type="text"
//     id="name"
//     name="name"
//     value=""
//     placeholder="Nombre de Ejercicio"
//     required
//   />
//   <input type="number" id="sets" name="sets" value="" required />
//   <input
//     type="number"
//     id="repetitionsDuration"
//     name="repetitionsDuration"
//     value=""
//     required
//   />
//   <input type="checkbox" />
//   `;

//     // Step 4: Add the div element at the end of the holder element
//     holder.appendChild(newDiv);
//   }

//   return (
//     <div className={styles.App}>
//       <h2 className={styles.Title}>NUEVO PLAN DE EJERCICIOS</h2>
//       <form className={styles.formNew}>
//         <div className={styles.ex_formcont}>
//           <div className={`${styles.ex_labels}`}>
//             <p>Nombre</p>
//             <p>Sets</p>
//             <p>Tiempo/Repeticion</p>
//             <p>Es tiempo?</p>
//           </div>
//           <div className={`${styles.excercices}`} id="holder">
//             <div className={styles.excercices_item}>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value=""
//                 placeholder="Nombre de Ejercicio"
//                 required
//               />
//               <input type="number" id="sets" name="sets" value="" required />
//               <input
//                 type="number"
//                 name="reps"
//                 id="repetitionsDuration"
//                 value=""
//                 required
//               />
//               <input type="checkbox" name="isreps"/>
//             </div>
//           </div>
//           <button onClick={newExcercise}>Agregar ejercicio</button>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

export default function newActivity() {
  return (
    <AdminLayout disabled={true} placeholder="">
      <section>
        <Component2 />
      </section>
    </AdminLayout>
  );
}
