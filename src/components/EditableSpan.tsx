import {ChangeEvent, useState} from "react";
import {Input} from "./Input.tsx";

type EditableSpanPropsType = {
    title: string;
    onChange: (newTitle: string) => void;
}

export const EditableSpan = ({title, onChange}: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState('');

    const turnOnEditMode = () => {
        setIsEditMode(true);
        setEditTitle(title);
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
                <span onDoubleClick={turnOnEditMode}> {title}</span>
            )}
        </>
    )
};
