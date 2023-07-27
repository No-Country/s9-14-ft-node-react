const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - description
 *         - benefits
 *         - price
 *         - duration
 *       properties:
 *         _id:
 *           type: string
 *           description: El id de la suscripción.
 *         name:
 *           type: string
 *           description: El nombre de la suscripción.
 *         description:
 *           type: string
 *           description: La descrición de la suscripción.
 *         benefits:
 *           type: array
 *           items:
 *             type: string
 *           description: Un arreglo con los diferentes beneficios de la suscripción.
 *         price:
 *           type: number
 *           description: El precio que tendrá la suscripción.
 *         duration:
 *           type: string
 *           enum: [mensual, anual]
 *           description: La duración que tendrá la suscripción.
 *         startDate:
 *           type: string
 *           description: El día de comienzo de la suscripción.
 *         endDate:
 *           type: string
 *           description: El día de vencimiento de la suscripción.
 *       example:
 *         _id: '64b1c7053f6378c5f32c3af6'
 *         name: 'Plan Básico'
 *         description: 'El Plan de Membresía Básico es perfecto para aquellos que buscan mantenerse activos y disfrutar de los beneficios de un gimnasio bien equipado. Con esta suscripción, tendrás acceso a nuestras instalaciones y servicios básicos, permitiéndote trabajar en tu estado físico y alcanzar tus objetivos de salud.'
 *         benefits:
 *           - 'Acceso limitado al gimnasio: Podrás acceder a nuestras instalaciones durante los horarios de apertura establecidos, permitiéndote entrenar en un ambiente cómodo y seguro.'
 *           - 'Uso de equipos de entrenamiento: Tendrás acceso a una amplia gama de equipos de última generación, que incluyen pesas libres, mancuernas, bicicletas fijas, máquinas de musculación y más, para ayudarte a trabajar en diferentes áreas de tu cuerpo.'
 *           - 'Asesoramiento básico: Nuestro personal estará disponible para brindarte asesoramiento básico sobre el uso adecuado de los equipos y responder a tus preguntas relacionadas con el entrenamiento y la salud.'
 *         price: 5000
 *         duration: 'mensual'
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
    required: true
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
  },
  status: {
    type: String,
    enum: ["al día", "próximo a vencer", "vencido"]
  }
});

SubscriptionSchema.methods.toJSON = function () {
  const { __v, ...subscription } = this.toObject();
  return subscription;
};

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
