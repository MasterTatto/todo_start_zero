import React, { useState } from 'react';
import TodoList from './TodoList';
import './App.css';
import { v1 } from 'uuid';

export type TasksType = {
	id: string;
	title: string;
	isDone: boolean;
};
//
export type FilterValuetype = 'all' | 'active' | 'completed';
//

function App() {
	//
	let [filter, setFilter] = useState<FilterValuetype>('all');
	//
	let [tasks, setTasks] = useState<Array<TasksType>>([
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'HTML', isDone: true },
		{ id: v1(), title: 'CSS', isDone: false },
		{ id: v1(), title: 'React', isDone: true },
		{ id: v1(), title: 'Redux', isDone: false },
		{ id: v1(), title: 'TypeScript', isDone: true },
	]);
	//
	function changeChecked(id: string, bool: boolean) {
		let change = tasks.map((t) => (t.id === id ? { ...t, isDone: bool } : t));
		setTasks(change);
	}
	//
	function addTask(title: string) {
		const newTask = { id: v1(), title, isDone: false };
		const newTasks = [newTask, ...tasks];
		setTasks(newTasks);
	}
	//
	function removeTask(id: string) {
		let remove = tasks.filter((f) => {
			if (f.id !== id) {
				return true;
			} else {
				return false;
			}
		});
		setTasks(remove);
	}
	//
	function filterButton(f: FilterValuetype) {
		setFilter(f);
	}
	//
	function windowFilter() {
		if (filter === 'active') {
			return tasks.filter((f) => f.isDone === false);
		}
		if (filter === 'completed') {
			return tasks.filter((f) => f.isDone === true);
		} else {
			return tasks;
		}
	}
	return (
		<div className='App'>
			<TodoList
				title={'What to learn'}
				tasks={windowFilter()}
				filterButton={filterButton}
				removeTask={removeTask}
				addTask={addTask}
				changeChecked={changeChecked}
				filter={filter}
			/>
		</div>
	);
}

export default App;
