const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/DbConfig');
const expenseRoutes = require('./Routes/ExpenseRoutes');

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
