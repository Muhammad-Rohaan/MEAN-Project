import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/add', component: ExpenseFormComponent },
  { path: 'expenses/edit/:id', component: ExpenseFormComponent }
];
