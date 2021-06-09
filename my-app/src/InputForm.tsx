import React, { useState } from 'react';
type InputFormPropsType = {
	addItem: (title: string) => void;
};
function InputForm(props: InputFormPropsType) {
	const [value, setValue] = useState('');
	const [error, setError] = useState(false);
	const outSpace = value.trim();
	return (
		<div>
			<input
				className={error ? 'error' : ''}
				type='text'
				value={value}
				onChange={(e) => {
					setValue(e.currentTarget.value);
					setError(false);
				}}
				onKeyPress={(e) => {
					if (e.key === 'Enter' && outSpace) {
						props.addItem(outSpace);
						setValue('');
					} else {
						setError(true);
					}
				}}
			/>
			<button
				onClick={() => {
					if (outSpace) {
						props.addItem(outSpace);
						setValue('');
					} else {
						setError(true);
					}
				}}
			>
				Add
			</button>
			{error ? <div className={'er'}>Error,type value </div> : ''}
		</div>
	);
}

export default InputForm;
