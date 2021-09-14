import React, {useState} from 'react';

const EditSpan = (props) => {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState(props.title)
    return (

        edit ? <input autoFocus onBlur={() => {
                setEdit(false)
                props.changSpan(value)
            }} type="text" value={value}
                      onChange={(e) => setValue(e.currentTarget.value)}/> :
            <span onDoubleClick={() => setEdit(true)}>{props.title}</span>
    )
};

export default EditSpan;
