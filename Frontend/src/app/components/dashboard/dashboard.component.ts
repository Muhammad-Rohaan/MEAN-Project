import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../services/expense.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  categoryBreakdown: { [key: string]: number } = {};
  recentExpenses: Expense[] = [];
  categories: string[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        this.calculateMetrics();
      },
      error: (err) => console.error('Error fetching expenses', err)
    });
  }

  calculateMetrics(): void {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    this.categoryBreakdown = this.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });

    this.categories = Object.keys(this.categoryBreakdown);
    this.recentExpenses = this.expenses.slice(0, 5);
  }
}
