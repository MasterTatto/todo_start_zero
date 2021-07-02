import React, { useState } from 'react';
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
			<input
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
			<button
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
			</button>
			{error ? <div>Error</div> : ''}
		</div>
	);
}

export default InputForm;
