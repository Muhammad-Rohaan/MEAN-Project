# Expense Tracker - MEAN Stack Application

A fully functional Expense Tracker web application built with the MEAN (MongoDB, Express.js, Angular, Node.js) stack, following MVC architecture with additional student and institute-specific features.

## Features

### Core Features
- Complete CRUD operations for managing expenses
- Interactive dashboard with:
  - Pie chart for category breakdown
  - Line chart for monthly spending trends
  - Bar chart for category comparison
  - Recent transactions list
  - Key expense metrics
- Responsive user interface
- Input validation (client and server side)

### Student-Specific Features
- Educational expense categories (Tuition, Textbooks, Hostel Fees, etc.)
- Student budget allocation and tracking
- Scholarship/financial aid disbursement management
- Shared expense splitting for roommates

### Institute-Specific Features
- Batch-wise fee payment tracking
- Fee receipt generation
- Revenue analytics by course/batch
- Payment reminder support

## Project Structure

```
MEAN/
├── Backend/
│   ├── Config/
│   │   └── DbConfig.js              # MongoDB connection configuration
│   ├── Controllers/
│   │   ├── ExpenseController.js     # Business logic for expenses
│   │   ├── StudentBudgetController.js # Budget management
│   │   ├── ScholarshipController.js # Scholarship tracking
│   │   ├── SharedExpenseController.js # Shared expenses
│   │   └── FeeReceiptController.js  # Receipt generation
│   ├── Models/
│   │   ├── Expense.js               # Mongoose schema for Expense
│   │   ├── StudentBudget.js         # Budget schema
│   │   ├── Scholarship.js           # Scholarship schema
│   │   ├── SharedExpense.js         # Shared expense schema
│   │   └── FeeReceipt.js            # Receipt schema
│   ├── Routes/
│   │   ├── ExpenseRoutes.js         # REST API routes for expenses
│   │   ├── StudentBudgetRoutes.js   # Budget routes
│   │   ├── ScholarshipRoutes.js     # Scholarship routes
│   │   ├── SharedExpenseRoutes.js   # Shared expense routes
│   │   └── FeeReceiptRoutes.js      # Receipt routes
│   ├── app.js                       # Express server configuration
│   └── package.json                 # Backend dependencies and scripts
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/          # Angular components
│   │   │   │   ├── dashboard/       # Dashboard with charts
│   │   │   │   ├── expense-list/
│   │   │   │   └── expense-form/    # Form with student/institute fields
│   │   │   ├── services/            # Angular services for all endpoints
│   │   │   │   ├── expense.interface.ts
│   │   │   │   └── expense.service.ts
│   │   │   └── app.component.*
│   │   └── main.ts
│   ├── package.json
│   └── angular.json
└── README.md
```

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (v18 or later)
- MongoDB (running locally on port 27017)
- npm (comes with Node.js)

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally. If you need to change the MongoDB connection string, edit `Backend/Config/DbConfig.js`

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend will be running at http://localhost:5000

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   npm start
   ```

   The frontend will be available at http://localhost:4200

## API Endpoints

### Expense Endpoints
| Method | Endpoint             | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | /api/expenses        | Get all expenses                         |
| GET    | /api/expenses/:id    | Get a single expense by ID               |
| POST   | /api/expenses        | Create a new expense                     |
| PUT    | /api/expenses/:id    | Update an existing expense               |
| DELETE | /api/expenses/:id    | Delete an expense                        |

### Additional Endpoints
- `/api/budgets` - Student budget management
- `/api/scholarships` - Scholarship and disbursement tracking
- `/api/shared-expenses` - Shared expense splitting
- `/api/fee-receipts` - Fee receipt generation

## Usage

1. First start MongoDB
2. Start the backend server (port 5000)
3. Start the frontend server (port 4200)
4. Open your browser and go to http://localhost:4200
5. Use the navigation to add, view, edit, or delete expenses
6. Select user type (student/institute) in the expense form to access specialized fields

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - Mongoose ODM
  - MongoDB
  - CORS middleware

- **Frontend**:
  - Angular 17 (standalone components)
  - Angular Router
  - Angular Forms (Reactive Forms)
  - HttpClient
  - Chart.js with ng2-charts
