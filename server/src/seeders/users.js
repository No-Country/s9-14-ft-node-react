const { ObjectId } = require("mongodb");

const usersToSeed = [
  {
    name: "Test1",
    surname: "Test",
    email: "test1@email.com",
    password: "test123",
    phone: 246939613,
    role_id: new ObjectId(1)
  },
  {
    name: "Test2",
    surname: "Test",
    email: "test2@email.com",
    password: "test123",
    phone: 342361344,
    role_id: new ObjectId(2)
  },
  {
    name: "Test3",
    surname: "Test",
    email: "test3@email.com",
    password: "test123",
    phone: 754655225,
    role_id: new ObjectId(3)
  }
];

module.exports = usersToSeed;
