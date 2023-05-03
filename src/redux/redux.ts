import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";
import {Expense, ExpenseState} from "../types";

const defaultState: ExpenseState = {
    expenses: []
}

export const addExpense = createAction<Expense>('ADD_EXPENSE');
export const updateExpense = createAction<Expense>('UPDATE_EXPENSE');
export const deleteExpense = createAction<string>('DELETE_EXPENSE');

export const reducer = createReducer(defaultState, builder => {
    builder
        .addCase(addExpense, (state, action) => {
            state.expenses.push({...action.payload})
        })
        .addCase(updateExpense, (state, action) => {
            const index = state.expenses.findIndex(({ id }) => id === action.payload.id)
            state.expenses[index] = action.payload
        })
        .addCase(deleteExpense, (state, action) => {
            state.expenses = state.expenses.filter(expense => action.payload !== expense.id)
        })
})

export const store = configureStore({reducer})
