const express = require('express');
const routes = express.Router();
const bookController = require('../controller/booksController');

routes.get("/book", bookController.getBooks);
routes.post("/book-create", bookController.post);
routes.delete("/book/:id", bookController.destroy);

module.exports = routes;