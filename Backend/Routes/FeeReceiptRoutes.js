const express = require('express');
const router = express.Router();
const { getAllReceipts, createReceipt } = require('../Controllers/FeeReceiptController');

router.get('/', getAllReceipts);
router.post('/', createReceipt);

module.exports = router;
