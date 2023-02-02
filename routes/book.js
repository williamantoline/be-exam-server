const express = require("express");
const router = express.Router();

const bookController = require('../controllers/bookController');
const { validateBook } = require('../middleware/bookValidator');

router.get('/books', bookController.index);
router.get('/books/:id', bookController.show);
router.post('/books', validateBook, bookController.store);
router.put('/books/:id', bookController.update);
router.delete('/books/:id', bookController.destroy);

module.exports = router;