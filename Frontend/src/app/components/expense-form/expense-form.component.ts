import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../services/expense.interface';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;
  isEditMode = false;
  expenseId: string | null = null;

  categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.expenseId = this.route.snapshot.paramMap.get('id');
    if (this.expenseId) {
      this.isEditMode = true;
      this.loadExpense();
    }
  }

  loadExpense(): void {
    this.expenseService.getExpenseById(this.expenseId!).subscribe({
      next: (expense) => {
        this.expenseForm.patchValue({
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          date: new Date(expense.date).toISOString().substring(0, 10),
          description: expense.description
        });
      },
      error: (err) => console.error('Error loading expense', err)
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const expense: Expense = this.expenseForm.value;
      if (this.isEditMode) {
        this.expenseService.updateExpense(this.expenseId!, expense).subscribe({
          next: () => this.router.navigate(['/expenses']),
          error: (err) => console.error('Error updating expense', err)
        });
      } else {
        this.expenseService.createExpense(expense).subscribe({
          next: () => this.router.navigate(['/expenses']),
          error: (err) => console.error('Error creating expense', err)
        });
      }
    }
  }
}
