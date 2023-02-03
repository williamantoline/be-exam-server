const express = require("express");
const router = express.Router();

const notifController = require('../controllers/notifController');

router.get('/notifications', notifController.index);
router.patch('/notifications', notifController.read);
router.delete('/notifications', notifController.clear);

module.exports = router;