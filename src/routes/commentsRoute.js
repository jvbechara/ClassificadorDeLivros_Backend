const express = require('express');
const routes = express.Router();
const commentsController = require('../controller/commentsController');
const auth = require('../services/auth');

routes.get("/", commentsController.getComments);
routes.post("/:id", auth.isUserValid, commentsController.post);
routes.delete("/:id", commentsController.destroy);

module.exports = routes;