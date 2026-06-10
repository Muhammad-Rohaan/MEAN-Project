const SharedExpense = require('../Models/SharedExpense');

// Get all shared expenses
const getAllSharedExpenses = async (req, res) => {
  try {
    const sharedExpenses = await SharedExpense.find().sort({ createdAt: -1 });
    res.status(200).json(sharedExpenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shared expenses', error: error.message });
  }
};

// Create shared expense
const createSharedExpense = async (req, res) => {
  try {
    const sharedExpense = new SharedExpense(req.body);
    const savedSharedExpense = await sharedExpense.save();
    res.status(201).json(savedSharedExpense);
  } catch (error) {
    res.status(400).json({ message: 'Error creating shared expense', error: error.message });
  }
};

// Mark participant as settled
const markSettled = async (req, res) => {
  try {
    const sharedExpense = await SharedExpense.findById(req.params.id);
    if (!sharedExpense) {
      return res.status(404).json({ message: 'Shared expense not found' });
    }
    const participant = sharedExpense.participants.id(req.params.participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    participant.settled = true;
    await sharedExpense.save();
    res.status(200).json(sharedExpense);
  } catch (error) {
    res.status(400).json({ message: 'Error updating settlement', error: error.message });
  }
};

module.exports = {
  getAllSharedExpenses,
  createSharedExpense,
  markSettled
};
