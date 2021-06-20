import React, { useState } from 'react';
type EditSpanPropsType = {
	title: string;
	editSpan: (title: string) => void;
};
function EditSpan(props: EditSpanPropsType) {
	const [activeEdit, setactiveEdit] = useState(false);
	//
	let [value, setValue] = useState(props.title);
	//
	function onEdit() {
		setactiveEdit(true);
	}
	function offEdit() {
		setactiveEdit(false);
		props.editSpan(value);
	}
	//
	return activeEdit ? (
		<input
			type='text'
			value={value}
			autoFocus
			onBlur={offEdit}
			onChange={(e) => setValue(e.currentTarget.value)}
		/>
	) : (
		<span onDoubleClick={onEdit}>{props.title}</span>
	);
}

export default EditSpan;
