const express = require("express");
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/categories', categoryController.index);
router.get('/categories/:id', categoryController.show);
router.post('/categories', categoryController.store);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.destroy);

module.exports = router;