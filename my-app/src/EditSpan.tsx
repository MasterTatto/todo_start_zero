import React, {useState} from 'react';

type EditSpanProps = {
    title: string
    editSpanTask:(title: string) => void
}
const EditSpan = (props: EditSpanProps) => {
    const [edit, setEdit] = useState(true);
    const [value, setValue] = useState(props.title)
    return edit ? <span onDoubleClick={() => setEdit(false)}>{props.title}</span> :
        <input onChange={(e) => setValue(e.currentTarget.value)} autoFocus onBlur={() => {
            setEdit(true)
            props.editSpanTask(value)
        }} value={value}/>
};

export default EditSpan;
