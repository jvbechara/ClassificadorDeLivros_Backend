const express = require('express');
const routes = express.Router();
const userController = require('../controller/userController');

routes.get('/:id', userController.getUser);
routes.post('/', userController.post); //sign up
routes.post('/authenticate', userController.authenticate); // sign in

module.exports = routes;