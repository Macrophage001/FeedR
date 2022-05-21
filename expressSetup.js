require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const retrieveRoute = require('./routes/retrieveRoute');
const app = express();

app.use(fileUpload({ createParentPath: true }));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(process.env.RETRIEVE_API, retrieveRoute);

module.exports = app;