const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const dbConnect = require('./db/dbConnect');

const app = express();
dotenv.config({ path: './config/config.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: `./config/config.env` });
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

dbConnect();
