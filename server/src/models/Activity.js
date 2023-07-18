const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - description
 *         - image
 *         - trainer
 *       properties:
 *         _id:
 *           type: string
 *           description: El id de la actividad.
 *         name:
 *           type: string
 *           description: El nombre de la actividad.
 *         description:
 *           type: string
 *           description: La descrición de la actividad.
 *         image:
 *           type: string
 *           description: La imagen de la actividad.
 *         schedule:
 *           type: object
 *           description: Un objeto para representar días y horarios en los que se dará la actividad.
 *         freeVacancies:
 *           type: object
 *           description: Un objeto para representar los cupos disponibles en un día en concreto en el que se dará la actividad.
 *         totalVacancies:
 *           type: object
 *           description: Un objeto para representar los cupos totales en un día en concreto en el que se dará la actividad.
 *         trainer:
 *           type: string
 *           description: El id del entrenador que dictará la actividad.
 *         affiliates:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               affiliate:
 *                 type: string
 *                 description: El id del afiliado que se inscribió a la actividad.
 *               day:
 *                 type: string
 *                 description: El día en concreto al que el afiliado se inscribió para realizar la actividad.
 *       example:
 *         _id: '64b1c7063f6378c5f32c3b17'
 *         name: 'Body Pump'
 *         description: 'Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia y da tono muscular, pero también está diseñada para incrementar el gasto calórico de tal forma que ayuda también a mejorar la composición corporal y por tanto a perder grasa. Se ejecutan los ejercicios más básicos del gimnasio pero con la gran diferencia de ir al ritmo de la música y con pre-coreografías.'
 *         image: 'https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg'
 *         schedule:
 *           miércoles: "10:00-12:00"
 *         freeVacancies:
 *           miércoles: 19
 *         totalVacancies:
 *           miércoles: 20
 *         trainer: '64b1c7063f6378c5f32c3b0c'
 *         affiliates:
 *           - affiliate: '64b1c7063f6378c5f32c3b10'
 *             day: 'miércoles'
 */

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    unique: true
  },
  schedule: {
    type: Object
  },
  freeVacancies: {
    type: Object
  },
  totalVacancies: {
    type: Object
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  affiliates: [
    {
      affiliate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      day: {
        type: String,
        lowercase: true,
        enum: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        required: true
      }
    }
  ]
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
