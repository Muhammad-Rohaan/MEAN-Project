import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../services/expense.interface';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  expenses: Expense[] = [];
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  calendarDays: (Date | null)[] = [];
  selectedDate: Date | null = null;
  private monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        this.generateCalendar();
      },
      error: (err) => console.error('Error loading expenses:', err)
    });
  }

  getMonthName(month: number): string {
    return this.monthNames[month];
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const lastDateOfMonth = lastDay.getDate();

    // Add previous month's days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      this.calendarDays.push(null);
    }

    // Add current month's days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      this.calendarDays.push(new Date(this.currentYear, this.currentMonth, i));
    }

    // Fill remaining cells
    while (this.calendarDays.length < 42) {
      this.calendarDays.push(null);
    }
  }

  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  getExpensesForDate(day: Date | null): Expense[] {
    if (!day) return [];
    const dayStr = day.toDateString();
    return this.expenses.filter(expense => {
      const expDate = new Date(expense.reminderDate || expense.date);
      return expDate.toDateString() === dayStr;
    });
  }
}