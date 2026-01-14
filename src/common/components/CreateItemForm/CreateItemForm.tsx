import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import {RequestStatusType} from "@/common/types";

type CreateItemFormPropsType = {
    createItem: (editedTitle: string) => void;
    entityStatus?: RequestStatusType
}

export const CreateItemForm = ({createItem, entityStatus}: CreateItemFormPropsType) => {
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
            <TextField label="Enter a title"
                       variant="outlined"
                       value={itemTitle}
                       size='small'
                       error={!!error}
                       helperText={error}
                       className={error ? 'error' : ''}
                       disabled={entityStatus === 'loading'}
                       onChange={changeItemTitleHandler}
                       onKeyDown={createItemOnEnterHandler}/>
            <IconButton onClick={createItemHandler} color='primary' disabled={entityStatus === 'loading'}>
                <AddBoxIcon />
            </IconButton>
        </div>
    );
};
