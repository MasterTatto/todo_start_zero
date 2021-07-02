import React, { useState } from 'react';
import {Button, TextField} from "@material-ui/core";
type InputFormPropsType = {
	addItem: (title: string) => void;
};
function InputForm(props: InputFormPropsType) {
	const [value, setValue] = useState('');
	const outSpace = value.trim();
	const [error, setError] = useState(false);
	//
	return (
		<div>
			<TextField
				id="outlined-basic" label="Type..." variant="outlined"
				size={'small'}
				className={error ? 'er' : ''}
				type='text'
				value={value}
				onChange={(e) => {
					setValue(e.currentTarget.value);
					setError(false);
				}}
				onKeyPress={(e) => {
					if (e.key === 'Enter' && outSpace) {
						props.addItem(value);
						setValue('');
					} else {
						setError(true);
					}
				}}
			/>
			<Button

				size={'medium'}
				variant="outlined"
				color="primary"
				onClick={() => {
					if (outSpace) {
						props.addItem(value);
						setValue('');
					} else {
						setError(true);
					}
				}}
			>
				Add
			</Button>
			{error ? <div>Error</div> : ''}
		</div>
	);
}

export default InputForm;
