import React, { useState } from 'react';
import { FilterType, TasksType } from './App';
type TodoListPropsType = {
	tasks: Array<TasksType>;
	addButtonFilter: (f: FilterType) => void;
	removeTask: (id: string) => void;
	title: string;
	addTask: (title: string) => void;
	checkBox: (id: string, bool: boolean) => void;
	filter: string;
};
function TodoList(props: TodoListPropsType) {
	const liItem = props.tasks.map((t) => {
		return (
			<li key={t.id}>
				<input
					type='checkbox'
					checked={t.isDone}
					onChange={(e) => props.checkBox(t.id, e.currentTarget.checked)}
				/>
				{t.title} <button onClick={() => props.removeTask(t.id)}>X</button>
			</li>
		);
	});
	//
	const [value, setValue] = useState('');
	const outSpace = value.trim();
	const [error, setError] = useState(false);
	//
	return (
		<div>
			<h1>{props.title}</h1>
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
							props.addTask(value);
							setValue('');
						} else {
							setError(true);
						}
					}}
				/>
				<button
					onClick={() => {
						if (outSpace) {
							props.addTask(value);
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
			<ul>{liItem}</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'btn' : ''}
					onClick={() => props.addButtonFilter('all')}
				>
					All
				</button>
				<button
					className={props.filter === 'completed' ? 'btn' : ''}
					onClick={() => props.addButtonFilter('completed')}
				>
					Completed
				</button>
				<button
					className={props.filter === 'active' ? 'btn' : ''}
					onClick={() => props.addButtonFilter('active')}
				>
					Active
				</button>
			</div>
		</div>
	);
}

export default TodoList;
