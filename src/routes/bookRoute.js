const express = require('express');
const routes = express.Router();
const bookController = require('../controller/booksController');
const auth = require('../services/auth');

routes.get("/book", bookController.getBooks);
routes.get("/book/:id", bookController.getBook);
routes.put("/book/:id", bookController.update);
routes.post("/book-create", bookController.post);
routes.delete("/book/:id", bookController.destroy);

module.exports = routes;