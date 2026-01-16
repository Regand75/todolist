import {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string;
    onChange: (newTitle: string) => void;
    disabled?: boolean;
}

export const EditableSpan = ({title, onChange, disabled}: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState(title);

    const turnOnEditMode = () => {
        if (disabled) return;
        setIsEditMode(true);
        // setEditTitle(title);
    }

    const turnOffEditMode = () => {
        setIsEditMode(false);
        onChange(editTitle);
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.currentTarget.value);
    }

    return (
        <>
            {isEditMode ? (
                <TextField variant="outlined"
                           value={editTitle}
                           size='small'
                           onChange={changeTitle}
                           onBlur={turnOffEditMode}
                           autoFocus/>
            ) : (
                <span onDoubleClick={turnOnEditMode}> {title}</span>
            )}
        </>
    )
};
