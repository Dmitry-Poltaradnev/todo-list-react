import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const buttonsType = {maxWidth: '39px', maxHeight: '39px', minWidth: '39px', minHeight: '39px'}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField error={!!error} value={taskTitle} onKeyUp={addTaskOnKeyUpHandler}
                       onChange={changeItemTitleHandler} id="outlined-basic" label="Enter a title" size='small'
                       variant="outlined" helperText={error}/>
            <Button size="small" variant="contained" onClick={addItemHandler}
                    style={buttonsType}>+</Button>
        </div>
    );
};

