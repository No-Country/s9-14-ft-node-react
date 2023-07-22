const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - surname
 *         - email
 *         - password
 *         - role
 *         - birthday
 *       properties:
 *         _id:
 *           type: string
 *           description: El id del usuario.
 *         name:
 *           type: string
 *           description: El nombre del usuario.
 *         surname:
 *           type: string
 *           description: El apellido del usuario.
 *         email:
 *           type: string
 *           description: El email del usuario.
 *         password:
 *           type: string
 *           description: La contraseña del usuario.
 *         status:
 *           type: boolean
 *           description: El estatus del usuario.
 *         phone:
 *           type: number
 *           description: El número de teléfono del usuario.
 *         phoneEmergency:
 *           type: number
 *           description: El número de teléfono de emergencia del usuario.
 *         role:
 *           type: string
 *           enum: [admin, trainer, affiliate]
 *           description: El rol del usuario.
 *         subscriptions:
 *           type: array
 *           items:
 *             type: string
 *           description: Un arreglo de ids de las suscripciones del usuario.
 *         birthday:
 *           type: string
 *           description: La fecha de nacimiento del usuario.
 *         fitMedical:
 *           type: object
 *           properties:
 *             valid:
 *               type: boolean
 *               description: Indica si es válido el apto médico del usuario.
 *             expire:
 *               type: string
 *               description: La fecha de expiración del apto médico del usuario.
 *       example:
 *         _id: '64b8061d726e0a817bf0cb51'
 *         name: 'Usuario'
 *         surname: 'Afiliado 1'
 *         email: 'afiliado1@email.com'
 *         password: '$2b$10$JaYHsK9tGX317b3ill03r.SstOJp75mqzhXMtaDocy/v65Z3wSLNK'
 *         status: true
 *         phone: 754655225
 *         phoneEmergency: 12345678
 *         role: 'affiliate'
 *         subscriptions:
 *           - '64b8061d726e0a817bf0cb3e'
 *         birthday: '2000-10-06T00:00:00.000+00:00'
 *         fitMedical:
 *           valid: true
 *           expire: '2023-12-31T03:00:00.000+00:00'
 */

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  phone: {
    type: Number
  },
  phoneEmergency: {
    type: Number
  },
  role: {
    type: String,
    lowercase: true,
    enum: ["admin", "trainer", "affiliate"],
    required: true
  },
  birthday: {
    type: Date
  },
  age: {
    type: Number
  },
  fitMedical: {
    valid: {
      type: Boolean
    },
    expire: {
      type: Date
    },
    status: {
      type: String,
      enum: ["al día", "próximo a vencer", "vencido"],
      default: "al día"
    }
  },
  subscriptions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Subscription"
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
