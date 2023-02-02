const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { authMid } = require("./middleware/authMid");

app.use(cookieParser());

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
app.use('/auth', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', categoryRoutes);
app.use('/api', notifRoutes);

// handle 404
app.use((req, res, next) => {
    res.status(404);
    res.send({
        message: 'Not Found'
    });
});

// handle error
app.use((err, req, res, next) => {
    res.status(500);
    res.send({
        message: 'Internal Server Error'
    });
});

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3013;
app.listen(port);
console.log(`Running on http://${host}:${port}`);