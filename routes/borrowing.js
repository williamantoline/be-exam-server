const express = require("express");
const router = express.Router();

const adminBorrowingController = require('../controllers/adminBorrowingController');
const userBorrowingController = require('../controllers/userBorrowingController');

router.get('/admin/borrowings', adminBorrowingController.index);
router.get('/admin/borrowings/:id', adminBorrowingController.show);
router.post('/admin/borrowings', adminBorrowingController.store);
router.patch('/admin/borrowings/:id/taken', adminBorrowingController.taken);
router.patch('/admin/borrowings/:id/return', adminBorrowingController.return);

router.get('/user/borrowings', userBorrowingController.index);
router.get('/user/borrowings/:id', userBorrowingController.show);
router.post('/user/borrowings', userBorrowingController.store);

module.exports = router;