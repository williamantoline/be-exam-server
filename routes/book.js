const express = require("express");
const router = express.Router();

const bookController = require('../controllers/bookController');
const { validateBook } = require('../middleware/bookValidator');

router.get('/api/books', bookController.index);
router.get('/api/books/:id', bookController.show);
router.post('/api/books/category', bookController.addCategory);
router.post('/api/books', validateBook, bookController.store);

module.exports = router;