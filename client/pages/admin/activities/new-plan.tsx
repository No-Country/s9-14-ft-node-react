import styles from "../../../components/DataForm/style.module.scss";
import { useState, ChangeEvent, FormEvent } from "react";
import { useTrainers } from "@/hooks/useTrainers";
import { useSession } from "@/hooks/useSession";
import { AdminLayout } from "@/components/AdminLayout";
import { useAffiliates } from "@/hooks/useAffiliates";

interface exercice {
  name: string;
  setsAndRepetitions: string;
  weight: number;
  duration: number;
  days: string[];
}

interface newPlan {
  name: string;
  trainer: string;
  affiliates: string[];
  exercices: exercice[];
}
interface ExerciceInputGroupProps {
  index: number;
  exercice: exercice;
  onChange: (index: number, field: string, value: any) => void;
}

const ExerciceInputGroup: React.FC<ExerciceInputGroupProps> = ({ index, exercice, onChange }) => {
  const handleInputChange = (field: string, value: any) => {
    onChange(index, field, value);
  };

  return (
    <div className={styles.excercices_item}>
      <input
        type="text"
        placeholder="Nombre del ejercicio"
        value={exercice.name}
        onChange={e => handleInputChange("name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Set x Rep"
        value={exercice.setsAndRepetitions}
        onChange={e => handleInputChange("setsAndRepetitions", e.target.value)}
      />
      <input
        type="number"
        value={exercice.weight}
        onChange={e => handleInputChange("weight", e.target.value)}
      />
      <input
        type="number"
        value={exercice.duration}
        onChange={e => handleInputChange("duration", e.target.value)}
      />
    </div>
  );
};

const Component: React.FC = () => {
  const [plan, setPlan] = useState<newPlan>({
    name: "",
    trainer: "",
    affiliates: [],
    exercices: [
      {
        name: "",
        setsAndRepetitions: "",
        weight: 0,
        duration: 0,
        days: ["lunes"]
      }
    ]
  });
  const [inputGroups, setInputGroups] = useState<exercice[]>([]);
  const trainers = useTrainers();
  const affiliates = useAffiliates();
  const sesion = useSession();

  const handleAddExercise = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newExercise: exercice = {
      name: "",
      setsAndRepetitions: "",
      weight: 0,
      duration: 0,
      days: ["lunes"]
    };

    setPlan({ ...plan, exercices: [...plan.exercices, newExercise] });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e);

    const { name, value } = e.target;
    setPlan(prevPlan => ({
      ...prevPlan,
      [name]: value
    }));
  };
  const handleInputChangeB = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e);

    const { name, value } = e.target;

    const newval: string[] = [`${value}`];
    setPlan(prevPlan => ({
      ...prevPlan,
      [name]: newval
    }));
  };
  const handleExerciceChange = (index: number, field: string, value: any) => {
    const updatedExercices = [...plan.exercices];
    updatedExercices[index] = {
      ...updatedExercices[index],
      [field]: value
    };
    setPlan({ ...plan, exercices: updatedExercices });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (plan) {
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainingPlans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": sesion.token
        },
        body: JSON.stringify(plan)
      });

      if (request.ok) {
        const response = await request.json();
        console.log(response);
      } else {
        const error = await request.json();
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.App}>
      <h2 className={styles.Title}>NUEVO PLAN DE EJERCICIOS</h2>
      <form className={styles.formNew} onSubmit={handleSubmit}>
        <div className={styles.ex_formcont}>
          <div className={styles.excercices_top}>
            <div className={styles.field}>
              <label htmlFor="name">Nombre del plan: </label>
              <input type="text" name="name" id="name" onChange={handleInputChange} />
            </div>
          </div>
          <div className={styles.excercices_top}>
            <div className={styles.field}>
              <label htmlFor="trainer">Entrenador: </label>
              <select name="trainer" id="trainer" onChange={handleInputChange}>
                <option value="">Selecciona un entrenador</option>
                {trainers.map(element => {
                  return (
                    <option value={element._id} key={element._id}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="affiliates">Afiliado: </label>
              <select name="affiliates" id="affiliates" onChange={handleInputChangeB}>
                <option value="">Selecciona un afiliado</option>
                {affiliates.map(element => {
                  return (
                    <option value={element._id} key={element._id}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={`${styles.ex_labels}`}>
            <p>Nombre</p>
            <p>Reps/Sets</p>
            <p>Peso</p>
            <p>Duracion</p>
          </div>
          <div className={styles.excercices} id="holder">
            {plan.exercices.map((exercice, index) => (
              <ExerciceInputGroup
                key={index}
                index={index}
                exercice={exercice}
                onChange={handleExerciceChange}
              />
            ))}
          </div>
          <button onClick={handleAddExercise}>Agregar ejercicio</button>
        </div>
        <button type="submit">Guardar nuevo plan</button>
      </form>
    </div>
  );
};

export default function newPlan() {
  return (
    <AdminLayout disabled={true} placeholder="">
      <section>
        <Component />
      </section>
    </AdminLayout>
  );
}
