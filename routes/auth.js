const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController')
const { validateUser } = require('../middleware/userValidator')

router.post('/jwtToken', authController.cookieJwtAuth)
router.post('/register', validateUser, authController.register);
router.post('/login', authController.login);

module.exports = router;