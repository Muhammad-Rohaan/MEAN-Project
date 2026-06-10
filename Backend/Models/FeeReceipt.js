const mongoose = require('mongoose');

const feeReceiptSchema = new mongoose.Schema({
  receiptNumber: {
    type: String,
    required: [true, 'Receipt number is required'],
    unique: true
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required']
  },
  course: String,
  batch: String,
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  taxAmount: Number,
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paymentMode: String,
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('FeeReceipt', feeReceiptSchema);
