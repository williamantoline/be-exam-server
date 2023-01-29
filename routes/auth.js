const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController')
const { validateUser } = require('../middleware/userValidator')

router.post('/auth/jwtToken', authController.cookieJwtAuth)
router.post('/auth/register', validateUser, authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/revoke', authController.revoke);
router.get('/auth/me', authController.me);

module.exports = router;