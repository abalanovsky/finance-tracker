import React from 'react';
import './App.css';
import {store} from './redux/redux';
import {Provider} from 'react-redux'
import AddExpense from "./components/AddExpense";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import ExpensesList from "./components/ExpensesList";
import SummaryView from "./components/SummaryView";

function App() {
  return (
    <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="expenses-container">
                <ExpensesList/>
                <AddExpense />
            </div>

            <div className="tools-container">
                <SummaryView/>
            </div>

        </LocalizationProvider>
    </Provider>
  );
}

export default App;
