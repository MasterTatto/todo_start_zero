import React, {useState} from 'react';

const InputForm = (props) => {

    const [value, setValue] = useState('')
    const withoutSpace = value.trim()
    return (
        <div>
            <input type="text" value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
            <button onClick={() => {
                if (withoutSpace) {
                    props.addItem(withoutSpace)
                    setValue('')
                } else {
                    return
                }

            }
            }>add
            </button>
        </div>
    );
};

export default InputForm;
