const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const auth = require('../auth');

const register = require('../v1/routes/register');
const login = require('../v1/routes/login');
const index = require('../v1/routes/index');

dotenv.config({ path: `./config/config.env` });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

async function dbConnect() {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log('Now connected to MongoDB!');

      app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
        );
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, DELETE, PATCH, OPTIONS'
        );
        next();
      });

      app.use('/api/v1/register', register);
      app.use('/api/v1/login', login);
      app.use('/', index);

      app.listen(
        PORT,
        console.log(`Server connected to database on port ${PORT}`)
      );
    })
    .catch((error) => {
      console.log('Unable to connect to MongoDB Atlas.');
      console.log(error);
    });
}

module.exports = dbConnect;
