const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/DbConfig');
const expenseRoutes = require('./Routes/ExpenseRoutes');
const budgetRoutes = require('./Routes/StudentBudgetRoutes');
const sharedExpenseRoutes = require('./Routes/SharedExpenseRoutes');
const feeReceiptRoutes = require('./Routes/FeeReceiptRoutes');

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/shared-expenses', sharedExpenseRoutes);
app.use('/api/fee-receipts', feeReceiptRoutes);

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running with student & institute features!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
