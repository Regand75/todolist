import {ChangeEventHandler, FocusEventHandler, InputHTMLAttributes, KeyboardEventHandler} from "react";

type InputType = {
    className?: string;
    type?: string;
    checked?: boolean;
    value?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "checked" | "onChange" | "onKeyDown" | "onBlur">;

export const Input = ({
                          className,
                          type,
                          checked,
                          value,
                          placeholder,
                          onChange,
                          onKeyDown,
                          onBlur,
                          ...rest
                      }: InputType) => {

    return (
        <input className={className ?? ''}
               type={type ?? 'text'}
               checked={checked ?? false}
               value={value ?? ''}
               placeholder={placeholder ?? ''}
               onChange={onChange ?? (() => {})}
               onKeyDown={onKeyDown ?? (() => {})}
               onBlur={onBlur}
               {...rest}/>
    );
};
