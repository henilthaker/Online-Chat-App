// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Routes = require('./routes.js');
const cores = require('cors');
const bodyParser = require('body-parser');
// app config
const app = express();

// middleware
app.use(cores());
app.use(express.json());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// handle routes
app.use('/api',Routes);

// connect to db and listen to reqeusts
const url = process.env.MONGO_URI;
const port = process.env.PORT || 4000;
mongoose.connect(url)
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening to port ${port}`);
        })
    })
    .catch(error => console.log(error));