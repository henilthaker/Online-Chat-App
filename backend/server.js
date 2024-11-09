// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Routes = require('./routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

// app config
const app = express();

const pusher = new Pusher({
    appId: "1625017",
    key: "8de87b75a39cda78cd32",
    secret: process.env.PUSHER_SECRET,
    cluster: "ap2",
    useTLS: true
});

// middleware
app.use(cors({
    origin: 'https://online-chat-app-gamma.vercel.app'
}));
app.use(express.json());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// handle routes
app.use('/api', Routes);

// connect to db and listen to reqeusts
const url = process.env.MONGO_URI;
const port = process.env.PORT || 4000;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening to port ${port}`);
        })
    })
    .catch(error => console.log(error));

const db = mongoose.connection;
db.once('open', () => {
    const msg_collection = db.collection('messages');
    const change_stream = msg_collection.watch();
    change_stream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const msg_details = change.fullDocument;
            pusher.trigger('messages', 'inserted', msg_details);
        }else{
            console.log('Error triggering pusher');
        }
    })
})