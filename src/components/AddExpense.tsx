import React, {useState} from 'react';
import {Autocomplete, Button, TextField} from "@mui/material";
import {Expense} from "../types";
import {DatePicker} from "@mui/x-date-pickers";
import {useDispatch} from "react-redux";
import {addExpense} from "../redux/redux";
import dayjs from "dayjs";

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substring(0,1);
}

const categories = [
    {label: 'Food'},
    {label: 'Clothes'},
    {label: 'Entertainment'},
    {label: 'Pets'},
    {label: 'Healthcare'},
    {label: 'Other'}
]

function AddExpense() {
    const [formValues, setFormValues] = useState<Partial<Expense>>({
        category: '',
        date: dayjs().format('YYYY-MM-DD'),
        name: '',
        value: 0
    })
    const dispatch = useDispatch()

    const handleSubmit = () => {
        console.log({ ...formValues })
        dispatch(addExpense({
            ...formValues, id: uid()
        } as Expense))
    }

    return (
        <div className="add-expense-container">
            <h1>Add expense</h1>
            <TextField label="Name"
                       variant="outlined"
                       sx={{mb: 2}}
                       onChange={event => setFormValues(prevState => ({ ...prevState, name: event.target.value }))}
            />
            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                       type="number"
                       label="Amount"
                       variant="outlined"
                       sx={{mb: 2}}
                       onChange={event => setFormValues(prevState => ({ ...prevState, value: Number(event.target.value) }))}
            />
            <Autocomplete
                        disablePortal
                        options={categories}
                        sx={{ width: 300, mb: 2}}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                        onChange={(event, value) =>
                            setFormValues(prevState => ({ ...prevState, category: value?.label }))}
            />
            <DatePicker defaultValue={dayjs()} disableFuture
                        onChange={(newValue) => setFormValues(prevState =>
                            ({ ...prevState, date: newValue?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD') }))} />
            <Button variant="contained" onClick={handleSubmit} sx={{mt: 2}}>Add</Button>
        </div>
    );
}
export default AddExpense;
