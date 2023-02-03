const express = require("express");
const router = express.Router();

const borrowingController = require('../controllers/borrowingController');

router.get('/borrowings', borrowingController.index);
router.get('/borrowings/:id', borrowingController.show);
router.post('/borrowings', borrowingController.store);
router.delete('/borrowings/:id', borrowingController.destroy);

module.exports = router;