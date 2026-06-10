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
  monthlyData: { month: string; amount: number }[] = [];

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
    
    const monthlyMap: { [key: string]: number } = this.expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[monthYear] = (acc[monthYear] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });
    
    this.monthlyData = Object.keys(monthlyMap).sort().map(key => ({
      month: key,
      amount: monthlyMap[key]
    }));
  }

  getPercentage(category: string): number {
    if (this.totalExpenses === 0) return 0;
    return (this.categoryBreakdown[category] / this.totalExpenses) * 100;
  }

  getBarHeight(amount: number): string {
    if (this.monthlyData.length === 0) return '0%';
    const max = Math.max(...this.monthlyData.map(d => d.amount));
    return max === 0 ? '0%' : `${(amount / max) * 100}%`;
  }
}
