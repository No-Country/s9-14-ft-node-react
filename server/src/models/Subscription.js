const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - _id
 *         - trainer
 *         - affiliate
 *       properties:
 *         _id:
 *           type: string
 *           description: El id del plan de entrenamiento.
 *         trainer:
 *           type: string
 *           description: El id del entrenador asociado al plan de entrenamiento.
 *         affiliate:
 *           type: string
 *           description: El id del afiliado asociado al plan de entrenamiento.
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
 *               sets:
 *                 type: number
 *                 description: Las series del ejercicio.
 *               repetitionsOrDuration:
 *                 type: number
 *                 description: El número de repeticiones o la duración del ejercicio.
 *               isRepetitions:
 *                 type: boolean
 *                 description: Indica si el ejercicio necesita un número de repeticiones o una duración determinada en segundos.
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [lunes, martes, miércoles, jueves, viernes, sábado]
 *                 description: Un arreglo con los días asignados para realizar el ejercicio.
 *       example:
 *         _id: '64ad746f054ad30dc0fd2104'
 *         trainer: '64ad746f054ad30dc0fd20e5'
 *         affiliate: '64ad746f054ad30dc0fd20e7'
 *         exercises:
 *           - _id: '64ad746f054ad30dc0fd2105'
 *             name: 'Sentadillas'
 *             sets: 3
 *             repetitionsOrDuration: 15
 *             isRepetitions: true
 *             days:
 *               - 'lunes'
 *               - 'miércoles'
 *               - 'viernes'
 */

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  benefits: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true,
    unique: true
  },
  duration: {
    type: String,
    lowercase: true,
    enum: ["mensual", "anual"],
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
