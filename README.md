# Expense Tracker - MEAN Stack Application

A fully functional Expense Tracker web application built with the MEAN (MongoDB, Express.js, Angular, Node.js) stack, following MVC architecture.

## Features

- Complete CRUD operations for managing expenses
- Dashboard with expense metrics and recent transactions
- Category-based expense breakdown
- Responsive user interface
- Input validation (client and server side)

## Project Structure

```
MEAN/
├── Backend/
│   ├── Config/
│   │   └── DbConfig.js      # MongoDB connection configuration
│   ├── Controllers/
│   │   └── ExpenseController.js # Business logic for expenses
│   ├── Models/
│   │   └── Expense.js       # Mongoose schema and model for Expense
│   ├── Routes/
│   │   └── ExpenseRoutes.js # REST API routes
│   ├── app.js               # Express server configuration
│   └── package.json         # Backend dependencies and scripts
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Angular components
│   │   │   │   ├── dashboard/
│   │   │   │   ├── expense-list/
│   │   │   │   └── expense-form/
│   │   │   ├── services/    # Angular services
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
| GET    | /api/expenses        | Get all expenses (supports category, startDate, endDate query params) |
| GET    | /api/expenses/:id    | Get a single expense by ID               |
| POST   | /api/expenses        | Create a new expense                     |
| PUT    | /api/expenses/:id    | Update an existing expense               |
| DELETE | /api/expenses/:id    | Delete an expense                        |

### Expense Object Structure

```json
{
  "_id": "ObjectId",
  "title": "string (required)",
  "amount": "number (required, positive)",
  "category": "string (required)",
  "date": "Date (required)",
  "description": "string (optional)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Usage

1. First start MongoDB
2. Start the backend server (port 5000)
3. Start the frontend server (port 4200)
4. Open your browser and go to http://localhost:4200
5. Use the navigation to add, view, edit, or delete expenses

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
