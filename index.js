const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const { authMid } = require("./middleware/authMid");
const querystring = require('querystring');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

require('dotenv').config();

const cors = require("cors");
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());

const db = require("./models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// main routing
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const categoryRoutes = require('./routes/category');
const notifRoutes = require('./routes/notif')
const borrowingRoutes = require('./routes/borrowing')
const userRoutes = require('./routes/user')

app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', categoryRoutes);
app.use('/api', notifRoutes);
app.use('/api', authMid, userRoutes);
app.use('/api', authMid, borrowingRoutes);

// handle 404
app.use((req, res, next) => {
    res.status(404);
    res.send({
        message: 'Not Found'
    });
});

// handle error
app.use((err, req, res, next) => {
    if (err) console.log(err);
    res.status(500);
    res.send({
        message: 'Internal Server Error'
    });
});

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3013;
app.listen(port);
console.log(`Running on http://${host}:${port}`);