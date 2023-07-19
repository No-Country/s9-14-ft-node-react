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
 *           description: Las suscripciones del usuario.
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
 *         _id: '64b1c7063f6378c5f32c3b04'
 *         name: 'Usuario'
 *         surname: 'Admin'
 *         email: 'admin@email.com'
 *         password: '$2b$10$uhkH6jROHyj6qgbSZcRfNOPZHNSvsQXruB4mW3EGb4q5uAJ8dRoc2'
 *         status: true
 *         phone: 246939617
 *         phoneEmergency: 12345678
 *         role: 'admin'
 *         subscriptions: []
 *         birthday: '2000-10-06T00:00:00.000+00:00'
 *         fitMedical: {}
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
  subscriptions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Subscription"
  },
  birthday: {
    type: Date
  },
  fitMedical: {
    valid: {
      type: Boolean
    },
    expire: {
      type: Date
    }
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
