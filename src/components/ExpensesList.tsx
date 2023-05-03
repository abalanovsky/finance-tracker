import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Expense, ExpenseState} from "../types";
import {DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import {deleteExpense, updateExpense} from "../redux/redux";
import DeleteIcon from '@mui/icons-material/Delete';

function ExpensesList() {
    const expenses = useSelector((state: ExpenseState) => state.expenses)
    const dispatch = useDispatch()

    const gridColumns = useMemo(() => [
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'value', headerName: 'Amount', width: 150, editable: true },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'date', headerName: 'Date', width: 100},
        {
            field: 'actions',
            type: 'actions',
            width: 90,
            getActions: ({ id }: Expense) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => dispatch(deleteExpense(id))}
                />
            ],
        },
    ],[dispatch])

    const handleEdit = (newRow: Expense) => {
        const newExpense = {...newRow, value: Number(newRow.value) || 0}
        dispatch(updateExpense(newExpense))
        return newExpense
    }

    return (
        <div style={{height: 500}}>
            <DataGrid
                columns={gridColumns}
                rows={expenses}
                hideFooter
                disableRowSelectionOnClick
                processRowUpdate={handleEdit}
                pageSizeOptions={[25, 50, 100]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
            />
        </div>
    );
}
export default ExpensesList;
