const { Subscription, User } = require("../models");
const {
  addUserSubscription,
  removeUserSubscription
} = require("../helpers/updateUserSubscriptions");

const getAllSubscriptions = async (req, res) => {
  try {
    // Se devuelven sólo los 4 tipos de suscripciones que brinda el gimnasio (Básico mensual y anual - Premium mensual y anual).
    const subscriptions = await Subscription.find({ status: { $exists: false } });
    res.status(200).json({ subscriptions });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const getSubscriptionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Se busca la suscripción con el id pasado por params. Si se obtiene algún resultado se lo devuelve, sino se envía un mensaje en formato JSON con un status 404, informando que la suscripción no se ha encontrado.
    const subscriptionFound = await Subscription.findById(id);
    !subscriptionFound
      ? res.status(404).json({ message: "Subscription not found." })
      : res.status(200).json(subscriptionFound);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const addUserNewSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscriptionId } = req.body;

  try {
    // Chequear si llega algo por body y, si es así, comprobar que el id de suscripción corresponda con alguna de las suscripciones que brinda el gimnasio. Si no es así, se envía un mensaje en formato JSON con un status 404, informando que la suscripción no se ha encontrado.
    const availableSubs = await Subscription.find({
      _id: subscriptionId,
      status: { $exists: false }
    });

    if (!subscriptionId || !availableSubs.length)
      return res.status(404).json({ message: "Subscription not found." });

    // Si el afiliado, en su arreglo de suscripciones, tiene alguna cuyo status sea "al día" o "próximo a vencer", no puede abonar una nueva suscripción.
    const userSubs = await User.findById(id, "subscriptions").populate("subscriptions");

    for (const sub of userSubs.subscriptions) {
      if (sub.status === "al día" || sub.status === "próximo a vencer") {
        return res
          .status(400)
          .json({ message: "The affiliate already has an active subscription." });
      }
    }

    // Si la suscripción elegida es mensual o anual, fijar la fecha de vencimiento correspondiente.
    let currentDate = new Date();
    let expireDate;

    if (availableSubs[0].duration === "mensual") {
      expireDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    } else {
      expireDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    }

    currentDate = new Date();

    // Se crea la nueva suscripción con los datos previos.
    const newSubscription = await Subscription.create({
      name: availableSubs[0].name,
      description: availableSubs[0].description,
      benefits: availableSubs[0].benefits,
      price: availableSubs[0].price,
      duration: availableSubs[0].duration,
      startDate: currentDate,
      endDate: expireDate,
      status: "al día"
    });

    // Se asocia dicha suscripción al afiliado correspondiente.
    await addUserSubscription({ id, newSubscription });

    // Se retorna un simple mensaje de éxito en formato JSON, informando que se le ha asignado la suscripción al afiliado.
    res.status(200).json({ message: "Subscription successfully added to affiliate." });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const deleteUserSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscriptionId } = req.body;

  try {
    // Chequear si llega algo por body y, si es así, comprobar que la suscripción ya se encuentre en el arreglo de suscripciones del afiliado. Si no es así, se envía un mensaje en formato JSON con un status 404, informando que la suscripción no se ha encontrado.
    const userSub = await User.findOne({ _id: id, subscriptions: { $in: subscriptionId } });
    if (!subscriptionId || !userSub)
      return res.status(404).json({ message: "Subscription not found." });

    // Se le elimina la suscripción al afiliado y se la quita de su arreglo de suscripiciones.
    await removeUserSubscription({ id, subscriptionId });

    // Se retorna un simple mensaje de éxito en formato JSON, informando que se le ha eliminado la suscripción al afiliado.
    res.status(200).json({ message: "Subscription successfully deleted from affiliate." });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  addUserNewSubscription,
  deleteUserSubscription,
  getAllSubscriptions,
  getSubscriptionById
};
