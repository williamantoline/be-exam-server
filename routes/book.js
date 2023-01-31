const express = require("express");
const router = express.Router();

const bookController = require('../controllers/bookController');
const { validateBook } = require('../middleware/bookValidator');

router.get('/api/books', bookController.index);
router.get('/api/books/:id', bookController.show);
router.post('/api/books', validateBook, bookController.store);
router.put('/api/books/:id', bookController.update);
router.delete('/api/books/:id', bookController.destroy);

module.exports = router;