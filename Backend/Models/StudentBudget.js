const mongoose = require('mongoose');

const studentBudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Tuition', 'Textbooks', 'Course Materials', 'Hostel Fees', 'Other Educational']
  },
  allocated: {
    type: Number,
    required: [true, 'Allocated budget is required'],
    min: 0
  },
  spent: {
    type: Number,
    default: 0,
    min: 0
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudentBudget', studentBudgetSchema);
