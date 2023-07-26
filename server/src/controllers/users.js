const removeUserOfActivities = require("../helpers/remove-user-activity");
const updateUserStatus = require("../helpers/updateUserStatus");
const { User, Subscription } = require("../models");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const { role, status } = req.query;
  let query = {};

  role && (query = { ...query, role });
  status && (query = { ...query, status });

  try {
    const users = await User.find(query).populate("subscriptions", "duration");

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByToken = async (req, res) => {
  res.status(200).json(req.user);
};

const registerUser = async (req, res) => {
  try {
    let { password, email, birthday, role, subscriptionId, fitMedical, ...data } = req.body;

    // Se valida si ya hay un usuario registrado con el mismo email.
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already exists" });

    // Se validad si la suscripción, en caso que sea pasada por body, exista entre las suscripciones brindadas por el gimnasio.
    let existingSubscription;
    if (subscriptionId) {
      existingSubscription = await Subscription.findById(subscriptionId);
      if (!existingSubscription) return res.status(404).json({ message: "Subscription not found" });
    }

    // Se hashea (encripta) la constraseña del usuario.
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Si el usuario que se está registrando es un afiliado, se le agrega la suscripción elegida y el apto médico presentado.
    let subscriptionToAdd;
    let fitMedicalToAdd;
    if (role === "affiliate") {
      let currentDate = new Date();
      let expireDate;

      // Si la suscripción elegida es mensual o anual, va a tener su correspondiente fecha de expiración.
      if (existingSubscription.duration === "mensual") {
        expireDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
      } else {
        expireDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
      }

      currentDate = new Date();

      // Se crea la suscripción y se la asocia al usuario afiliado que se está registrando.
      const newSubscription = await Subscription.create({
        name: existingSubscription.name,
        description: existingSubscription.description,
        benefits: existingSubscription.benefits,
        price: existingSubscription.price,
        duration: existingSubscription.duration,
        startDate: currentDate,
        endDate: expireDate,
        status: "al día"
      });

      subscriptionToAdd = newSubscription;
      fitMedicalToAdd = fitMedical;
    }

    // En caso que la edad no sea pasada por body, con la fecha de nacimiento se estima la edad del usuario y se guarda en la base de datos.
    let age;
    if (birthday) {
      const dateBirthday = new Date(birthday);
      const today = new Date();
      age = today.getFullYear() - dateBirthday.getFullYear();
      const diffMonths = today.getMonth() - dateBirthday.getMonth();

      if (diffMonths < 0 || (diffMonths === 0 && today.getDate() < dateBirthday.getDate())) {
        age--;
      }
    }

    // Datos finales con los que se va a registrar al nuevo usuario de la aplicación.
    data = {
      ...data,
      email,
      password: passwordHash,
      role,
      subscriptions: subscriptionToAdd ? [subscriptionToAdd] : undefined,
      fitMedical: fitMedicalToAdd,
      birthday,
      age
    };

    // Se crea finalmente al usuario que se está registrando y se lo guarda en la base de datos.
    const newUser = await User.create(data);

    // Se devuelve un objeto con los datos que corresponden al nuevo usuario.
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...updates } = req.body;
    delete updates._id;
    delete updates.__v;
    delete updates.status;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, { $set: updates }, { new: true });

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    removeUserOfActivities(id);
    // Remove user
    //await User.deleteOne({ _id: id });
    await user.updateOne({ status: false });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const setUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await updateUserStatus({ id, status });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const updateUserByToken = async (req, res) => {
  const { id } = req.user;
  const { password, ...updates } = req.body;
  delete updates._id;
  delete updates.__v;
  delete updates.subscriptions;
  delete updates.role;
  delete updates.status;
  delete updates.fitMedical;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserByToken,
  registerUser,
  updateUserById,
  deleteUser,
  setUserStatus,
  updateUserByToken
};
