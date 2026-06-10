const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be positive']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: [
      'Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other',
      // Educational categories
      'Tuition', 'Textbooks', 'Course Materials', 'Hostel Fees',
      'Coaching Fees', 'Exam Fees', 'Stationery'
    ]
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  // User type for student/institute
  userType: {
    type: String,
    enum: ['student', 'institute', 'general'],
    default: 'general'
  },
  // For institute-specific fields
  batch: {
    type: String,
    trim: true
  },
  course: {
    type: String,
    trim: true
  },
  isFeePayment: {
    type: Boolean,
    default: false
  },
  // For calendar/reminder
  reminderDate: {
    type: Date
  },
  reminderNote: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
