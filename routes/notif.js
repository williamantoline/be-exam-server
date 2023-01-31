const express = require("express");
const router = express.Router();

const notifController = require('../controllers/notifController');

router.get('/api/notifications', notifController.index);
router.patch('/api/notifications', notifController.read);
router.delete('/api/notifications', notifController.clear);

module.exports = router;