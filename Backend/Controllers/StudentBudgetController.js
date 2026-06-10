const StudentBudget = require('../Models/StudentBudget');

// Get all budgets
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await StudentBudget.find().sort({ createdAt: -1 });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budgets', error: error.message });
  }
};

// Create budget
const createBudget = async (req, res) => {
  try {
    const budget = new StudentBudget(req.body);
    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(400).json({ message: 'Error creating budget', error: error.message });
  }
};

// Update budget
const updateBudget = async (req, res) => {
  try {
    const budget = await StudentBudget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ message: 'Error updating budget', error: error.message });
  }
};

// Delete budget
const deleteBudget = async (req, res) => {
  try {
    const budget = await StudentBudget.findByIdAndDelete(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget', error: error.message });
  }
};

module.exports = {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget
};
