import React from 'react';
import InputForm from './InputForm';
import { FilterValuetype, TasksType } from './App';
import EditSpan from './EditSpan';

type PropsTypeTodo = {
	title: string;
	tasks: Array<TasksType>;
	filterButton: (f: FilterValuetype, todoID: string) => void;
	removeTask: (id: string, todoID: string) => void;
	addTask: (title: string, todoID: string) => void;
	changeChecked: (id: string, bool: boolean, todoID: string) => void;
	filter: string;
	id: string;
	removeTodo: (todoID: string) => void;
	changeSpan: (title: string, id: string, todoID: string) => void;
	editHead: (title: string, id: string) => void;
};
const TodoList = (props: PropsTypeTodo) => {
	const liItem = props.tasks.map((t) => {
		//
		function editSpan(title: string) {
			props.changeSpan(title, t.id, props.id);
		}
		//
		return (
			<li key={t.id} className={t.isDone ? 'done' : ''}>
				<input
					type='checkbox'
					checked={t.isDone}
					onChange={(e) =>
						props.changeChecked(t.id, e.currentTarget.checked, props.id)
					}
				/>
				<EditSpan title={t.title} editSpan={editSpan} />
				<button onClick={() => props.removeTask(t.id, props.id)}>X</button>
			</li>
		);
	});
	//
	function addItem(title: string) {
		props.addTask(title, props.id);
	}
	//
	function editHeadLogo(title: string) {
		props.editHead(title, props.id);
	}
	return (
		<div className={'tl'}>
			<h2>
				<EditSpan title={props.title} editSpan={editHeadLogo} />
				<button onClick={() => props.removeTodo(props.id)}>X</button>
			</h2>
			<InputForm addItem={addItem} />
			<ul>{liItem}</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'btn' : ''}
					onClick={() => props.filterButton('all', props.id)}
				>
					All
				</button>
				<button
					className={props.filter === 'active' ? 'btn' : ''}
					onClick={() => props.filterButton('active', props.id)}
				>
					Active
				</button>
				<button
					className={props.filter === 'completed' ? 'btn' : ''}
					onClick={() => props.filterButton('completed', props.id)}
				>
					Completed
				</button>
			</div>
		</div>
	);
};

export default TodoList;
