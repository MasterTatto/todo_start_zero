import React, { useState } from 'react';
type SpanEditPropsType = {
	title: string;
	editSpan: (title: string) => void;
};
//

//
function SpanEdit(props: SpanEditPropsType) {
	const [edit, setEdit] = useState(true);
	//
	const [value, setValue] = useState(props.title);
	//
	return edit ? (
		<span onDoubleClick={() => setEdit(false)}>{props.title}</span>
	) : (
		<input
			type='text'
			value={value}
			autoFocus
			onBlur={() => {
				setEdit(true);
				props.editSpan(value);
			}}
			onChange={(e) => {
				setValue(e.currentTarget.value);
			}}
		/>
	);
}

export default SpanEdit;
