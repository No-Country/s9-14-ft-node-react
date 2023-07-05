const express = require('express');
const usersController = require('../controllers/users.js');

const routerUsers = express.Router();

routerUsers.get('/', usersController.getUsers);
routerUsers.get('/:id', usersController.getUser);
routerUsers.post('/', usersController.registerUser);
routerUsers.put('/:id', usersController.updateUser);
routerUsers.delete('/:id', usersController.deleteUser);


module.exports = routerUsers;