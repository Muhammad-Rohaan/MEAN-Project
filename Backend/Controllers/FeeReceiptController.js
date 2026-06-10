const FeeReceipt = require('../Models/FeeReceipt');

// Get all receipts
const getAllReceipts = async (req, res) => {
  try {
    const receipts = await FeeReceipt.find().sort({ paymentDate: -1 });
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching receipts', error: error.message });
  }
};

// Create receipt
const createReceipt = async (req, res) => {
  try {
    const receipt = new FeeReceipt({
      ...req.body,
      receiptNumber: 'REC' + Date.now()
    });
    const savedReceipt = await receipt.save();
    res.status(201).json(savedReceipt);
  } catch (error) {
    res.status(400).json({ message: 'Error creating receipt', error: error.message });
  }
};

module.exports = {
  getAllReceipts,
  createReceipt
};
