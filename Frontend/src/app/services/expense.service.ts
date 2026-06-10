import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, StudentBudget, SharedExpense, FeeReceipt } from './expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Expense endpoints
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses`);
  }

  getExpenseById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/expenses/${id}`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/expenses`, expense);
  }

  updateExpense(id: string, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/expenses/${id}`, expense);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/expenses/${id}`);
  }

  // Student Budget endpoints
  getBudgets(): Observable<StudentBudget[]> {
    return this.http.get<StudentBudget[]>(`${this.apiUrl}/budgets`);
  }

  createBudget(budget: StudentBudget): Observable<StudentBudget> {
    return this.http.post<StudentBudget>(`${this.apiUrl}/budgets`, budget);
  }

  updateBudget(id: string, budget: StudentBudget): Observable<StudentBudget> {
    return this.http.put<StudentBudget>(`${this.apiUrl}/budgets/${id}`, budget);
  }

  deleteBudget(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/budgets/${id}`);
  }

  // Shared Expense endpoints
  getSharedExpenses(): Observable<SharedExpense[]> {
    return this.http.get<SharedExpense[]>(`${this.apiUrl}/shared-expenses`);
  }

  createSharedExpense(expense: SharedExpense): Observable<SharedExpense> {
    return this.http.post<SharedExpense>(`${this.apiUrl}/shared-expenses`, expense);
  }

  markSettled(expenseId: string, participantId: string): Observable<SharedExpense> {
    return this.http.put<SharedExpense>(`${this.apiUrl}/shared-expenses/${expenseId}/participants/${participantId}/settle`, {});
  }

  // Fee Receipt endpoints
  getReceipts(): Observable<FeeReceipt[]> {
    return this.http.get<FeeReceipt[]>(`${this.apiUrl}/fee-receipts`);
  }

  createReceipt(receipt: FeeReceipt): Observable<FeeReceipt> {
    return this.http.post<FeeReceipt>(`${this.apiUrl}/fee-receipts`, receipt);
  }
}
