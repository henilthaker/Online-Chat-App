// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// app config
const app = express();

// middleware
app.use(express.json());

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
