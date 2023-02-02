const express = require("express");
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/category', categoryController.index);
router.get('/category/:id', categoryController.show);
router.post('/category', categoryController.store);
router.put('/category/:id', categoryController.update);
router.delete('/category/:id', categoryController.destroy);

module.exports = router;