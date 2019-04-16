const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./src/config');
require('dotenv').config();

// Inicia o App
const app = express();

// Permitir POST com json
app.use(express.json()); 
app.use(cors());

// Inicia o DB
mongoose.connect(process.env.connection_classificadordelivros, {useNewUrlParser: true});

require('./src/models/book');
require('./src/models/user');
require('./src/models/comments');

//Carregando Rotas
const bookRoute = require('./src/routes/bookRoute');
const commentsRoute = require('./src/routes/commentsRoute');
const userRoute = require('./src/routes/userRoutes');

// Rota
app.use('/', bookRoute);
app.use('/comments', commentsRoute);
app.use('/user', userRoute);


app.listen(3022); // tava 3001

module.exports = app;