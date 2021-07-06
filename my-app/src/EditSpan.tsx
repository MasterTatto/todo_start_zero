import React, {useState} from 'react';
import {TextField} from "@material-ui/core";

type EditSpanProps = {
    title: string
    editSpanTask: (title: string) => void
}
const EditSpan = (props: EditSpanProps) => {
    const [edit, setEdit] = useState(true);
    const [value, setValue] = useState(props.title)
    return edit ? <span onDoubleClick={() => setEdit(false)}>{props.title}</span> :
        <TextField label={'Edit values'} onChange={(e) => setValue(e.currentTarget.value)} autoFocus onBlur={() => {
            setEdit(true)
            props.editSpanTask(value)
        }} value={value}/>
};

export default EditSpan;
