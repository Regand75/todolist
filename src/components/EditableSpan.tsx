import {ChangeEvent, useState} from "react";
import {Input} from "./Input.tsx";

type EditableSpanPropsType = {
    value: string;
    onChange: (editTitle: string) => void;
}

export const EditableSpan = ({value, onChange}: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState(value);

    const turnOnEditMode = () => {
        setIsEditMode(true);
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
                <Input value={editTitle} onChange={changeTitle} onBlur={turnOffEditMode} autoFocus/>
            ) : (
                <span onDoubleClick={turnOnEditMode}> {value}</span>
            )}
        </>
    )
};
