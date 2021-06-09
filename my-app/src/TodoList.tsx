import React, { useState } from 'react';
import { ButtonTypeFilter } from './App';
import InputForm from './InputForm';

//
export type TasksType = {
	id: string;
	title: string;
	isDone: boolean;
};
//
type TodoListPropsType = {
	title: string;
	tasks: Array<TasksType>;
	addFilterButton: (v: ButtonTypeFilter, todoID: string) => void;
	removeTasks: (id: string, todoID: string) => void;
	checkedInput: (id: string, bool: boolean, todoID: string) => void;
	addTask: (title: string, todoID: string) => void;
	filter: string;
	id: string;
};
function TodoList(props: TodoListPropsType) {
	console.log(props.tasks);

	let liItem = props.tasks.map((t) => {
		return (
			<li key={t.id} className={t.isDone ? 'done' : ''}>
				<input
					type='checkbox'
					checked={t.isDone}
					onChange={(e) =>
						props.checkedInput(t.id, e.currentTarget.checked, props.id)
					}
				/>
				{t.title}
				<button onClick={() => props.removeTasks(t.id, props.id)}>X</button>
			</li>
		);
	});
	//
	function addItem(title: string) {
		return props.addTask(title, props.id);
	}
	//
	return (
		<div className={'todo'}>
			<h2>{props.title}</h2>
			<InputForm addItem={addItem} />

			<ul>{liItem}</ul>
			<button
				className={props.filter === 'all' ? 'btn' : ''}
				onClick={() => props.addFilterButton('all', props.id)}
			>
				All
			</button>
			<button
				className={props.filter === 'active' ? 'btn' : ''}
				onClick={() => props.addFilterButton('active', props.id)}
			>
				Active
			</button>
			<button
				className={props.filter === 'completed' ? 'btn' : ''}
				onClick={() => props.addFilterButton('completed', props.id)}
			>
				Completed
			</button>
		</div>
	);
}

export default TodoList;
