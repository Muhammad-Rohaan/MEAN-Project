const express = require('express');
const router = express.Router();
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
} = require('../Controllers/ExpenseController');

// Get all expenses
router.get('/', getAllExpenses);

// Get single expense
router.get('/:id', getExpenseById);

// Create expense
router.post('/', createExpense);

// Update expense
router.put('/:id', updateExpense);

// Delete expense
router.delete('/:id', deleteExpense);

module.exports = router;
