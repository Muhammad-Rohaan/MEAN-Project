const express = require('express');
const router = express.Router();
const { getAllSharedExpenses, createSharedExpense, markSettled } = require('../Controllers/SharedExpenseController');

router.get('/', getAllSharedExpenses);
router.post('/', createSharedExpense);
router.put('/:id/participants/:participantId/settle', markSettled);

module.exports = router;
