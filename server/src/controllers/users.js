const { User } = require("../models");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    } 
};

const registerUser = async (req, res) => {
    try {
        const user = req.body;
        const email = user.email;
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User(user);
        await newUser.save();

        return res.status(201).json({ newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error." });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndUpdate(id, { $set: updates }, { new: true });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;
        console.log("dfssdsd",id)

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove user
        await User.deleteOne({ _id: id });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
}