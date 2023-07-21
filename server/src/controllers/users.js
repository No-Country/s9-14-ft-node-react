const updateUserStatus = require("../helpers/updateUserStatus");
const { User } = require("../models");
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
    let { password, email, birthday, ...data } = req.body;
    delete data._id;
    delete data.__v;
    delete data.status;
    delete data.age;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const dateBirthday = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - dateBirthday.getFullYear();
    const diffMonths = today.getMonth() - dateBirthday.getMonth();

    if (diffMonths < 0 || (diffMonths === 0 && today.getDate() < dateBirthday.getDate())) {
      age--;
    }

    data = {
      ...data,
      email,
      password: passwordHash,
      age
    };
    const newUser = await User.create(data);
    await newUser.save();

    return res.status(201).json({ newUser });
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

    const userUpdated = await User.findByIdAndUpdate(id, { $set: updates }, { new: true });

    res.status(200).json({ message: "User updated successfully", userUpdated });
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

    // Remove user
    await User.deleteOne({ _id: id });

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
