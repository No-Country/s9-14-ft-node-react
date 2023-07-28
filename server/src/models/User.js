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
 *         profileImage:
 *           type: string
 *           description: La imagen de perfil del usuario.
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
 *         age:
 *           type: number
 *           description: La edad del usuario.
 *         fitMedical:
 *           type: object
 *           properties:
 *             valid:
 *               type: boolean
 *               description: Booleano que indica si es válido el apto médico del usuario.
 *             expire:
 *               type: string
 *               description: La fecha de expiración del apto médico del usuario.
 *             status:
 *               type: string
 *               enum: [al día, próximo a vencer, vencido]
 *               description: El estatus del apto médico del usuario.
 *         assignedPlan:
 *           type: boolean
 *           description: Booleano que indica si el afiliado tiene asignado un plan de entrenamiento.
 *       example:
 *         _id: '64bea32751c3d8439126ab7c'
 *         name: 'Paula'
 *         surname: 'Aguirre'
 *         email: 'afiliado1@email.com'
 *         profileImage: 'https://cdn-icons-png.flaticon.com/512/6522/6522516.png'
 *         status: true
 *         phone: 754655225
 *         phoneEmergency: 12345678
 *         role: 'affiliate'
 *         subscriptions:
 *           - '64bea32651c3d8439126ab6a'
 *         birthday: '2000-07-29T00:00:00.000+00:00'
 *         age: 22
 *         fitMedical:
 *           valid: true
 *           expire: '2023-07-29T00:00:00.000+00:00'
 *           status: 'próximo a vencer'
 *         assignedPlan: true
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
  profileImage: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
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
      enum: ["al día", "próximo a vencer", "vencido"]
    }
  },
  subscriptions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Subscription",
    default: undefined
  },
  assignedPlan: {
    type: Boolean
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
