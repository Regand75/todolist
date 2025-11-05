import {ChangeEvent, KeyboardEvent} from "react";

type InputType = {
    className?: string;
    type?: string;
    checked?: boolean;
    value?: string;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({className, type, checked, value, placeholder, onChange, onKeyDown}: InputType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange!(event);
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown!(event);
    }
    return (
        <input className={className!} type={type!} checked={checked!} value={value!} placeholder={placeholder!} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
    );
};
