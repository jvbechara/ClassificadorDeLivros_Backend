const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const config = require('./src/config');

// Inicia o App
const app = express();

// Permitir POST com json
app.use(express.json()); 
app.use(cors());

// Inicia o DB
mongoose.connect('mongodb://jvbechara:crvg1995@ds058508.mlab.com:58508/classificadordelivros', {useNewUrlParser: true});

require('./src/models/book');

//Carregando Rotas
const bookRoute = require('./src/routes/bookRoute');

// Rota
app.use('/', bookRoute);

app.listen(3022); // tava 3001

module.exports = app;