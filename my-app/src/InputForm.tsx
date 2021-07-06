import React, {useState} from 'react';
import {Button, Icon, TextField} from "@material-ui/core";
import classes from "*.module.css";

type InputTypeProps = {
    addItem: (title: string) => void
}
const InputForm = (props: InputTypeProps) => {
    const [value, setValue] = useState('')
    const outSpace = value.trim()
    return (
        <div>
            <TextField variant="outlined" size={'small'} label={'Type value'} type="text" value={value}
                       onChange={(e) => setValue(e.currentTarget.value)} onKeyPress={(e) => {
                if (e.key === 'Enter' && outSpace) {
                    props.addItem(outSpace)
                    setValue('')
                } else {
                    return
                }
            }
            }/>
            <Button
                variant="contained"
                color="primary"
                // className={classes.button}

                onClick={() => {
                    if (outSpace) {
                        props.addItem(outSpace)
                        setValue('')
                    } else {
                        return
                    }

                }}> Send
            </Button>
        </div>
    );
};

export default InputForm;
