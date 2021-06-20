import React, { useState } from 'react';

//
type PropsTypeinputForm = {
	addItem: (title: string) => void;
};
//
function InputForm(props: PropsTypeinputForm) {
	let [error, setError] = useState(false);
	//
	let [value, setValue] = useState('');
	//
	const noSpace = value.trim();
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
					if (e.key === 'Enter' && noSpace) {
						props.addItem(noSpace);
						setValue('');
					} else {
						setError(true);
					}
				}}
			/>
			<button
				onClick={() => {
					if (noSpace) {
						props.addItem(noSpace);
						setValue('');
					} else {
						setError(true);
					}
				}}
			>
				Add
			</button>
			{error ? <div className='er'>Type value</div> : ''}
		</div>
	);
}

export default InputForm;
