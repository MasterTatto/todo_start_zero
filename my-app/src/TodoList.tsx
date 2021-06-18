import React, { useState } from 'react';
import { setConstantValue } from 'typescript';
import { FilterValuetype, TasksType } from './App';
type PropsTypeTodo = {
	title: string;
	tasks: Array<TasksType>;
	filterButton: (f: FilterValuetype) => void;
	removeTask: (id: string) => void;
	addTask: (title: string) => void;
	changeChecked: (id: string, bool: boolean) => void;
	filter: string;
};
const TodoList = (props: PropsTypeTodo) => {
	const liItem = props.tasks.map((t) => {
		return (
			<li key={t.id} className={t.isDone ? 'done' : ''}>
				<input
					type='checkbox'
					checked={t.isDone}
					onChange={(e) => props.changeChecked(t.id, e.currentTarget.checked)}
				/>
				{t.title}
				<button onClick={() => props.removeTask(t.id)}>X</button>
			</li>
		);
	});
	//
	let [error, setError] = useState(false);
	//
	let [value, setValue] = useState('');
	//
	const noSpace = value.trim();
	//
	return (
		<div className={'tl'}>
			<h2>{props.title}</h2>
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
							props.addTask(noSpace);
							setValue('');
						} else {
							setError(true);
						}
					}}
				/>
				<button
					onClick={() => {
						if (noSpace) {
							props.addTask(noSpace);
							setValue('');
						} else {
							setError(true);
						}
					}}
				>
					Add
				</button>
			</div>
			{error ? <div className='er'>Type value</div> : ''}
			<ul>{liItem}</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'btn' : ''}
					onClick={() => props.filterButton('all')}
				>
					All
				</button>
				<button
					className={props.filter === 'active' ? 'btn' : ''}
					onClick={() => props.filterButton('active')}
				>
					Active
				</button>
				<button
					className={props.filter === 'completed' ? 'btn' : ''}
					onClick={() => props.filterButton('completed')}
				>
					Completed
				</button>
			</div>
		</div>
	);
};

export default TodoList;
