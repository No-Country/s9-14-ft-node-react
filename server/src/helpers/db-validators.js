const { Activity, User } = require("../models");

//function that checks if the activity exists in the database
const activityExistById = async id => {
  const activityExist = await Activity.findById(id);

  if (!activityExist) throw new Error(`There is no activity with the id ${id}`);
};

const idIsNotAdmin = async id => {
  const user = await User.findById(id);

  if (!user) throw new Error("Admin not found");
  if (user.role === "admin") throw new Error("User ID is not an admin");
};

const idIsNotAffiliate = async id => {
  const user = await User.findById(id);

  if (!user) throw new Error("Affiliate not found");
  if (user.role !== "affiliate") throw new Error("User ID is not an affiliate");
};

const idIsNotTrainer = async id => {
  const user = await User.findById(id);

  if (!user) throw new Error("Trainer not found");
  if (user.role !== "trainer") throw new Error("User ID is not a trainer");
};

const idIsNotAdminOrTrainer = async id => {
  const user = await User.findById(id);

  if (!user) throw new Error("Admin or trainer not found");
  if (user.role === "admin" || user.role === "trainer")
    throw new Error("The administrator or trainer cannot be registered to the activity");
};

module.exports = {
  activityExistById,
  idIsNotAdmin,
  idIsNotAffiliate,
  idIsNotTrainer,
  idIsNotAdminOrTrainer
};
