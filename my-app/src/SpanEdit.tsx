import React, {useState} from 'react';
import {TextField} from "@material-ui/core";

type SpanEditPropsType = {
    title: string;
    editSpan: (title: string) => void;
};
//

//
function SpanEdit(props: SpanEditPropsType) {
    const [edit, setEdit] = useState(true);
    //
    const [value, setValue] = useState(props.title);
    //
    return edit ? (
        <span onDoubleClick={() => setEdit(false)}>{props.title}</span>
    ) : (
        <TextField
            size={'small'}
            id="standard-basic" label="Type value"
            type='text'
            value={value}
            autoFocus
            onBlur={() => {
                setEdit(true);
                props.editSpan(value);
            }}
            onChange={(e) => {
                setValue(e.currentTarget.value);
            }}
        />
    );
}

export default SpanEdit;
