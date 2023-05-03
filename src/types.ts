export interface Expense {
    id: string;
    name: string;
    category: string;
    date: string;
    value: number;
}
export interface ExpenseState {
    expenses: Array<Expense>
}
