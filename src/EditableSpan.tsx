import React, {ChangeEvent, useState} from 'react';

import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    changeTitleHandler: (newTitle: string) => void
    oldTitle: string
}

export const EditableSpan = ({oldTitle, changeTitleHandler}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const [newTitle, setNewTitle] = useState<string>(oldTitle)

    const switchStateMode = () => {
        setEditMode(!editMode)
        if ((newTitle.trim().length !== 0) && editMode) {
            changeTitleHandler(newTitle.trim())
        }
    }

    const changeOldTask = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField onChange={changeOldTask} onBlur={switchStateMode} value={newTitle} id="outlined-basic"
                         size='small' label="Change title" variant="outlined"/>
            : <span onDoubleClick={switchStateMode}>{oldTitle}</span>
    );
}


