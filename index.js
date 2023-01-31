const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require('multer')
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

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime()+ '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

// main routing
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
app.use(authRoutes);
app.use(bookRoutes);

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