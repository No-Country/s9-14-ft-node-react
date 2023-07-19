const { Activity, User } = require("../models");
const { mongoose } = require("mongoose");

const searchAffiliatesOfTrainer = async (req, res) => {
  const { id } = req.user;
  const { keyword } = req.query;

  let query = { "affiliate.status": true };

  try {
    keyword &&
      (query = {
        ...query,
        $or: [
          { "affiliate.name": { $regex: keyword, $options: "i" } },
          { "affiliate.surname": { $regex: keyword, $options: "i" } }
        ]
      });

    const result = await Activity.aggregate([
      {
        $match: { trainer: new mongoose.Types.ObjectId(id) }
      },
      {
        $unwind: "$affiliates"
      }, // creates a document for each affiliate in the affiliates field and distributes them among them
      {
        $group: {
          _id: "$affiliates.affiliate" //group by eliminating repetitions
        }
      },
      {
        $lookup: {
          from: "users", //colecction in db
          localField: "_id",
          foreignField: "_id",
          as: "affiliate" //alias
        }
      },
      {
        $match: query
      },
      {
        $project: {
          _id: 0, // Exclude _id
          affiliate: 1 // Include 'affiliate'
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const searchUsers = async (req, res) => {
  const { keyword } = req.query;

  let query = {};

  try {
    keyword &&
      (query = {
        ...query,
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { surname: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
          { role: { $regex: keyword, $options: "i" } }
        ]
      });

    const result = await User.find(query).populate("subscriptions", "name -_id");
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { searchAffiliatesOfTrainer, searchUsers };
