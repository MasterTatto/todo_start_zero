import React, {useState} from 'react';

type InputTypeProps = {
    addItem: (title: string) => void
}
const InputForm = (props: InputTypeProps) => {
    const [value, setValue] = useState('')
    const outSpace = value.trim()
    return (
        <div>
            <input type="text" value={value} onChange={(e) => setValue(e.currentTarget.value)} onKeyPress={(e) => {
                if (e.key === 'Enter' && outSpace) {
                    props.addItem(outSpace)
                    setValue('')
                } else {
                    return
                }
            }
            }/>
            <button onClick={() => {
                if (outSpace) {
                    props.addItem(outSpace)
                    setValue('')
                } else {
                    return
                }

            }}>Add
            </button>
        </div>
    );
};

export default InputForm;
