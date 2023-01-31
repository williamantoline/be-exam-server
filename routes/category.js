const express = require("express");
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/api/category', categoryController.index);
router.get('/api/category/:id', categoryController.show);
router.post('/api/category', categoryController.store);
router.put('/api/category/:id', categoryController.update);
router.delete('/api/category/:id', categoryController.destroy);

module.exports = router;