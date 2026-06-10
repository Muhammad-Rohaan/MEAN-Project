export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  date: Date | string;
  description?: string;
  userType?: 'student' | 'institute' | 'general';
  batch?: string;
  course?: string;
  isFeePayment?: boolean;
  reminderDate?: Date | string;
  reminderNote?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudentBudget {
  _id?: string;
  category: string;
  allocated: number;
  spent: number;
  academicYear: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SharedExpense {
  _id?: string;
  title: string;
  totalAmount: number;
  participants: Array<{_id?: string, name: string, share: number, settled: boolean}>;
  dueDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FeeReceipt {
  _id?: string;
  receiptNumber: string;
  studentName: string;
  course?: string;
  batch?: string;
  amount: number;
  taxAmount?: number;
  paymentDate?: Date;
  paymentMode?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
