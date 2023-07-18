const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     TrainingPlan:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - trainer
 *         - affiliates
 *       properties:
 *         _id:
 *           type: string
 *           description: El id del plan de entrenamiento.
 *         name:
 *           type: string
 *           description: El nombre del plan de entrenamiento.
 *         trainer:
 *           type: string
 *           description: El id del entrenador asociado al plan de entrenamiento.
 *         affiliates:
 *           type: array
 *           description: Los afiliados asociados al plan de entrenamiento.
 *         exercises:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: El id del ejercicio.
 *               name:
 *                 type: string
 *                 description: El nombre del ejercicio.
 *               setsAndRepetitions:
 *                 type: string
 *                 description: Las series y las repeticiones del ejercicio.
 *               weight:
 *                 type: number
 *                 description: El peso a levantar que tendrá el ejercicio.
 *               duration:
 *                 type: number
 *                 description: La duración en segundos que tendrá el ejericio.
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [lunes, martes, miércoles, jueves, viernes, sábado]
 *                 description: Un arreglo con los días asignados para realizar el ejercicio.
 *       example:
 *         _id: '64ad746f054ad30dc0fd2104'
 *         name: 'Plan 1'
 *         trainer: '64ad746f054ad30dc0fd20e5'
 *         affiliates:
 *           - '64ad746f054ad30dc0fd20e7'
 *         exercises:
 *           - _id: '64ad746f054ad30dc0fd2105'
 *             name: 'Sentadillas'
 *             setsAndRepetitions: '3x15'
 *             weight: 15
 *             duration: 0
 *             days:
 *               - 'lunes'
 *               - 'miércoles'
 *               - 'viernes'
 */

const TrainingPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  affiliates: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true
  },
  exercises: [
    {
      name: {
        type: String,
        required: true
      },
      setsAndRepetitions: {
        type: String,
        required: true
      },
      weight: {
        type: Number,
        required: true
      },
      duration: {
        type: Number,
        default: 0
      },
      days: {
        type: [String],
        enum: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        required: true
      }
    }
  ]
});

const TrainingPlan = mongoose.model("TrainingPlan", TrainingPlanSchema);

module.exports = TrainingPlan;
