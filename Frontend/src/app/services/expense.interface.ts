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
