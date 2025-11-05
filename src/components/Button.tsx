import { MouseEvent } from "react";

type ButtonType = {
    className?: string;
    title: string,
    callBack: (event: MouseEvent<HTMLButtonElement>) => void;
}
export const Button = ({className, title, callBack}: ButtonType) => {
    const onclickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        callBack(event);
    }
    return (
        <button className={className!} onClick={onclickHandler}>{title}</button>
    );
};
