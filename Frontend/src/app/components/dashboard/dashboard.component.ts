import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../services/expense.interface';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  categoryBreakdown: { [key: string]: number } = {};
  recentExpenses: Expense[] = [];
  categories: string[] = [];

  // Pie Chart Configuration
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      }
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };
  public pieChartType: ChartType = 'pie';

  // Line Chart Configuration
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) => 'Rs.' + value
        }
      }
    },
    plugins: {
      legend: { display: true },
    }
  };
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Monthly Spending',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 0.8)',
        fill: 'origin',
      }
    ]
  };
  public lineChartType: ChartType = 'line';

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

    // Update Pie Chart Data
    this.pieChartData = {
      labels: this.categories,
      datasets: [{
        data: this.categories.map(cat => this.categoryBreakdown[cat]),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ]
      }]
    };
    
    // Update Line Chart Data (Trends)
    const monthlyMap: { [key: string]: number } = this.expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[monthYear] = (acc[monthYear] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });
    
    const sortedMonths = Object.keys(monthlyMap).sort();
    this.lineChartData = {
      labels: sortedMonths,
      datasets: [
        {
          ...this.lineChartData.datasets[0],
          data: sortedMonths.map(month => monthlyMap[month])
        }
      ]
    };
  }
}
