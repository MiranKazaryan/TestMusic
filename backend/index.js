const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/images');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const options = {
    origin: [
      'http://localhost:3010',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'origin'],
    credentials: true,
  };

mongoose.connect('mongodb://localhost:27017/musicdb');
app.use(express.json());
app.use('*', cors(options));

app.use(router);


app.listen(PORT);

