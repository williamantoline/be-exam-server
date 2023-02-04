const express = require("express");
const router = express.Router();

const adminBorrowingController = require('../controllers/adminBorrowingController');
const userBorrowingController = require('../controllers/userBorrowingController');

router.get('/admin/borrowings', adminBorrowingController.index);
router.get('/admin/borrowings/:id', adminBorrowingController.show);
router.post('/admin/borrowings', adminBorrowingController.store);
router.patch('/admin/borrowings/:id', adminBorrowingController.return);

router.get('/user/borrowings', userBorrowingController.index);
router.get('/user/borrowings/:id', userBorrowingController.show);
router.post('/user/borrowings', userBorrowingController.store);
router.patch('/user/borrowings/:id', userBorrowingController.cancel);

module.exports = router;