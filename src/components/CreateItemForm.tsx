import {Input} from "./Input.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from "react";

type CreateItemFormPropsType = {
    createItem: (editedTitle: string) => void;
}

export const CreateItemForm = ({createItem}: CreateItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim();
        if (trimmedTitle !== '') {
            createItem(trimmedTitle);
            setItemTitle('');
        } else {
            setError('Title is required');
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value);
        setError(null);
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler();
        }
    }

    return (
        <div>
            <Input className={error ? 'error' : ''}
                   value={itemTitle}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}/>
            <Button title='+' callBack={createItemHandler}/>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};
