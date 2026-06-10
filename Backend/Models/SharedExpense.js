const mongoose = require('mongoose');

const sharedExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: 0
  },
  participants: [{
    name: String,
    share: Number,
    settled: {
      type: Boolean,
      default: false
    }
  }],
  dueDate: Date,
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('SharedExpense', sharedExpenseSchema);
