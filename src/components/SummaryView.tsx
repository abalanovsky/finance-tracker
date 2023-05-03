import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {ExpenseState} from "../types";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween)

function SummaryView() {
    const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'))
    const expenses = useSelector((state: ExpenseState) => state.expenses)

    const filteredExpenses = expenses.filter(expense =>
        dayjs(expense.date).isBetween(startDate, endDate, 'day', '[]'))

    const daysCount = dayjs(endDate).diff(startDate, 'day') + 1
    const weeksCount = dayjs(endDate).diff(startDate, 'week') + 1
    const monthsCount = dayjs(endDate).diff(startDate,'month') + 1
    const totalSum = filteredExpenses.reduce((acc,current) => acc + current.value, 0)

    const countCategoryPercent = (category: string) => {
        const categoryCount = filteredExpenses.filter((expense) => expense.category === category).length
        return Math.round((categoryCount / filteredExpenses.length) * 100) || null
    }

    return (
        <div>
            <div>
                <h3>Select start and end date</h3>
                <DatePicker defaultValue={dayjs()} disableFuture onChange={(newValue) =>
                    setStartDate(newValue?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD')) }/>
                <DatePicker defaultValue={dayjs()} minDate={dayjs(startDate)} disableFuture onChange={(newValue) =>
                    setEndDate(newValue?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD')) }/>
            </div>
            <div className="summary-view">
                <div>Total amount of expenses: {(totalSum).toFixed(2)}</div>
                <div>Average on day: {(totalSum / daysCount).toFixed(2)}</div>
                <div>Average on week: {(totalSum / weeksCount).toFixed(2)}</div>
                <div>Average on month: {(totalSum / monthsCount).toFixed(2)}</div>
            </div>
            <h3>Category %</h3>
            {countCategoryPercent('Food') && <div>Food: {countCategoryPercent('Food')}%</div>}
            {countCategoryPercent('Clothes') && <div>Clothes: {countCategoryPercent('Clothes')}%</div>}
            {countCategoryPercent('Pets') && <div>Pets: {countCategoryPercent('Pets')}%</div>}
            {countCategoryPercent('Entertainment') && <div>Entertainment: {countCategoryPercent('Entertainment')}%</div>}
            {countCategoryPercent('Healthcare') && <div>Healthcare: {countCategoryPercent('Healthcare')}%</div>}
            {countCategoryPercent('Other') && <div>Other: {countCategoryPercent('Other')}%</div>}
        </div>
    );
}
export default SummaryView;
