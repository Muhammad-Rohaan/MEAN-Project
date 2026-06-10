const express = require('express');
const router = express.Router();
const { getAllBudgets, createBudget, updateBudget, deleteBudget } = require('../Controllers/StudentBudgetController');

router.get('/', getAllBudgets);
router.post('/', createBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

module.exports = router;
